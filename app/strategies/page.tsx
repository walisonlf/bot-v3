import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Edit, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function StrategiesPage() {
  const strategies = [
    {
      id: 1,
      name: "Over 2.5 Gols",
      market: "Over/Under",
      description: "Identifica partidas com alta probabilidade de ter mais de 2.5 gols",
      active: true,
      parameters: [
        { name: "Média de gols marcados (casa)", value: "> 1.5" },
        { name: "Média de gols sofridos (visitante)", value: "> 1.2" },
        { name: "Odd mínima", value: "1.7" },
        { name: "Histórico H2H", value: "60% over 2.5" },
      ],
      performance: {
        signals: 28,
        winRate: 71.4,
        roi: 15.2,
      },
    },
    {
      id: 2,
      name: "Ambas Marcam (BTTS)",
      market: "Ambas Marcam",
      description: "Identifica partidas onde ambas as equipes têm alta probabilidade de marcar",
      active: true,
      parameters: [
        { name: "% jogos marcando (casa)", value: "> 70%" },
        { name: "% jogos marcando (visitante)", value: "> 65%" },
        { name: "% jogos sofrendo gols (casa)", value: "> 60%" },
        { name: "% jogos sofrendo gols (visitante)", value: "> 60%" },
        { name: "Odd mínima", value: "1.6" },
      ],
      performance: {
        signals: 32,
        winRate: 68.8,
        roi: 12.5,
      },
    },
    {
      id: 3,
      name: "Dupla Chance 1X",
      market: "Dupla Chance",
      description: "Identifica partidas onde o time da casa tem vantagem significativa",
      active: false,
      parameters: [
        { name: "Diferença de posição na tabela", value: "> 5" },
        { name: "% vitórias em casa", value: "> 60%" },
        { name: "% derrotas fora", value: "> 50%" },
        { name: "Odd máxima", value: "1.5" },
      ],
      performance: {
        signals: 18,
        winRate: 83.3,
        roi: 10.8,
      },
    },
    {
      id: 4,
      name: "Handicap Asiático -1.5",
      market: "Handicap Asiático",
      description: "Identifica partidas com grande diferença de qualidade entre as equipes",
      active: true,
      parameters: [
        { name: "Diferença de gols marcados", value: "> 1.0" },
        { name: "Diferença de gols sofridos", value: "> 0.8" },
        { name: "Diferença de pontos", value: "> 15" },
        { name: "Odd mínima", value: "2.0" },
      ],
      performance: {
        signals: 15,
        winRate: 53.3,
        roi: 18.7,
      },
    },
  ]

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
              <Link href="/strategies" className="text-primary">
                Estratégias
              </Link>
              <Link href="/matches" className="text-muted-foreground transition-colors hover:text-foreground">
                Partidas
              </Link>
              <Link href="/signals" className="text-muted-foreground transition-colors hover:text-foreground">
                Sinais
              </Link>
              <Link href="/settings" className="text-muted-foreground transition-colors hover:text-foreground">
                Configurações
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button size="sm" asChild>
                <Link href="/strategies/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Estratégia
                </Link>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Estratégias de Apostas</h2>
          </div>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="active">Ativas</TabsTrigger>
              <TabsTrigger value="inactive">Inativas</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {strategies.map((strategy) => (
                  <Card key={strategy.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{strategy.name}</CardTitle>
                        <Switch checked={strategy.active} />
                      </div>
                      <CardDescription>Mercado: {strategy.market}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Parâmetros:</h4>
                        <ul className="text-sm space-y-1">
                          {strategy.parameters.map((param, index) => (
                            <li key={index} className="flex justify-between">
                              <span className="text-muted-foreground">{param.name}:</span>
                              <span className="font-medium">{param.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="grid grid-cols-3 w-full text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Sinais</p>
                          <p className="font-medium">{strategy.performance.signals}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Taxa</p>
                          <p className="font-medium">{strategy.performance.winRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <p className="font-medium">{strategy.performance.roi}%</p>
                        </div>
                      </div>
                    </CardFooter>
                    <div className="px-6 pb-4 flex gap-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/strategies/${strategy.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" className="w-1/4">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {strategies
                  .filter((s) => s.active)
                  .map((strategy) => (
                    <Card key={strategy.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>{strategy.name}</CardTitle>
                          <Switch checked={strategy.active} />
                        </div>
                        <CardDescription>Mercado: {strategy.market}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Parâmetros:</h4>
                          <ul className="text-sm space-y-1">
                            {strategy.parameters.map((param, index) => (
                              <li key={index} className="flex justify-between">
                                <span className="text-muted-foreground">{param.name}:</span>
                                <span className="font-medium">{param.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="grid grid-cols-3 w-full text-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Sinais</p>
                            <p className="font-medium">{strategy.performance.signals}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Taxa</p>
                            <p className="font-medium">{strategy.performance.winRate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">ROI</p>
                            <p className="font-medium">{strategy.performance.roi}%</p>
                          </div>
                        </div>
                      </CardFooter>
                      <div className="px-6 pb-4 flex gap-2">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/strategies/${strategy.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="w-1/4">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {strategies
                  .filter((s) => !s.active)
                  .map((strategy) => (
                    <Card key={strategy.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>{strategy.name}</CardTitle>
                          <Switch checked={strategy.active} />
                        </div>
                        <CardDescription>Mercado: {strategy.market}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Parâmetros:</h4>
                          <ul className="text-sm space-y-1">
                            {strategy.parameters.map((param, index) => (
                              <li key={index} className="flex justify-between">
                                <span className="text-muted-foreground">{param.name}:</span>
                                <span className="font-medium">{param.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="grid grid-cols-3 w-full text-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Sinais</p>
                            <p className="font-medium">{strategy.performance.signals}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Taxa</p>
                            <p className="font-medium">{strategy.performance.winRate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">ROI</p>
                            <p className="font-medium">{strategy.performance.roi}%</p>
                          </div>
                        </div>
                      </CardFooter>
                      <div className="px-6 pb-4 flex gap-2">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/strategies/${strategy.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="w-1/4">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
