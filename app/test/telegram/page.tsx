"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send } from "lucide-react"
import { testTelegramMessage } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function TestTelegramPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(`⚽ **TESTE DE MENSAGEM** ⚽

🏆 **Competição:** Premier League
🗓️ **Data:** ${new Date().toLocaleDateString()} - **Hora:** ${new Date().toLocaleTimeString()} (Horário de Brasília)
🆚 **Jogo:** Manchester City vs Liverpool

📈 **Mercado:** Over 2.5 Gols
💡 **Entrada Sugerida:** Mais de 2.5 Gols
📊 **Odd Registrada:** @1.85
📝 **Breve Análise:** Teste de integração com o Telegram.

⚠️ Aposte com responsabilidade.`)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleTest = async () => {
    setLoading(true)
    try {
      const data = await testTelegramMessage(message)
      setResult(data)
    } catch (error) {
      console.error("Error testing Telegram:", error)
      setResult({ success: false, message: "Falha ao enviar mensagem. Verifique o console para mais detalhes." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Teste do Telegram</h1>

      <Alert variant="warning" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Certifique-se de que as variáveis de ambiente TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID estão configuradas
          corretamente.
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enviar Mensagem de Teste</CardTitle>
          <CardDescription>Envie uma mensagem de teste para o grupo do Telegram</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={12}
            placeholder="Digite a mensagem a ser enviada..."
          />
          <p className="text-xs text-muted-foreground">
            Você pode usar formatação Markdown: **negrito**, *itálico*, [link](url)
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleTest} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Alert variant={result.success ? "default" : "destructive"}>
          {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{result.success ? "Sucesso" : "Erro"}</AlertTitle>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
