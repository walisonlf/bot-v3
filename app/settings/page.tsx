import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Bot, Key, MessageSquare, RefreshCw, Save, Settings2 } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">FootballBetBot</h1>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/strategies" className="text-muted-foreground transition-colors hover:text-foreground">
                Estratégias
              </Link>
              <Link href="/matches" className="text-muted-foreground transition-colors hover:text-foreground">
                Partidas
              </Link>
              <Link href="/signals" className="text-muted-foreground transition-colors hover:text-foreground">
                Sinais
              </Link>
              <Link href="/settings" className="text-primary">
                Configurações
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sincronizar
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          </div>
          <Tabs defaultValue="api" className="space-y-4">
            <TabsList>
              <TabsTrigger value="api">API-Football</TabsTrigger>
              <TabsTrigger value="telegram">Telegram</TabsTrigger>
              <TabsTrigger value="bot">Bot</TabsTrigger>
              <TabsTrigger value="general">Geral</TabsTrigger>
            </TabsList>
            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da API-Football</CardTitle>
                  <CardDescription>Configure sua chave de API e preferências para a API-Football</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Chave da API</Label>
                    <div className="flex gap-2">
                      <Input id="api-key" type="password" value="57589c197789ada8c78bfd09fe231133" className="flex-1" />
                      <Button variant="outline" size="icon">
                        <Key className="h-4 w-4" />
                        <span className="sr-only">Mostrar chave</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sua chave de API para acessar os dados da API-Football
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leagues">Ligas para Monitorar</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="leagues">
                        <SelectValue placeholder="Selecione as ligas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Principais Ligas</SelectItem>
                        <SelectItem value="custom">Ligas Personalizadas</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Escolha quais ligas o bot deve monitorar para análise
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sync-interval">Intervalo de Sincronização</Label>
                    <Select defaultValue="6">
                      <SelectTrigger id="sync-interval">
                        <SelectValue placeholder="Selecione o intervalo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">A cada 1 hora</SelectItem>
                        <SelectItem value="3">A cada 3 horas</SelectItem>
                        <SelectItem value="6">A cada 6 horas</SelectItem>
                        <SelectItem value="12">A cada 12 horas</SelectItem>
                        <SelectItem value="24">A cada 24 horas</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Com que frequência o bot deve buscar novos dados da API
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="telegram" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Telegram</CardTitle>
                  <CardDescription>Configure o bot do Telegram para envio de sinais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bot-token">Token do Bot</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bot-token"
                        type="password"
                        value="8149354380:AAGLNGoQI1hqM2M1mJq6uF05uw397i9kFmY"
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <Key className="h-4 w-4" />
                        <span className="sr-only">Mostrar token</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Token do seu bot do Telegram (obtido via BotFather)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group-id">ID do Grupo</Label>
                    <Input id="group-id" value="-4980709993" />
                    <p className="text-xs text-muted-foreground">
                      ID do grupo do Telegram onde os sinais serão enviados
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-template">Template da Mensagem</Label>
                    <Textarea
                      id="message-template"
                      rows={8}
                      defaultValue={`⚽ **ALERTA DE APOSTA** ⚽

🏆 **Competição:** [Nome da Liga]
🗓️ **Data:** [DD/MM/YYYY] - **Hora:** [HH:MM] (Horário de Brasília)
🆚 **Jogo:** [Time Casa] vs [Time Visitante]

📈 **Mercado:** [Ex: Over 2.5 Gols]
💡 **Entrada Sugerida:** [Ex: Mais de 2.5 Gols]
📊 **Odd Registrada:** @[Valor da Odd] (Ex: @1.90)
📝 **Breve Análise:** [Análise]

⚠️ Aposte com responsabilidade.`}
                    />
                    <p className="text-xs text-muted-foreground">Template para as mensagens enviadas ao grupo</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="approval" />
                    <Label htmlFor="approval">Aprovação manual de sinais</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Teste de Conexão</CardTitle>
                  <CardDescription>Envie uma mensagem de teste para verificar a conexão com o Telegram</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enviar Mensagem de Teste
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bot" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Bot</CardTitle>
                  <CardDescription>Configure o comportamento do bot de análise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-odd">Odd Mínima</Label>
                    <Input id="min-odd" type="number" defaultValue="1.5" />
                    <p className="text-xs text-muted-foreground">Odd mínima para que um sinal seja gerado</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-signals">Máximo de Sinais por Dia</Label>
                    <Input id="max-signals" type="number" defaultValue="5" />
                    <p className="text-xs text-muted-foreground">
                      Número máximo de sinais que o bot pode enviar por dia
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confidence">Nível de Confiança Mínimo</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="confidence">
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixo (mais sinais, menor precisão)</SelectItem>
                        <SelectItem value="medium">Médio (equilibrado)</SelectItem>
                        <SelectItem value="high">Alto (menos sinais, maior precisão)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Nível de confiança mínimo para que um sinal seja gerado
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-update" defaultChecked />
                    <Label htmlFor="auto-update">Atualização automática de resultados</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Controle do Bot</CardTitle>
                  <CardDescription>Controle o status de execução do bot</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Status do Bot</p>
                        <p className="text-xs text-muted-foreground">O bot está atualmente em execução</p>
                      </div>
                    </div>
                    <Switch id="bot-status" defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                      <Settings2 className="h-4 w-4 mr-2" />
                      Reiniciar Bot
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sincronizar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                  <CardDescription>Configurações gerais do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select defaultValue="america-sao_paulo">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Selecione o fuso horário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-sao_paulo">América/São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="america-new_york">América/New York (GMT-4)</SelectItem>
                        <SelectItem value="europe-london">Europa/Londres (GMT+1)</SelectItem>
                        <SelectItem value="europe-paris">Europa/Paris (GMT+2)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Fuso horário para exibição de datas e horários</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Formato de Data</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Formato para exibição de datas</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dark-mode" defaultChecked />
                    <Label htmlFor="dark-mode">Modo Escuro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" defaultChecked />
                    <Label htmlFor="notifications">Notificações no navegador</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
