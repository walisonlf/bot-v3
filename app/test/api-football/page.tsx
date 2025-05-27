"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Loader2 } from "lucide-react"
import { testApiFootball } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TestApiFootballPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [endpoint, setEndpoint] = useState("fixtures")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [leagueId, setLeagueId] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleTest = async () => {
    setLoading(true)
    setError(null)
    try {
      const params: Record<string, string> = {}

      if (date) {
        params.date = date
      }

      if (leagueId) {
        params.league = leagueId
      }

      const data = await testApiFootball(endpoint, params)

      if (data.error) {
        setError(data.error)
        setResult(null)
      } else {
        setResult(data)
      }
    } catch (error) {
      console.error("Error testing API:", error)
      setError("Falha ao testar a API. Verifique o console para mais detalhes.")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Teste da API-Football</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configuração do Teste</CardTitle>
          <CardDescription>Configure os parâmetros para testar a API-Football</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">Endpoint</Label>
            <Select value={endpoint} onValueChange={setEndpoint}>
              <SelectTrigger id="endpoint">
                <SelectValue placeholder="Selecione o endpoint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixtures">Partidas (fixtures)</SelectItem>
                <SelectItem value="odds">Odds</SelectItem>
                <SelectItem value="teams/statistics">Estatísticas de Times</SelectItem>
                <SelectItem value="leagues">Ligas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {endpoint === "fixtures" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="league">ID da Liga (opcional)</Label>
                <Input
                  id="league"
                  type="text"
                  placeholder="Ex: 39 para Premier League"
                  value={leagueId}
                  onChange={(e) => setLeagueId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  IDs comuns: 39 (Premier League), 140 (La Liga), 135 (Serie A), 78 (Bundesliga), 61 (Ligue 1), 71
                  (Brasileirão)
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleTest} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando...
              </>
            ) : (
              "Testar API"
            )}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado do Teste</CardTitle>
            <CardDescription>Resposta da API-Football</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="formatted">
              <TabsList>
                <TabsTrigger value="formatted">Formatado</TabsTrigger>
                <TabsTrigger value="raw">JSON Bruto</TabsTrigger>
              </TabsList>
              <TabsContent value="formatted" className="space-y-4">
                {result.error ? (
                  <div className="p-4 bg-red-50 text-red-500 rounded-md">{result.error}</div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium">Status</h3>
                        <p>{result.response ? "Sucesso" : "Falha"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Resultados</h3>
                        <p>{result.results || 0}</p>
                      </div>
                    </div>

                    {result.response && Array.isArray(result.response) && result.response.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Primeiros 3 itens:</h3>
                        <div className="space-y-4">
                          {result.response.slice(0, 3).map((item: any, index: number) => (
                            <div key={index} className="p-4 bg-muted rounded-md">
                              <pre className="text-xs overflow-auto max-h-60">{JSON.stringify(item, null, 2)}</pre>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              <TabsContent value="raw">
                <pre className="text-xs overflow-auto max-h-[500px] p-4 bg-muted rounded-md">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
