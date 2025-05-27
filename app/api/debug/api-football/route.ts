import { NextResponse } from "next/server"
import { fetchFromAPI } from "@/lib/api-football"
import { logger } from "@/lib/logger"

export async function GET() {
  try {
    // Verificar variável de ambiente
    const apiKey = process.env.API_FOOTBALL_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: "API_FOOTBALL_KEY não está configurada nas variáveis de ambiente",
      })
    }

    // Fazer uma requisição simples para testar a API
    try {
      const data = await fetchFromAPI("/status")

      // Verificar se a resposta contém os dados esperados
      if (!data.response) {
        return NextResponse.json({
          success: false,
          message: "API-Football retornou uma resposta inválida",
          details: {
            response: "Ausente",
          },
        })
      }

      // Extrair informações úteis da resposta
      const { account, requests, subscription } = data.response

      return NextResponse.json({
        success: true,
        message: "API-Football está respondendo corretamente",
        details: {
          account: account?.email || "Não disponível",
          plan: subscription?.plan || "Não disponível",
          requests: {
            current: requests?.current || 0,
            limit_day: requests?.limit_day || 0,
            remaining: requests?.limit_day ? requests.limit_day - requests.current : "Desconhecido",
          },
        },
      })
    } catch (apiError) {
      logger.error("Erro ao testar API-Football:", apiError)
      return NextResponse.json({
        success: false,
        message: "Erro ao fazer requisição para API-Football",
        error: String(apiError),
      })
    }
  } catch (error) {
    logger.error("Erro geral ao testar API-Football:", error)
    return NextResponse.json({
      success: false,
      message: "Erro interno ao testar API-Football",
      error: String(error),
    })
  }
}
