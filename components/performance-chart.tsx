"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "01/05", profit: 0 },
  { date: "05/05", profit: 1.2 },
  { date: "10/05", profit: 0.8 },
  { date: "15/05", profit: 2.5 },
  { date: "20/05", profit: 3.8 },
  { date: "25/05", profit: 3.2 },
  { date: "30/05", profit: 4.5 },
]

export function PerformanceChart() {
  return (
    <ChartContainer
      config={{
        profit: {
          label: "Lucro (unidades)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs text-muted-foreground"
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} className="text-xs text-muted-foreground" />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="var(--color-profit)"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
