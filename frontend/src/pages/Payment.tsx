import PaymentForm from "@/components/forms/payment-form"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { api } from "@/lib/axios"
import { MessageCircleMoreIcon, PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import type { FeeHistoryTable } from "./management/type"
import { ErrorAlert } from "@/components/error-alert"

export default function Payment() {
  const [fees, setfees] = useState([])
  const [errors, setErrors] = useState<string[]>([])
  function fetchFees() {
    api
      .get("/fee-history-table")
      .then((res) => setfees(res.data))
      .catch(() => setErrors(["Gagal mengambil data untuk tabel."]))
  }
  useEffect(() => {
    fetchFees()
  }, [])
  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Histori Iuran</p>
        </div>
        <div className="mt-5 flex flex-row-reverse flex-between">
          <div className="flex flex-row-reverse">
            <PaymentForm onSuccess={fetchFees}>
              <Button variant={"default"}>
                <PlusSquare /> Tambah Pembayaran
              </Button>
            </PaymentForm>
          </div>
        </div>
        {errors.length > 0 && (
          <ErrorAlert>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ErrorAlert>
        )}
        <div className="mt-4">
          <Table>
            <TableCaption>Daftar Iuran</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">No.</TableHead>
                <TableHead>Rumah</TableHead>
                <TableHead>Pembayar</TableHead>
                <TableHead>Jenis Iuran </TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Periode</TableHead>
                <TableHead>Tanggal Pembayaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((fee: FeeHistoryTable, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{fee.house_num}</TableCell>
                  <TableCell>
                    <div className="flex justify-between">
                      <div>{fee.resident_name}</div>
                      <div>
                        <Button variant={"outline"} asChild>
                          <a
                            href={`https://wa.me/62${fee.resident_phone.substring(
                              1
                            )}`}
                            target="blank"
                          >
                            <MessageCircleMoreIcon />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="">{fee.fee_category}</TableCell>
                  {/* <TableCell>
                  <Badge>Lunas</Badge>
                  <Badge variant={"destructive"}>Belum Bayar</Badge>
                </TableCell> */}
                  <TableCell>{fee.periode}</TableCell>
                  <TableCell>{fee.paid_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}
