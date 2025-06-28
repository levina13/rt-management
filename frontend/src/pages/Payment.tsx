import PaymentForm from "@/components/forms/payment-form"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { ErrorAlert } from "@/components/error-alert"
import DynamicBreadcrumb from "@/components/breadcrumb"
import DataTable from "@/components/data-table"
import { FeeColumn } from "@/lib/column"
import type { Search } from "@/lib/type"
import { Input } from "@/components/ui/input"

export default function Payment() {
  const [fees, setfees] = useState([])
  const [errors, setErrors] = useState<string[]>([])
  const [search, setSearch] = useState<Search>()

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
        <div className="mt-5 flex flex-row-reverse justify-between">
          <PaymentForm onSuccess={fetchFees}>
            <Button variant={"default"}>
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
          <Input
            placeholder="Cari Rumah..."
            value={search?.value}
            onChange={(event) =>
              setSearch({ label: "house_num", value: event.target.value })
            }
            className="max-w-sm mb-2"
          />

          <DataTable columns={FeeColumn} data={fees} search={search} />
        </div>
      </div>
    </Layout>
  )
}
