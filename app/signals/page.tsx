import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Download, Eye, Plus, Search, X } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function SignalsPage() {
  const signals = [
    {
      id: 1,
      match: "Barcelona vs Real Madrid",
      league: "La Liga",
      date: "25/05/2025",
      time: "16:00",
      market: "Over 2.5 Gols",
      prediction: "Mais de 2.5 Gols",
      odd: 1.85,
      status: "win",
      strategy: "Over 2.5 Gols",
    },
    {
      id: 2,
      match: "Manchester City vs Liverpool",
      league: "Premier League",
      date: "24/05/2025",
      time: "17:30",
      market: "Ambas Marcam",
      prediction: "Sim",
      odd: 1.75,
      status: "win",
      strategy: "Ambas Marcam (BTTS)",
    },
    {
      id: 3,
      match: "PSG vs Lyon",
      league: "Ligue 1",
      date: "23/05/2025",
      time: "15:00",
      market: "Resultado Final",
      prediction: "PSG",
      odd: 1.65,
      status: "loss",
      strategy: "Favorito em Casa",
    },
    {
      id: 4,
      match: "Bayern Munich vs Dortmund",
      league: "Bundesliga",
      date: "22/05/2025",
      time: "16:30",
      market: "Handicap Asiático",
      prediction: "Bayern -1.5",
      odd: 2.1,
      status: "win",
      strategy: "Handicap Asiático -1.5",
    },
    {
      id: 5,
      match: "Inter vs Milan",
      league: "Serie A",
      date: "21/05/2025",
      time: "15:45",
      market: "Dupla Chance",
      prediction: "1X",
      odd: 1.45,
      status: "win",
      strategy: "Dupla Chance 1X",
    },
    {
      id: 6,
      match: "Flamengo vs Palmeiras",
      league: "Brasileirão",
      date: "20/05/2025",
      time: "20:00",
      market: "Over 1.5 Gols",
      prediction: "Mais de 1.5 Gols",
      odd: 1.35,
      status: "win",
      strategy: "Over 1.5 Gols",
    },
    {
      id: 7,
      match: "Arsenal vs Tottenham",
      league: "Premier League",
      date: "19/05/2025",
      time: "17:00",
      market: "Ambas Marcam",
      prediction: "Sim",
      odd: 1.7,
      status: "loss",
      strategy: "Ambas Marcam (BTTS)",
    },
    {
      id: 8,
      match: "Juventus vs Roma",
      league: "Serie A",
      date: "18/05/2025",
      time: "16:00",
      market: "Resultado Final",
      prediction: "Juventus",
      odd: 1.8,
      status: "win",
      strategy: "Favorito em Casa",
    },
    {
      id: 9,
      match: "Atlético Madrid vs Sevilla",
      league: "La Liga",
      date: "17/05/2025",
      time: "18:30",
      market: "Under 2.5 Gols",
      prediction: "Menos de 2.5 Gols",
      odd: 1.9,
      status: "loss",
      strategy: "Under 2.5 Gols",
    },
    {
      id: 10,
      match: "PSG vs Marseille",
      league: "Ligue 1",
      date: "16/05/2025",
      time: "21:00",
      market: "Handicap Asiático",
      prediction: "PSG -1.5",
      odd: 2.05,
      status: "win",
      strategy: "Handicap Asiático -1.5",
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
              <Link href="/strategies" className="text-muted-foreground transition-colors hover:text-foreground">
                Estratégias
              </Link>
              <Link href="/matches" className="text-muted-foreground transition-colors hover:text-foreground">
                Partidas
              </Link>
              <Link href="/signals" className="text-primary">
                Sinais
              </Link>
              <Link href="/settings" className="text-muted-foreground transition-colors hover:text-foreground">
                Configurações
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button size="sm" asChild>
                <Link href="/signals/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Sinal
                </Link>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Sinais</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="win">Ganhos</TabsTrigger>
              <TabsTrigger value="loss">Perdidos</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Filtros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Liga</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as Ligas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Ligas</SelectItem>
                          <SelectItem value="premier-league">Premier League</SelectItem>
                          <SelectItem value="la-liga">La Liga</SelectItem>
                          <SelectItem value="serie-a">Serie A</SelectItem>
                          <SelectItem value="bundesliga">Bundesliga</SelectItem>
                          <SelectItem value="ligue-1">Ligue 1</SelectItem>
                          <SelectItem value="brasileirao">Brasileirão</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mercado</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os Mercados" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os Mercados</SelectItem>
                          <SelectItem value="over-under">Over/Under</SelectItem>
                          <SelectItem value="btts">Ambas Marcam</SelectItem>
                          <SelectItem value="1x2">Resultado Final</SelectItem>
                          <SelectItem value="asian-handicap">Handicap Asiático</SelectItem>
                          <SelectItem value="double-chance">Dupla Chance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estratégia</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as Estratégias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Estratégias</SelectItem>
                          <SelectItem value="over-25">Over 2.5 Gols</SelectItem>
                          <SelectItem value="btts">Ambas Marcam (BTTS)</SelectItem>
                          <SelectItem value="home-favorite">Favorito em Casa</SelectItem>
                          <SelectItem value="asian-handicap">Handicap Asiático -1.5</SelectItem>
                          <SelectItem value="double-chance-1x">Dupla Chance 1X</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Buscar</label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Buscar por time ou partida..." className="pl-8" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Partida</TableHead>
                        <TableHead>Liga</TableHead>
                        <TableHead>Mercado</TableHead>
                        <TableHead>Previsão</TableHead>
                        <TableHead>Odd</TableHead>
                        <TableHead>Estratégia</TableHead>
                        <TableHead>Resultado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signals.map((signal) => (
                        <TableRow key={signal.id}>
                          <TableCell>
                            <div className="font-medium">{signal.date}</div>
                            <div className="text-xs text-muted-foreground">{signal.time}</div>
                          </TableCell>
                          <TableCell>{signal.match}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{signal.league}</Badge>
                          </TableCell>
                          <TableCell>{signal.market}</TableCell>
                          <TableCell>{signal.prediction}</TableCell>
                          <TableCell>{signal.odd}</TableCell>
                          <TableCell>{signal.strategy}</TableCell>
                          <TableCell>
                            {signal.status === "win" ? (
                              <Badge className="bg-emerald-500 hover:bg-emerald-600">
                                <Check className="h-3 w-3 mr-1" /> Ganhou
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <X className="h-3 w-3 mr-1" /> Perdeu
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/signals/${signal.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver detalhes</span>
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="win" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Filtros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Liga</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as Ligas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Ligas</SelectItem>
                          <SelectItem value="premier-league">Premier League</SelectItem>
                          <SelectItem value="la-liga">La Liga</SelectItem>
                          <SelectItem value="serie-a">Serie A</SelectItem>
                          <SelectItem value="bundesliga">Bundesliga</SelectItem>
                          <SelectItem value="ligue-1">Ligue 1</SelectItem>
                          <SelectItem value="brasileirao">Brasileirão</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mercado</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os Mercados" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os Mercados</SelectItem>
                          <SelectItem value="over-under">Over/Under</SelectItem>
                          <SelectItem value="btts">Ambas Marcam</SelectItem>
                          <SelectItem value="1x2">Resultado Final</SelectItem>
                          <SelectItem value="asian-handicap">Handicap Asiático</SelectItem>
                          <SelectItem value="double-chance">Dupla Chance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estratégia</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as Estratégias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Estratégias</SelectItem>
                          <SelectItem value="over-25">Over 2.5 Gols</SelectItem>
                          <SelectItem value="btts">Ambas Marcam (BTTS)</SelectItem>
                          <SelectItem value="home-favorite">Favorito em Casa</SelectItem>
                          <SelectItem value="asian-handicap">Handicap Asiático -1.5</SelectItem>
                          <SelectItem value="double-chance-1x">Dupla Chance 1X</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Buscar</label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Buscar por time ou partida..." className="pl-8" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Partida</TableHead>
                        <TableHead>Liga</TableHead>
                        <TableHead>Mercado</TableHead>
                        <TableHead>Previsão</TableHead>
                        <TableHead>Odd</TableHead>
                        <TableHead>Estratégia</TableHead>
                        <TableHead>Resultado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signals
                        .filter((s) => s.status === "win")
                        .map((signal) => (
                          <TableRow key={signal.id}>
                            <TableCell>
                              <div className="font-medium">{signal.date}</div>
                              <div className="text-xs text-muted-foreground">{signal.time}</div>
                            </TableCell>
                            <TableCell>{signal.match}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{signal.league}</Badge>
                            </TableCell>
                            <TableCell>{signal.market}</TableCell>
                            <TableCell>{signal.prediction}</TableCell>
                            <TableCell>{signal.odd}</TableCell>
                            <TableCell>{signal.strategy}</TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-500 hover:bg-emerald-600">
                                <Check className="h-3 w-3 mr-1" /> Ganhou
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/signals/${signal.id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Ver detalhes</span>
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="loss" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Filtros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Liga</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as Ligas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Ligas</SelectItem>
                          <SelectItem value="premier-league">Premier League</SelectItem>
                          <SelectItem value="la-liga">La Liga</SelectItem>
                          <SelectItem value="serie-a">Serie A</SelectItem>
                          <SelectItem value="bundesliga">Bundesliga</SelectItem>
                          <SelectItem value="ligue-1">Ligue 1</SelectItem>
                          <SelectItem value="brasileirao">Brasileirão</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mercado</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os Mercados" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os Mercados</SelectItem>
                          <SelectItem value="over-under">Over/Under</SelectItem>
                          <SelectItem value="btts">Ambas Marcam</SelectItem>
                          <SelectItem value="1x2">Resultado Final</SelectItem>
                          <SelectItem value="asian-handicap">Handicap Asiático</SelectItem>
                          <SelectItem value="double-chance">Dupla Chance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estratégia</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as Estratégias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Estratégias</SelectItem>
                          <SelectItem value="over-25">Over 2.5 Gols</SelectItem>
                          <SelectItem value="btts">Ambas Marcam (BTTS)</SelectItem>
                          <SelectItem value="home-favorite">Favorito em Casa</SelectItem>
                          <SelectItem value="asian-handicap">Handicap Asiático -1.5</SelectItem>
                          <SelectItem value="double-chance-1x">Dupla Chance 1X</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Buscar</label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Buscar por time ou partida..." className="pl-8" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Partida</TableHead>
                        <TableHead>Liga</TableHead>
                        <TableHead>Mercado</TableHead>
                        <TableHead>Previsão</TableHead>
                        <TableHead>Odd</TableHead>
                        <TableHead>Estratégia</TableHead>
                        <TableHead>Resultado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signals
                        .filter((s) => s.status === "loss")
                        .map((signal) => (
                          <TableRow key={signal.id}>
                            <TableCell>
                              <div className="font-medium">{signal.date}</div>
                              <div className="text-xs text-muted-foreground">{signal.time}</div>
                            </TableCell>
                            <TableCell>{signal.match}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{signal.league}</Badge>
                            </TableCell>
                            <TableCell>{signal.market}</TableCell>
                            <TableCell>{signal.prediction}</TableCell>
                            <TableCell>{signal.odd}</TableCell>
                            <TableCell>{signal.strategy}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">
                                <X className="h-3 w-3 mr-1" /> Perdeu
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/signals/${signal.id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Ver detalhes</span>
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
