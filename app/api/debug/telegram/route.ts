import { NextResponse } from "next/server"
import { sendTelegramMessage } from "@/lib/telegram"
import { logger } from "@/lib/logger"

export async function GET() {
  try {
    // Verificar variáveis de ambiente
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({
        success: false,
        message: "Variáveis de ambiente do Telegram não estão configuradas",
        details: {
          TELEGRAM_BOT_TOKEN: botToken ? "Configurado" : "Não configurado",
          TELEGRAM_CHAT_ID: chatId ? "Configurado" : "Não configurado",
        },
      })
    }

    // Enviar mensagem de teste
    try {
      const testMessage = `🧪 *MENSAGEM DE TESTE* 🧪\n\nEsta é uma mensagem de diagnóstico do sistema FootballBetBot.\n\nData e hora: ${new Date().toISOString()}`

      const result = await sendTelegramMessage(testMessage)

      return NextResponse.json({
        success: true,
        message: "Mensagem enviada com sucesso para o Telegram",
        details: {
          chatId: chatId,
          messageId: result.result?.message_id || "Desconhecido",
        },
      })
    } catch (telegramError) {
      logger.error("Erro ao enviar mensagem para o Telegram:", telegramError)
      return NextResponse.json({
        success: false,
        message: "Erro ao enviar mensagem para o Telegram",
        error: String(telegramError),
      })
    }
  } catch (error) {
    logger.error("Erro geral ao testar Telegram:", error)
    return NextResponse.json({
      success: false,
      message: "Erro interno ao testar Telegram",
      error: String(error),
    })
  }
}
