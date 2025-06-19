import { AnnualChart } from "@/components/annual-chart"
import Layout from "@/components/Layout"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useEffect, useState } from "react"
import { type ChartData } from "./management/type"
import { rupiah } from "@/lib/utils"
import { api } from "@/lib/axios"
import { months } from "@/lib/var"

function generateYearsBetween(startYear = 2024) {
  const endDate = new Date().getFullYear()
  const years = []

  for (let i = startYear; i <= endDate; i++) {
    years.push(String(startYear))
    startYear++
  }
  return years
}

export default function Dashboard() {
  const initialCard = {
    balance: 0,
    total_expenses: 0,
    total_payments: 0,
  }
  const [year, setYear] = useState("2025")
  const [month, setMonth] = useState(months[0].value)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [cardData, setCardData] = useState(initialCard)
  const [tableData, setTableData] = useState([])
  const yearList = generateYearsBetween()

  function fetchCardData() {
    api
      .get("/dashboard/card-data")
      .then((res) => setCardData(res.data))
      .catch((err) => console.error(err))
  }

  function fetchChartData(year: number) {
    api
      .get(`/dashboard/chart-data/${year}`)
      .then((res) => {
        setChartData(res.data)
      })
      .catch((err) => console.error(err))
  }

  function fetchTableData(year: number, month: number) {
    api
      .get(`/dashboard/table-data/${year}/${month}`)
      .then((res) => setTableData(res.data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchCardData()
  }, [])

  useEffect(() => {
    fetchChartData(parseInt(year))
  }, [year])

  useEffect(() => {
    fetchTableData(parseInt(year), parseInt(month))
  }, [year, month])

  return (
    <>
      <Layout>
        <div className="container">
          <div className=" flex flex-row gap-4 justify-center">
            <Card className="w-fit">
              <CardContent>
                <CardDescription className="text-2xl">
                  Saldo Sekarang
                </CardDescription>
                <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {rupiah(cardData.balance)}
                </CardTitle>
              </CardContent>
            </Card>
            <Card className="w-fit bg-destructive text-secondary">
              <CardContent>
                <CardDescription className="text-secondary text-2xl">
                  Total Pengeluaran
                </CardDescription>
                <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {rupiah(cardData.total_expenses)}
                </CardTitle>
              </CardContent>
            </Card>
            <Card className="w-fit bg-emerald-400 text-secondary">
              <CardContent>
                <CardDescription className="text-secondary text-2xl">
                  Total Pemasukan
                </CardDescription>
                <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {rupiah(cardData.total_payments)}
                </CardTitle>
              </CardContent>
            </Card>
          </div>
          <div className="mt-5">
            <AnnualChart chartData={chartData}>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger
                  className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                  aria-label="Pilih Tahun"
                >
                  <SelectValue placeholder="2025" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {yearList.map((year) => (
                    <SelectItem className="rounded-lg" key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AnnualChart>
          </div>
          <div className="mt-10 flex flex-col">
            <Card className="pt-0">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                  <CardTitle>Detail Transaksi Per Bulan</CardTitle>
                </div>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger
                    className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                    aria-label="Select a value"
                  >
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {months.map((month) => (
                      <SelectItem key={month.value} value={String(month.value)}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <Table>
                  <TableCaption>Daftar Transaksi</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]">No.</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row["name"]}</TableCell>
                        <TableCell>{row["date"]}</TableCell>
                        <TableCell>
                          {row["type"] == "Pemasukan" ? (
                            <Badge>Pemasukan</Badge>
                          ) : (
                            <Badge variant={"destructive"}>Pengeluaran</Badge>
                          )}
                        </TableCell>
                        <TableCell>{row["amount"]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  )
}
