// Função para buscar dados da API-Football
export async function fetchFromAPI(endpoint: string, params: Record<string, string> = {}) {
  const apiKey = process.env.API_FOOTBALL_KEY

  if (!apiKey) {
    throw new Error("API_FOOTBALL_KEY não está configurada nas variáveis de ambiente")
  }

  const baseUrl = "https://v3.football.api-sports.io"

  const url = new URL(`${baseUrl}${endpoint}`)

  // Adiciona os parâmetros à URL
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  console.log(`Fazendo requisição para: ${url.toString().replace(/\?.*/, "?[params]")}`)

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey,
      },
      cache: "no-store", // Não usar cache para garantir dados atualizados
    })

    // Verificar limites de requisição
    const remaining = response.headers.get("x-ratelimit-remaining")
    if (remaining) {
      console.log(`Requisições restantes: ${remaining}`)
      if (Number.parseInt(remaining) < 5) {
        console.warn("ATENÇÃO: Poucas requisições restantes na API-Football!")
      }
    }

    if (!response.ok) {
      let errorText = ""
      try {
        const errorData = await response.json()
        errorText = JSON.stringify(errorData)
      } catch {
        errorText = await response.text()
      }
      console.error(`API request failed with status ${response.status}: ${errorText}`)
      throw new Error(`API request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    // Verificar se a API retornou um erro
    if (data.errors && Object.keys(data.errors).length > 0) {
      const errorMessage = JSON.stringify(data.errors)
      console.error(`API-Football returned errors: ${errorMessage}`)
      throw new Error(`API-Football returned errors: ${errorMessage}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching from API-Football:", error)
    throw error
  }
}

// Função para buscar partidas
export async function fetchFixtures(date?: string, league?: number) {
  const params: Record<string, string> = {}

  if (date) {
    params.date = date
  }

  if (league) {
    params.league = league.toString()
  }

  // Adicionar temporada atual
  const currentYear = new Date().getFullYear()
  params.season = currentYear.toString()

  return fetchFromAPI("/fixtures", params)
}

// Função para buscar odds
export async function fetchOdds(fixtureId: number) {
  return fetchFromAPI("/odds", {
    fixture: fixtureId.toString(),
    bookmaker: "1", // Limitar a um bookmaker para reduzir o volume de dados
  })
}

// Função para buscar estatísticas de times
export async function fetchTeamStatistics(teamId: number, leagueId: number) {
  const currentYear = new Date().getFullYear()

  return fetchFromAPI("/teams/statistics", {
    team: teamId.toString(),
    league: leagueId.toString(),
    season: currentYear.toString(),
  })
}
