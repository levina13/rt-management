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
import React from "react"
import { Button } from "@/components/ui/button"
import { LucideBookOpen } from "lucide-react"
import { ImageModal } from "@/components/image-modal"

export default function Dashboard() {
  const [month, setMonth] = React.useState("January")
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
                  Rp. 1.000.000,-
                </CardTitle>
              </CardContent>
            </Card>
            <Card className="w-fit bg-destructive text-secondary">
              <CardContent>
                <CardDescription className="text-secondary text-2xl">
                  Total Pengeluaran
                </CardDescription>
                <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  Rp. 1.000.000,-
                </CardTitle>
              </CardContent>
            </Card>
          </div>
          <div className="mt-5">
            <AnnualChart />
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
                    <SelectValue placeholder="january" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="january" className="rounded-lg">
                      january
                    </SelectItem>
                    <SelectItem value="february" className="rounded-lg">
                      february
                    </SelectItem>
                    <SelectItem value="March" className="rounded-lg">
                      March
                    </SelectItem>
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
                      <TableHead>Saldo</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">1</TableCell>
                      <TableCell>
                        Iuran Satpam ruma A-1 Periode Februari 2025
                      </TableCell>
                      <TableCell>21 Januari 2025</TableCell>
                      <TableCell>
                        <Badge variant={"default"}>Masuk</Badge>
                        <Badge variant={"destructive"}>Keluar</Badge>
                      </TableCell>
                      <TableCell className="">Rp.200.000</TableCell>
                      <TableCell>Rp. 500.000</TableCell>
                      <TableCell>
                        <ImageModal url="..." alt="...">
                          <Button>
                            <LucideBookOpen />
                            Bukti
                          </Button>
                        </ImageModal>
                      </TableCell>
                    </TableRow>
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
