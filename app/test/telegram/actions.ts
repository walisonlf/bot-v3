"use server"

import { sendTelegramMessage } from "@/lib/telegram"

export async function testTelegramMessage(message: string) {
  try {
    await sendTelegramMessage(message)
    return {
      success: true,
      message: "Mensagem enviada com sucesso para o Telegram!",
    }
  } catch (error) {
    console.error("Error in testTelegramMessage:", error)
    return {
      success: false,
      message: `Erro ao enviar mensagem: ${String(error)}`,
    }
  }
}
