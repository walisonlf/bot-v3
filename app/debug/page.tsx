"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Info, Database, Globe, Bot } from "lucide-react"

export default function DebugPage() {
  const [loading, setLoading] = useState<Record<string, boolean>>({
    supabase: false,
    api: false,
    telegram: false,
  })
  const [results, setResults] = useState<Record<string, any>>({})

  const testSupabase = async () => {
    setLoading((prev) => ({ ...prev, supabase: true }))
    try {
      const response = await fetch("/api/debug/supabase", {
        method: "GET",
        cache: "no-store",
      })
      const data = await response.json()
      setResults((prev) => ({ ...prev, supabase: data }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        supabase: { success: false, error: String(error) },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, supabase: false }))
    }
  }

  const testApiFootball = async () => {
    setLoading((prev) => ({ ...prev, api: true }))
    try {
      const response = await fetch("/api/debug/api-football", {
        method: "GET",
        cache: "no-store",
      })
      const data = await response.json()
      setResults((prev) => ({ ...prev, api: data }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        api: { success: false, error: String(error) },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, api: false }))
    }
  }

  const testTelegram = async () => {
    setLoading((prev) => ({ ...prev, telegram: true }))
    try {
      const response = await fetch("/api/debug/telegram", {
        method: "GET",
        cache: "no-store",
      })
      const data = await response.json()
      setResults((prev) => ({ ...prev, telegram: data }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        telegram: { success: false, error: String(error) },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, telegram: false }))
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Diagnóstico do Sistema</h1>

      <Alert variant="info" className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Ferramenta de Diagnóstico</AlertTitle>
        <AlertDescription>
          Esta página permite testar cada componente do sistema individualmente para identificar problemas específicos.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="supabase" className="space-y-6">
        <TabsList>
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
          <TabsTrigger value="api">API-Football</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
        </TabsList>

        <TabsContent value="supabase">
          <Card>
            <CardHeader>
              <CardTitle>Teste de Conexão com o Supabase</CardTitle>
              <CardDescription>
                Verifica se a conexão com o banco de dados está funcionando corretamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Este teste irá:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                <li>Verificar as variáveis de ambiente do Supabase</li>
                <li>Testar a conexão com o banco de dados</li>
                <li>Verificar se as tabelas necessárias existem</li>
                <li>Verificar as permissões de acesso</li>
              </ul>

              {results.supabase && (
                <Alert variant={results.supabase.success ? "default" : "destructive"} className="mt-4">
                  {results.supabase.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{results.supabase.success ? "Sucesso" : "Erro"}</AlertTitle>
                  <AlertDescription>
                    {results.supabase.message}
                    {results.supabase.details && (
                      <div className="mt-2">
                        <p className="font-medium">Detalhes:</p>
                        <ul className="list-disc pl-5 mt-1 text-sm">
                          {Object.entries(results.supabase.details).map(([key, value]: [string, any]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value.toString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.supabase.error && (
                      <div className="mt-2">
                        <p className="font-medium">Erro:</p>
                        <div className="mt-1 p-2 bg-muted rounded text-xs overflow-auto max-h-40">
                          <code>{results.supabase.error}</code>
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={testSupabase} disabled={loading.supabase}>
                {loading.supabase ? (
                  <>Testando...</>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Testar Conexão
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Teste da API-Football</CardTitle>
              <CardDescription>Verifica se a API-Football está respondendo corretamente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Este teste irá:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                <li>Verificar a chave da API-Football</li>
                <li>Fazer uma requisição simples para a API</li>
                <li>Verificar os limites de requisição</li>
                <li>Validar o formato da resposta</li>
              </ul>

              {results.api && (
                <Alert variant={results.api.success ? "default" : "destructive"} className="mt-4">
                  {results.api.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{results.api.success ? "Sucesso" : "Erro"}</AlertTitle>
                  <AlertDescription>
                    {results.api.message}
                    {results.api.details && (
                      <div className="mt-2">
                        <p className="font-medium">Detalhes:</p>
                        <ul className="list-disc pl-5 mt-1 text-sm">
                          {Object.entries(results.api.details).map(([key, value]: [string, any]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value.toString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.api.error && (
                      <div className="mt-2">
                        <p className="font-medium">Erro:</p>
                        <div className="mt-1 p-2 bg-muted rounded text-xs overflow-auto max-h-40">
                          <code>{results.api.error}</code>
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={testApiFootball} disabled={loading.api}>
                {loading.api ? (
                  <>Testando...</>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Testar API
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="telegram">
          <Card>
            <CardHeader>
              <CardTitle>Teste do Telegram</CardTitle>
              <CardDescription>Verifica se a integração com o Telegram está funcionando</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Este teste irá:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                <li>Verificar as variáveis de ambiente do Telegram</li>
                <li>Tentar enviar uma mensagem de teste</li>
                <li>Verificar a resposta da API do Telegram</li>
              </ul>

              {results.telegram && (
                <Alert variant={results.telegram.success ? "default" : "destructive"} className="mt-4">
                  {results.telegram.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{results.telegram.success ? "Sucesso" : "Erro"}</AlertTitle>
                  <AlertDescription>
                    {results.telegram.message}
                    {results.telegram.details && (
                      <div className="mt-2">
                        <p className="font-medium">Detalhes:</p>
                        <ul className="list-disc pl-5 mt-1 text-sm">
                          {Object.entries(results.telegram.details).map(([key, value]: [string, any]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value.toString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.telegram.error && (
                      <div className="mt-2">
                        <p className="font-medium">Erro:</p>
                        <div className="mt-1 p-2 bg-muted rounded text-xs overflow-auto max-h-40">
                          <code>{results.telegram.error}</code>
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={testTelegram} disabled={loading.telegram}>
                {loading.telegram ? (
                  <>Testando...</>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Testar Telegram
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
