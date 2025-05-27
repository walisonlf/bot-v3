import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Signal, RefreshCw, MessageSquare, Search } from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentSignals } from "@/components/recent-signals"
import { UpcomingMatches } from "@/components/upcoming-matches"
import { PerformanceChart } from "@/components/performance-chart"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Signal className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">FootballBetBot</h1>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
              <Link href="/" className="text-primary">
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
              <Link href="/settings" className="text-muted-foreground transition-colors hover:text-foreground">
                Configurações
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/sync">Sincronizar Dados</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signals/create">Novo Sinal</Link>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Últimos 7 dias
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Teste da API</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/test/api-football">
                    <Search className="mr-2 h-4 w-4" />
                    Testar API-Football
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Teste do Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/test/telegram">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Testar Telegram
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sincronizar Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/sync">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sincronizar e Analisar
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Estratégias</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/strategies">
                    <Signal className="mr-2 h-4 w-4" />
                    Gerenciar Estratégias
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="signals">Sinais</TabsTrigger>
              <TabsTrigger value="matches">Partidas</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <DashboardStats />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                    <CardDescription>Desempenho dos sinais enviados nos últimos 30 dias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Sinais Recentes</CardTitle>
                    <CardDescription>Últimos sinais enviados para o Telegram</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSignals />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-7">
                  <CardHeader>
                    <CardTitle>Próximas Partidas</CardTitle>
                    <CardDescription>Partidas que serão analisadas nas próximas 24 horas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingMatches />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="signals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todos os Sinais</CardTitle>
                  <CardDescription>Histórico completo de sinais enviados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Link href="/signals">
                      <Button>Ver Todos os Sinais</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="matches" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todas as Partidas</CardTitle>
                  <CardDescription>Partidas coletadas da API-Football</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Link href="/matches">
                      <Button>Ver Todas as Partidas</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
