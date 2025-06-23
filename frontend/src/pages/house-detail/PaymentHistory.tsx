import Layout from "@/components/Layout"
import { ErrorAlert } from "@/components/error-alert"
import PaymentForm from "@/components/forms/payment-form"
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
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PaymentHistory() {
  const { houseId } = useParams<{ houseId: string }>()
  const [payments, setPayments] = useState([])
  const [house, setHouse] = useState([])
  const [errors, setErrors] = useState<string[]>([])
  const [paidStatus, setPaidStatus] = useState(false)

  function fetchPayments() {
    api
      .get(`/houses/${houseId}/payments`)
      .then((res) => {
        setPayments(res.data.fees)
        setHouse(res.data.house)
        setPaidStatus(res.data.house.is_paid)
      })
      .catch(() => setErrors(["Gagal mengambil data untuk tabel."]))
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center flex items-center text-3xl font-bold">
            <p>History Pembayaran Rumah {house[0]?.["house_name"]}</p>
          </div>
          <div className="mt-5 flex flex-row-reverse">
            <div className="flex flex-row-reverse">
              <PaymentForm houseId={houseId} onSuccess={fetchPayments}>
                <Button variant={"default"} disabled={paidStatus}>
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
              <TableCaption>Daftar pembayaran rumah ...</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">No.</TableHead>
                  <TableHead>Penghuni</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Jenis Iuran </TableHead>
                  <TableHead>Tanggal Pembayaran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment, index) => (
                  <TableRow>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{payment["resident_name"]}</TableCell>
                    <TableCell>{payment["periode"]}</TableCell>
                    <TableCell className="">
                      {payment["fee_category"]}
                    </TableCell>
                    <TableCell>{payment["paid_at"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  )
}
