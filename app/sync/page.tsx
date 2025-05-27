"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, RefreshCw, Search, Wrench } from "lucide-react"
import { syncFixtures, analyzeMatches } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export default function SyncPage() {
  const [syncLoading, setSyncLoading] = useState(false)
  const [analyzeLoading, setAnalyzeLoading] = useState(false)
  const [syncResult, setSyncResult] = useState<{
    success: boolean
    message: string
    fixtures?: number
    errors?: number
    error?: string
  } | null>(null)
  const [analyzeResult, setAnalyzeResult] = useState<{
    success: boolean
    message: string
    signals?: any[]
    error?: string
  } | null>(null)

  const handleSync = async () => {
    setSyncLoading(true)
    setSyncResult(null)
    try {
      const data = await syncFixtures()
      setSyncResult(data)
    } catch (error) {
      console.error("Error syncing fixtures:", error)
      setSyncResult({
        success: false,
        message: "Falha ao sincronizar partidas.",
        error: String(error),
      })
    } finally {
      setSyncLoading(false)
    }
  }

  const handleAnalyze = async () => {
    setAnalyzeLoading(true)
    setAnalyzeResult(null)
    try {
      const data = await analyzeMatches()
      setAnalyzeResult(data)
    } catch (error) {
      console.error("Error analyzing matches:", error)
      setAnalyzeResult({
        success: false,
        message: "Falha ao analisar partidas.",
        error: String(error),
      })
    } finally {
      setAnalyzeLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sincronização e Análise</h1>
        <Button variant="outline" asChild>
          <Link href="/debug">
            <Wrench className="mr-2 h-4 w-4" />
            Diagnóstico
          </Link>
        </Button>
      </div>

      <Alert variant="info" className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Informação</AlertTitle>
        <AlertDescription>
          <p>Certifique-se de que as seguintes variáveis de ambiente estão configuradas corretamente:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>API_FOOTBALL_KEY</strong>: Chave para acessar a API-Football
            </li>
            <li>
              <strong>NEXT_PUBLIC_SUPABASE_URL</strong>: URL do seu projeto Supabase
            </li>
            <li>
              <strong>SUPABASE_SERVICE_ROLE_KEY</strong>: Chave de serviço do Supabase
            </li>
            <li>
              <strong>TELEGRAM_BOT_TOKEN</strong>: Token do seu bot do Telegram
            </li>
            <li>
              <strong>TELEGRAM_CHAT_ID</strong>: ID do chat/grupo do Telegram
            </li>
          </ul>
          <p className="mt-2">
            Se estiver tendo problemas, use a{" "}
            <Link href="/debug" className="text-primary underline">
              ferramenta de diagnóstico
            </Link>{" "}
            para identificar a causa.
          </p>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="sync" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sync">Sincronizar Partidas</TabsTrigger>
          <TabsTrigger value="analyze">Analisar e Gerar Sinais</TabsTrigger>
        </TabsList>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Sincronizar Partidas</CardTitle>
              <CardDescription>
                Busca partidas para hoje e amanhã na API-Football e salva no banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Este processo irá:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                <li>Buscar partidas para hoje e amanhã</li>
                <li>Salvar/atualizar as partidas no banco de dados</li>
                <li>Buscar odds para cada partida</li>
                <li>Buscar estatísticas dos times</li>
              </ul>

              {syncResult && (
                <Alert variant={syncResult.success ? "default" : "destructive"} className="mt-4">
                  {syncResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{syncResult.success ? "Sucesso" : "Erro"}</AlertTitle>
                  <AlertDescription>
                    {syncResult.message}
                    {syncResult.fixtures !== undefined && (
                      <p className="mt-2">Partidas sincronizadas: {syncResult.fixtures}</p>
                    )}
                    {syncResult.errors !== undefined && syncResult.errors > 0 && (
                      <p className="mt-2">Erros encontrados: {syncResult.errors}</p>
                    )}
                    {syncResult.error && (
                      <div className="mt-2">
                        <p className="font-medium">Detalhes do erro:</p>
                        <div className="mt-1 p-2 bg-muted rounded text-xs overflow-auto max-h-40">
                          <code>{syncResult.error}</code>
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSync} disabled={syncLoading}>
                {syncLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sincronizar Agora
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analyze">
          <Card>
            <CardHeader>
              <CardTitle>Analisar Partidas e Gerar Sinais</CardTitle>
              <CardDescription>Analisa as partidas sincronizadas e gera sinais de apostas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Este processo irá:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                <li>Buscar partidas que ainda não foram analisadas</li>
                <li>Aplicar as estratégias de apostas configuradas</li>
                <li>Gerar sinais para oportunidades identificadas</li>
                <li>Enviar os sinais para o grupo do Telegram</li>
              </ul>

              {analyzeResult && (
                <Alert variant={analyzeResult.success ? "default" : "destructive"} className="mt-4">
                  {analyzeResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{analyzeResult.success ? "Sucesso" : "Erro"}</AlertTitle>
                  <AlertDescription>
                    {analyzeResult.message}
                    {analyzeResult.signals && analyzeResult.signals.length > 0 && (
                      <div className="mt-2">
                        <p>Sinais gerados: {analyzeResult.signals.length}</p>
                        <ul className="list-disc pl-5 mt-2 text-sm">
                          {analyzeResult.signals.slice(0, 3).map((signal, index) => (
                            <li key={index}>
                              {signal.market}: {signal.prediction} @{signal.odd}
                            </li>
                          ))}
                          {analyzeResult.signals.length > 3 && (
                            <li>... e mais {analyzeResult.signals.length - 3} sinais</li>
                          )}
                        </ul>
                      </div>
                    )}
                    {analyzeResult.error && (
                      <div className="mt-2">
                        <p className="font-medium">Detalhes do erro:</p>
                        <div className="mt-1 p-2 bg-muted rounded text-xs overflow-auto max-h-40">
                          <code>{analyzeResult.error}</code>
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleAnalyze} disabled={analyzeLoading}>
                {analyzeLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analisar Agora
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
