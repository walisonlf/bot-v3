"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, Signal } from "lucide-react"

export function UpcomingMatches() {
  const matches = [
    {
      id: 1,
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      league: "La Liga",
      date: "26/05/2025",
      time: "16:00",
      odds: {
        home: 2.1,
        draw: 3.4,
        away: 3.2,
        over25: 1.85,
        btts: 1.75,
      },
    },
    {
      id: 2,
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      league: "Premier League",
      date: "26/05/2025",
      time: "17:30",
      odds: {
        home: 1.85,
        draw: 3.6,
        away: 4.0,
        over25: 1.65,
        btts: 1.7,
      },
    },
    {
      id: 3,
      homeTeam: "PSG",
      awayTeam: "Lyon",
      league: "Ligue 1",
      date: "27/05/2025",
      time: "15:00",
      odds: {
        home: 1.65,
        draw: 3.8,
        away: 5.0,
        over25: 1.75,
        btts: 1.9,
      },
    },
    {
      id: 4,
      homeTeam: "Bayern Munich",
      awayTeam: "Dortmund",
      league: "Bundesliga",
      date: "27/05/2025",
      time: "16:30",
      odds: {
        home: 1.55,
        draw: 4.2,
        away: 5.5,
        over25: 1.5,
        btts: 1.65,
      },
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {matches.map((match) => (
        <Card key={match.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline">{match.league}</Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {match.date}
                  <Clock className="h-3 w-3 ml-2 mr-1" />
                  {match.time}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">{match.homeTeam}</div>
                <div className="text-xs px-2">vs</div>
                <div className="text-sm font-medium text-right">{match.awayTeam}</div>
              </div>
            </div>
            <div className="p-4 bg-muted/50">
              <div className="grid grid-cols-5 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">1</div>
                  <Badge variant="outline" className="w-full">
                    {match.odds.home}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">X</div>
                  <Badge variant="outline" className="w-full">
                    {match.odds.draw}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">2</div>
                  <Badge variant="outline" className="w-full">
                    {match.odds.away}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">O2.5</div>
                  <Badge variant="outline" className="w-full">
                    {match.odds.over25}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">BTTS</div>
                  <Badge variant="outline" className="w-full">
                    {match.odds.btts}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Signal className="h-4 w-4 mr-2" />
                Analisar Partida
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
