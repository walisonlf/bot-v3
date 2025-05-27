import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { formatSignalMessage, sendTelegramMessage } from "@/lib/telegram"

// Função para analisar partidas e gerar sinais
export async function GET() {
  try {
    // Verificar se as variáveis de ambiente necessárias estão configuradas
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        {
          success: false,
          error: "TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID não estão configurados nas variáveis de ambiente",
        },
        { status: 500 },
      )
    }

    // 1. Buscar partidas que ainda não foram analisadas
    const { data: matches, error: matchesError } = await supabase
      .from("matches")
      .select("*, odds(*)")
      .eq("status", "NS") // Not Started
      .order("date", { ascending: true })

    if (matchesError) {
      throw matchesError
    }

    if (!matches || matches.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nenhuma partida para analisar. Sincronize partidas primeiro.",
      })
    }

    console.log(`Encontradas ${matches.length} partidas para analisar`)

    // 2. Buscar estratégias ativas
    const { data: strategies, error: strategiesError } = await supabase
      .from("strategies")
      .select("*")
      .eq("active", true)

    if (strategiesError) {
      throw strategiesError
    }

    if (!strategies || strategies.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nenhuma estratégia ativa. Configure estratégias primeiro.",
      })
    }

    console.log(`Encontradas ${strategies.length} estratégias ativas`)

    // 3. Analisar cada partida com cada estratégia
    const generatedSignals = []

    for (const match of matches) {
      // Buscar estatísticas dos times
      const { data: homeTeamStats, error: homeStatsError } = await supabase
        .from("team_stats")
        .select("*")
        .eq("team_id", match.home_team_id)
        .eq("league_id", match.league_id)
        .single()

      if (homeStatsError) {
        console.log(`Estatísticas não encontradas para o time da casa: ${match.home_team}`)
        continue
      }

      const { data: awayTeamStats, error: awayStatsError } = await supabase
        .from("team_stats")
        .select("*")
        .eq("team_id", match.away_team_id)
        .eq("league_id", match.league_id)
        .single()

      if (awayStatsError) {
        console.log(`Estatísticas não encontradas para o time visitante: ${match.away_team}`)
        continue
      }

      console.log(`Analisando partida: ${match.home_team} vs ${match.away_team}`)

      // Aplicar cada estratégia
      for (const strategy of strategies) {
        let signal = null

        // Lógica para cada tipo de mercado
        switch (strategy.market) {
          case "Over/Under":
            signal = analyzeOverUnder(match, homeTeamStats, awayTeamStats, strategy)
            break
          case "Ambas Marcam":
            signal = analyzeBTTS(match, homeTeamStats, awayTeamStats, strategy)
            break
          case "Resultado Final":
            signal = analyzeMatchResult(match, homeTeamStats, awayTeamStats, strategy)
            break
          case "Dupla Chance":
            signal = analyzeDoubleChance(match, homeTeamStats, awayTeamStats, strategy)
            break
          case "Handicap Asiático":
            signal = analyzeAsianHandicap(match, homeTeamStats, awayTeamStats, strategy)
            break
          default:
            break
        }

        if (signal) {
          console.log(
            `Sinal gerado para ${match.home_team} vs ${match.away_team}: ${signal.market} - ${signal.prediction}`,
          )

          // Inserir sinal no banco de dados
          const { data: newSignal, error: signalError } = await supabase
            .from("signals")
            .insert({
              match_id: match.id,
              market: signal.market,
              prediction: signal.prediction,
              odd: signal.odd,
              strategy_id: strategy.id,
              status: "pending",
              analysis: signal.analysis,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()

          if (signalError) {
            console.error("Error inserting signal:", signalError)
            continue
          }

          // Formatar e enviar mensagem para o Telegram
          const signalMessage = formatSignalMessage({
            league: match.league_name,
            date: match.date,
            time: match.time,
            homeTeam: match.home_team,
            awayTeam: match.away_team,
            market: signal.market,
            prediction: signal.prediction,
            odd: signal.odd,
            analysis: signal.analysis,
          })

          try {
            await sendTelegramMessage(signalMessage)
            console.log("Mensagem enviada para o Telegram com sucesso")

            // Atualizar status do sinal
            await supabase
              .from("signals")
              .update({
                status: "sent",
                sent_at: new Date().toISOString(),
              })
              .eq("id", newSignal[0].id)

            generatedSignals.push(newSignal[0])
          } catch (telegramError) {
            console.error("Error sending Telegram message:", telegramError)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message:
        generatedSignals.length > 0
          ? `${generatedSignals.length} sinais gerados e enviados`
          : "Nenhum sinal gerado. Nenhuma oportunidade encontrada com as estratégias atuais.",
      signals: generatedSignals,
    })
  } catch (error) {
    console.error("Error in analyze route:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

// Funções de análise para diferentes mercados

function analyzeOverUnder(match: any, homeStats: any, awayStats: any, strategy: any) {
  const params = strategy.parameters as any

  // Exemplo de lógica para Over 2.5 gols
  const homeAvgGoalsScored = homeStats.avg_goals_scored
  const awayAvgGoalsScored = awayStats.avg_goals_scored
  const homeAvgGoalsConceded = homeStats.avg_goals_conceded
  const awayAvgGoalsConceded = awayStats.avg_goals_conceded

  const totalExpectedGoals = (homeAvgGoalsScored + awayAvgGoalsConceded + awayAvgGoalsScored + homeAvgGoalsConceded) / 2

  // Verificar se atende aos critérios da estratégia
  if (
    homeAvgGoalsScored > Number.parseFloat(params.min_home_goals_scored || "1.5") &&
    awayAvgGoalsConceded > Number.parseFloat(params.min_away_goals_conceded || "1.2") &&
    totalExpectedGoals > Number.parseFloat(params.min_expected_goals || "2.7")
  ) {
    // Buscar a odd para Over 2.5
    const over25Odd = match.odds.find((o: any) => o.market === "Goals Over/Under" && o.odd_name === "Over 2.5")

    if (over25Odd && over25Odd.odd_value > Number.parseFloat(params.min_odd || "1.7")) {
      return {
        market: "Over 2.5 Gols",
        prediction: "Mais de 2.5 Gols",
        odd: over25Odd.odd_value,
        analysis: `Média de gols marcados pelo ${match.home_team} em casa: ${homeAvgGoalsScored.toFixed(2)}. 
                  Média de gols sofridos pelo ${match.away_team} fora: ${awayAvgGoalsConceded.toFixed(2)}. 
                  Total de gols esperados: ${totalExpectedGoals.toFixed(2)}.`,
      }
    }
  }

  return null
}

function analyzeBTTS(match: any, homeStats: any, awayStats: any, strategy: any) {
  const params = strategy.parameters as any

  // Verificar se ambos os times têm alta probabilidade de marcar
  if (
    homeStats.btts_percent > Number.parseFloat(params.min_home_btts_percent || "70") &&
    awayStats.btts_percent > Number.parseFloat(params.min_away_btts_percent || "65")
  ) {
    // Buscar a odd para BTTS
    const bttsOdd = match.odds.find((o: any) => o.market === "Both Teams Score" && o.odd_name === "Yes")

    if (bttsOdd && bttsOdd.odd_value > Number.parseFloat(params.min_odd || "1.6")) {
      return {
        market: "Ambas Marcam",
        prediction: "Sim",
        odd: bttsOdd.odd_value,
        analysis: `${match.home_team} marcou em ${homeStats.btts_percent.toFixed(0)}% dos jogos. 
                  ${match.away_team} marcou em ${awayStats.btts_percent.toFixed(0)}% dos jogos.`,
      }
    }
  }

  return null
}

function analyzeMatchResult(match: any, homeStats: any, awayStats: any, strategy: any) {
  const params = strategy.parameters as any

  // Lógica simplificada para resultado final
  const homeStrength = homeStats.avg_goals_scored - awayStats.avg_goals_conceded
  const awayStrength = awayStats.avg_goals_scored - homeStats.avg_goals_conceded

  // Verificar se o time da casa tem vantagem significativa
  if (homeStrength > Number.parseFloat(params.min_home_advantage || "0.5")) {
    // Buscar a odd para vitória do time da casa
    const homeWinOdd = match.odds.find((o: any) => o.market === "Match Winner" && o.odd_name === "Home")

    if (homeWinOdd && homeWinOdd.odd_value > Number.parseFloat(params.min_odd || "1.5")) {
      return {
        market: "Resultado Final",
        prediction: match.home_team,
        odd: homeWinOdd.odd_value,
        analysis: `${match.home_team} tem uma vantagem de força de ${homeStrength.toFixed(2)} sobre ${match.away_team}.`,
      }
    }
  }

  // Verificar se o time visitante tem vantagem significativa
  if (awayStrength > Number.parseFloat(params.min_away_advantage || "0.7")) {
    // Buscar a odd para vitória do time visitante
    const awayWinOdd = match.odds.find((o: any) => o.market === "Match Winner" && o.odd_name === "Away")

    if (awayWinOdd && awayWinOdd.odd_value > Number.parseFloat(params.min_odd || "2.0")) {
      return {
        market: "Resultado Final",
        prediction: match.away_team,
        odd: awayWinOdd.odd_value,
        analysis: `${match.away_team} tem uma vantagem de força de ${awayStrength.toFixed(2)} sobre ${match.home_team}.`,
      }
    }
  }

  return null
}

function analyzeDoubleChance(match: any, homeStats: any, awayStats: any, strategy: any) {
  const params = strategy.parameters as any

  // Lógica para Dupla Chance 1X (Casa ou Empate)
  const homeAdvantage = homeStats.avg_goals_scored - awayStats.avg_goals_scored

  if (homeAdvantage > Number.parseFloat(params.min_home_advantage || "0.3")) {
    // Buscar a odd para 1X
    const homeDrawOdd = match.odds.find((o: any) => o.market === "Double Chance" && o.odd_name === "Home/Draw")

    if (homeDrawOdd && homeDrawOdd.odd_value < Number.parseFloat(params.max_odd || "1.5")) {
      return {
        market: "Dupla Chance",
        prediction: "1X",
        odd: homeDrawOdd.odd_value,
        analysis: `${match.home_team} tem uma vantagem de ${homeAdvantage.toFixed(2)} gols sobre ${match.away_team}.`,
      }
    }
  }

  return null
}

function analyzeAsianHandicap(match: any, homeStats: any, awayStats: any, strategy: any) {
  const params = strategy.parameters as any

  // Lógica para Handicap Asiático
  const goalDifference = homeStats.avg_goals_scored - awayStats.avg_goals_scored

  if (goalDifference > Number.parseFloat(params.min_goal_difference || "1.0")) {
    // Buscar a odd para Handicap Asiático -1.5
    const handicapOdd = match.odds.find((o: any) => o.market === "Asian Handicap" && o.odd_name === "Home -1.5")

    if (handicapOdd && handicapOdd.odd_value > Number.parseFloat(params.min_odd || "2.0")) {
      return {
        market: "Handicap Asiático",
        prediction: `${match.home_team} -1.5`,
        odd: handicapOdd.odd_value,
        analysis: `${match.home_team} tem uma diferença média de ${goalDifference.toFixed(2)} gols sobre ${match.away_team}.`,
      }
    }
  }

  return null
}
