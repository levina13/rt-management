import { AnnualChart } from "@/components/annual-chart"
import Layout from "@/components/Layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { type ChartData, type Search } from "../lib/type"
import { rupiah } from "@/lib/utils"
import { api } from "@/lib/axios"
import { months } from "@/lib/var"
import { ErrorAlert } from "@/components/error-alert"
import DataTable from "@/components/data-table"
import { TransactionColumn } from "@/lib/column"
import { Input } from "@/components/ui/input"

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
  const [errors, setErrors] = useState<string[]>([])
  const [search, setSearch] = useState<Search>()
  const yearList = generateYearsBetween()

  function fetchCardData() {
    api
      .get("/dashboard/card-data")
      .then((res) => setCardData(res.data))
      .catch(() => {
        setErrors(["Gagal mengambil data Pemasukan, Pengeluaran, dan Saldo."])
      })
  }

  function fetchChartData(year: number) {
    api
      .get(`/dashboard/chart-data/${year}`)
      .then((res) => {
        setChartData(res.data)
      })
      .catch(() => {
        setErrors((old) => [...old, "Gagal mengambil data untuk chart."])
      })
  }

  function fetchTableData(year: number, month: number) {
    api
      .get(`/dashboard/table-data/${year}/${month}`)
      .then((res) => setTableData(res.data))
      .catch(() => {
        setErrors((old) => [...old, "Gagal mengambil data untuk tabel."])
      })
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
          {errors.length > 0 && (
            <ErrorAlert>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ErrorAlert>
          )}
          <div className="mt-2 flex flex-wrap gap-2 justify-center ">
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
              <CardContent className="px-2 sm:px-2">
                <Input
                  placeholder="Cari transaksi..."
                  value={search?.value}
                  onChange={(event) =>
                    setSearch({ label: "name", value: event.target.value })
                  }
                  className="max-w-sm mb-2"
                />
                <DataTable
                  columns={TransactionColumn}
                  data={tableData}
                  search={search}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  )
}
