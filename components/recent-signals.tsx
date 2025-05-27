"use client"

import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export function RecentSignals() {
  const signals = [
    {
      id: 1,
      match: "Barcelona vs Real Madrid",
      league: "La Liga",
      market: "Over 2.5 Gols",
      odd: 1.85,
      status: "win",
      date: "25/05/2025",
    },
    {
      id: 2,
      match: "Manchester City vs Liverpool",
      league: "Premier League",
      market: "Ambas Marcam",
      odd: 1.75,
      status: "win",
      date: "24/05/2025",
    },
    {
      id: 3,
      match: "PSG vs Lyon",
      league: "Ligue 1",
      market: "Resultado Final - PSG",
      odd: 1.65,
      status: "loss",
      date: "23/05/2025",
    },
    {
      id: 4,
      match: "Bayern Munich vs Dortmund",
      league: "Bundesliga",
      market: "Handicap Asiático -1.5",
      odd: 2.1,
      status: "win",
      date: "22/05/2025",
    },
    {
      id: 5,
      match: "Inter vs Milan",
      league: "Serie A",
      market: "Dupla Chance - 1X",
      odd: 1.45,
      status: "win",
      date: "21/05/2025",
    },
  ]

  return (
    <div className="space-y-4">
      {signals.map((signal) => (
        <div key={signal.id} className="flex items-center justify-between border-b pb-2">
          <div className="space-y-1">
            <p className="text-sm font-medium">{signal.match}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {signal.league}
              </Badge>
              <span className="text-xs text-muted-foreground">{signal.date}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {signal.market} @{signal.odd}
            </p>
          </div>
          <div>
            {signal.status === "win" ? (
              <Badge className="bg-emerald-500 hover:bg-emerald-600">
                <Check className="h-3 w-3 mr-1" /> Ganhou
              </Badge>
            ) : (
              <Badge variant="destructive">
                <X className="h-3 w-3 mr-1" /> Perdeu
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
