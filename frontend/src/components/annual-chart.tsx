"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-01-01", pemasukan: 222, pengeluaran: 150, saldo: 70 },
  { date: "2024-02-02", pemasukan: 97, pengeluaran: 180, saldo: 100 },
  { date: "2024-03-03", pemasukan: 167, pengeluaran: 120, saldo: 120 },
  { date: "2024-04-04", pemasukan: 242, pengeluaran: 260, saldo: 50 },
  { date: "2024-05-05", pemasukan: 373, pengeluaran: 290, saldo: 100 },
  { date: "2024-06-06", pemasukan: 301, pengeluaran: 340, saldo: 200 },
  { date: "2024-07-07", pemasukan: 245, pengeluaran: 180, saldo: 350 },
  { date: "2024-08-08", pemasukan: 409, pengeluaran: 320, saldo: 400 },
  { date: "2024-09-09", pemasukan: 59, pengeluaran: 110, saldo: 200 },
  { date: "2024-10-10", pemasukan: 261, pengeluaran: 190, saldo: 250 },
  { date: "2024-11-11", pemasukan: 327, pengeluaran: 350, saldo: 270 },
  { date: "2024-12-11", pemasukan: 327, pengeluaran: 350, saldo: 300 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  pemasukan: {
    label: "Pemasukan",
    color: "black",
  },
  pengeluaran: {
    label: "Pengeluaran",
    color: "red",
  },
  saldo: {
    label: "Saldo",
    color: "green",
  },
} satisfies ChartConfig

export function AnnualChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Grafik Iuran, pengeluaran, dan saldo</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="fillPemasukan" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pemasukan)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pemasukan)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPengeluaran" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pengeluaran)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pengeluaran)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSaldo" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-saldo)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-saldo)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              dataKey="pengeluaran"
              type="natural"
              fill="url(#fillPengeluaran)"
              stroke="var(--color-pengeluaran)"
              dot={false}
            />
            <Line
              dataKey="pemasukan"
              type="natural"
              fill="url(#fillSaldo)"
              stroke="var(--color-pemasukan)"
              dot={false}
            />
            <Line
              dataKey="saldo"
              type="natural"
              fill="url(#fillSaldo)"
              stroke="var(--color-saldo)"
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
