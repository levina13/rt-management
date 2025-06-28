import Layout from "@/components/Layout"
import { ErrorAlert } from "@/components/error-alert"
import PaymentForm from "@/components/forms/payment-form"
import DynamicBreadcrumb from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DataTable from "@/components/data-table"
import { PaymentHistoryColumn } from "@/lib/column"

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
          <div className="mt-5 flex flex-row-reverse justify-between">
            <PaymentForm houseId={houseId} onSuccess={fetchPayments}>
              <Button variant={"default"} disabled={paidStatus}>
                <PlusSquare /> Tambah Pembayaran
              </Button>
            </PaymentForm>
            <DynamicBreadcrumb />
          </div>
          {errors.length > 0 && (
            <ErrorAlert>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ErrorAlert>
          )}
          <div className="mt-4">
            <DataTable data={payments} columns={PaymentHistoryColumn} />
          </div>
        </div>
      </Layout>
    </>
  )
}
