import { NextResponse } from "next/server"
import { fetchFixtures, fetchOdds, fetchTeamStatistics } from "@/lib/api-football"
import { supabase, testSupabaseConnection } from "@/lib/supabase"
import { logger } from "@/lib/logger"

// Função para sincronizar dados da API-Football com o Supabase
export async function GET() {
  try {
    // 1. Verificar variáveis de ambiente
    if (!process.env.API_FOOTBALL_KEY) {
      logger.error("API_FOOTBALL_KEY não está configurada nas variáveis de ambiente")
      return NextResponse.json(
        { success: false, error: "API_FOOTBALL_KEY não está configurada nas variáveis de ambiente" },
        { status: 500 },
      )
    }

    // 2. Testar conexão com o Supabase
    const connectionTest = await testSupabaseConnection()
    if (!connectionTest.success) {
      logger.error("Falha na conexão com o Supabase", connectionTest.error)
      return NextResponse.json(
        {
          success: false,
          error: `Erro ao conectar com o Supabase: ${connectionTest.error}. Verifique as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.`,
        },
        { status: 500 },
      )
    }

    // 3. Definir datas para busca
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayStr = today.toISOString().split("T")[0]
    const tomorrowStr = tomorrow.toISOString().split("T")[0]

    // 4. Buscar partidas de hoje
    logger.info(`Buscando partidas para: ${todayStr}`)
    let todayFixtures
    try {
      todayFixtures = await fetchFixtures(todayStr)
      logger.info(`Partidas encontradas para hoje: ${todayFixtures.results || 0}`)
    } catch (error) {
      logger.error("Erro ao buscar partidas de hoje:", error)
      return NextResponse.json(
        {
          success: false,
          error: `Erro ao buscar partidas de hoje: ${String(error)}. Verifique sua chave API_FOOTBALL_KEY.`,
        },
        { status: 500 },
      )
    }

    // 5. Buscar partidas de amanhã
    logger.info(`Buscando partidas para: ${tomorrowStr}`)
    let tomorrowFixtures
    try {
      tomorrowFixtures = await fetchFixtures(tomorrowStr)
      logger.info(`Partidas encontradas para amanhã: ${tomorrowFixtures.results || 0}`)
    } catch (error) {
      logger.error("Erro ao buscar partidas de amanhã:", error)
      return NextResponse.json(
        {
          success: false,
          error: `Erro ao buscar partidas de amanhã: ${String(error)}. Verifique sua chave API_FOOTBALL_KEY.`,
        },
        { status: 500 },
      )
    }

    // 6. Combinar partidas de hoje e amanhã
    const allFixtures = [...(todayFixtures?.response || []), ...(tomorrowFixtures?.response || [])]
    logger.info(`Total de partidas encontradas: ${allFixtures.length}`)

    if (allFixtures.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nenhuma partida encontrada para hoje e amanhã",
        fixtures: 0,
      })
    }

    // 7. Filtrar apenas ligas principais para reduzir volume de dados
    const majorLeagueIds = [39, 140, 135, 78, 61, 71] // Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Brasileirão
    const filteredFixtures = allFixtures.filter((fixture) => majorLeagueIds.includes(fixture.league.id))

    logger.info(`Partidas filtradas (apenas ligas principais): ${filteredFixtures.length}`)

    // 8. Limitar o número de partidas processadas para evitar exceder limites da API
    const MAX_FIXTURES = 20
    const limitedFixtures = filteredFixtures.slice(0, MAX_FIXTURES)

    if (filteredFixtures.length > MAX_FIXTURES) {
      logger.warn(`Limitando processamento a ${MAX_FIXTURES} partidas para evitar exceder limites da API`)
    }

    // 9. Processar partidas
    let processedFixtures = 0
    let errors = 0

    for (const fixture of limitedFixtures) {
      try {
        // Verificar se temos todos os dados necessários
        if (!fixture.fixture?.id || !fixture.league?.id || !fixture.teams?.home?.id || !fixture.teams?.away?.id) {
          logger.warn("Partida com dados incompletos, pulando:", fixture)
          continue
        }

        const fixtureData = {
          fixture_id: fixture.fixture.id,
          league_id: fixture.league.id,
          league_name: fixture.league.name,
          home_team: fixture.teams.home.name,
          away_team: fixture.teams.away.name,
          home_team_id: fixture.teams.home.id,
          away_team_id: fixture.teams.away.id,
          date: new Date(fixture.fixture.date).toISOString().split("T")[0],
          time: new Date(fixture.fixture.date).toTimeString().split(" ")[0].substring(0, 5),
          status: fixture.fixture.status.short,
          home_score: fixture.goals?.home ?? null,
          away_score: fixture.goals?.away ?? null,
          ht_home_score: fixture.score?.halftime?.home ?? null,
          ht_away_score: fixture.score?.halftime?.away ?? null,
          updated_at: new Date().toISOString(),
        }

        // Verificar se a partida já existe
        const { data: existingMatch, error: matchError } = await supabase
          .from("matches")
          .select("id")
          .eq("fixture_id", fixture.fixture.id)
          .single()

        if (matchError && matchError.code !== "PGRST116") {
          logger.error(`Erro ao verificar partida existente (ID: ${fixture.fixture.id}):`, matchError)
          errors++
          continue
        }

        let matchId: number

        if (existingMatch) {
          // Atualizar partida existente
          matchId = existingMatch.id
          const { error: updateError } = await supabase.from("matches").update(fixtureData).eq("id", matchId)

          if (updateError) {
            logger.error(`Erro ao atualizar partida (ID: ${matchId}):`, updateError)
            errors++
            continue
          }

          logger.info(`Partida atualizada com sucesso: ${fixtureData.home_team} vs ${fixtureData.away_team}`)
          processedFixtures++
        } else {
          // Inserir nova partida
          const { data: newMatch, error: insertError } = await supabase
            .from("matches")
            .insert({
              ...fixtureData,
              created_at: new Date().toISOString(),
            })
            .select()

          if (insertError) {
            logger.error(`Erro ao inserir partida (${fixtureData.home_team} vs ${fixtureData.away_team}):`, insertError)
            errors++
            continue
          }

          if (!newMatch || newMatch.length === 0) {
            logger.error(
              `Partida inserida, mas nenhum dado retornado: ${fixtureData.home_team} vs ${fixtureData.away_team}`,
            )
            errors++
            continue
          }

          matchId = newMatch[0].id
          logger.info(`Nova partida inserida: ${fixtureData.home_team} vs ${fixtureData.away_team} (ID: ${matchId})`)
          processedFixtures++

          // 10. Buscar odds para a partida (apenas para novas partidas)
          try {
            logger.info(`Buscando odds para partida: ${fixtureData.home_team} vs ${fixtureData.away_team}`)
            const oddsData = await fetchOdds(fixture.fixture.id)

            if (oddsData.response && oddsData.response.length > 0) {
              const bookmakers = oddsData.response[0].bookmakers
              let oddsInserted = 0

              for (const bookmaker of bookmakers) {
                for (const market of bookmaker.bets) {
                  for (const odd of market.values) {
                    try {
                      const { error: oddError } = await supabase.from("odds").insert({
                        match_id: matchId,
                        bookmaker: bookmaker.name,
                        market: market.name,
                        odd_name: odd.value,
                        odd_value: Number.parseFloat(odd.odd),
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                      })

                      if (oddError) {
                        logger.error(`Erro ao inserir odd (${market.name} - ${odd.value}):`, oddError)
                      } else {
                        oddsInserted++
                      }
                    } catch (oddError) {
                      logger.error(`Exceção ao inserir odd:`, oddError)
                    }
                  }
                }
              }

              logger.info(`${oddsInserted} odds inseridas para a partida ID ${matchId}`)
            } else {
              logger.warn(`Nenhuma odd encontrada para a partida ID ${matchId}`)
            }
          } catch (oddsError) {
            logger.error(`Erro ao buscar odds para partida ID ${matchId}:`, oddsError)
          }

          // 11. Buscar estatísticas dos times (apenas para novas partidas)
          // Primeiro o time da casa
          try {
            logger.info(`Buscando estatísticas para o time: ${fixtureData.home_team}`)
            const homeTeamStats = await fetchTeamStatistics(fixture.teams.home.id, fixture.league.id)

            if (homeTeamStats.response) {
              const stats = homeTeamStats.response
              try {
                const { error: statsError } = await supabase.from("team_stats").upsert({
                  team_id: fixture.teams.home.id,
                  team_name: fixture.teams.home.name,
                  league_id: fixture.league.id,
                  form: stats.form || null,
                  avg_goals_scored: stats.goals?.for?.average?.total || 0,
                  avg_goals_conceded: stats.goals?.against?.average?.total || 0,
                  clean_sheets_percent: stats.clean_sheet?.total
                    ? (stats.clean_sheet.total / stats.fixtures.played.total) * 100
                    : 0,
                  btts_percent:
                    stats.goals?.for?.total?.over_0 && stats.goals?.against?.total?.over_0
                      ? (stats.goals.for.total.over_0 / stats.fixtures.played.total) * 100
                      : 0,
                  over_25_percent: stats.goals?.for?.total?.over_2
                    ? (stats.goals.for.total.over_2 / stats.fixtures.played.total) * 100
                    : 0,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                })

                if (statsError) {
                  logger.error(`Erro ao inserir estatísticas do time ${fixtureData.home_team}:`, statsError)
                } else {
                  logger.info(`Estatísticas do time ${fixtureData.home_team} atualizadas com sucesso`)
                }
              } catch (statsInsertError) {
                logger.error(`Exceção ao inserir estatísticas do time ${fixtureData.home_team}:`, statsInsertError)
              }
            } else {
              logger.warn(`Nenhuma estatística encontrada para o time ${fixtureData.home_team}`)
            }
          } catch (statsError) {
            logger.error(`Erro ao buscar estatísticas do time ${fixtureData.home_team}:`, statsError)
          }

          // Depois o time visitante
          try {
            logger.info(`Buscando estatísticas para o time: ${fixtureData.away_team}`)
            const awayTeamStats = await fetchTeamStatistics(fixture.teams.away.id, fixture.league.id)

            if (awayTeamStats.response) {
              const stats = awayTeamStats.response
              try {
                const { error: statsError } = await supabase.from("team_stats").upsert({
                  team_id: fixture.teams.away.id,
                  team_name: fixture.teams.away.name,
                  league_id: fixture.league.id,
                  form: stats.form || null,
                  avg_goals_scored: stats.goals?.for?.average?.total || 0,
                  avg_goals_conceded: stats.goals?.against?.average?.total || 0,
                  clean_sheets_percent: stats.clean_sheet?.total
                    ? (stats.clean_sheet.total / stats.fixtures.played.total) * 100
                    : 0,
                  btts_percent:
                    stats.goals?.for?.total?.over_0 && stats.goals?.against?.total?.over_0
                      ? (stats.goals.for.total.over_0 / stats.fixtures.played.total) * 100
                      : 0,
                  over_25_percent: stats.goals?.for?.total?.over_2
                    ? (stats.goals.for.total.over_2 / stats.fixtures.played.total) * 100
                    : 0,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                })

                if (statsError) {
                  logger.error(`Erro ao inserir estatísticas do time ${fixtureData.away_team}:`, statsError)
                } else {
                  logger.info(`Estatísticas do time ${fixtureData.away_team} atualizadas com sucesso`)
                }
              } catch (statsInsertError) {
                logger.error(`Exceção ao inserir estatísticas do time ${fixtureData.away_team}:`, statsInsertError)
              }
            } else {
              logger.warn(`Nenhuma estatística encontrada para o time ${fixtureData.away_team}`)
            }
          } catch (statsError) {
            logger.error(`Erro ao buscar estatísticas do time ${fixtureData.away_team}:`, statsError)
          }
        }
      } catch (fixtureError) {
        logger.error("Erro ao processar partida:", fixtureError)
        errors++
        continue
      }
    }

    // 12. Retornar resultado
    return NextResponse.json({
      success: true,
      message: `Dados sincronizados com sucesso. ${errors > 0 ? `(${errors} erros ocorreram durante o processo)` : ""}`,
      fixtures: processedFixtures,
      errors: errors,
    })
  } catch (error) {
    logger.error("Erro geral na rota de sincronização:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Erro interno do servidor: ${String(error)}`,
      },
      { status: 500 },
    )
  }
}
