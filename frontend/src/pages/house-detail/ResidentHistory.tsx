import { ErrorAlert } from "@/components/error-alert"
import ContractForm from "@/components/forms/contract-form"
import DynamicBreadcrumb from "@/components/breadcrumb"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DataTable from "@/components/data-table"
import { ResidentHistoryColumn } from "@/lib/column"
import type { Search } from "@/lib/type"
import { Input } from "@/components/ui/input"

export default function ResidentHistory() {
  const { houseId } = useParams<{ houseId: string }>()
  const [residents, setResidents] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [search, setSearch] = useState<Search>()

  function fetchResidents() {
    api
      .get(`/houses/${houseId}/residents`)
      .then((res) => {
        setResidents(res.data.residents)
        setDisabled(res.data.current_contract === "permanen" ? true : false)
      })
      .catch(() => setErrors(["Gagal mengambil data untuk tabel."]))
  }

  useEffect(() => {
    fetchResidents()
  }, [])

  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center flex items-center text-3xl font-bold">
            <p>History Penghuni Rumah ...</p>
          </div>
          <div className="mt-5 flex flex-row-reverse justify-between">
            <ContractForm onSuccess={fetchResidents}>
              <Button variant={"default"} disabled={disabled}>
                <PlusSquare /> Tambah Penghuni
              </Button>
            </ContractForm>
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
              placeholder="Cari Penghuni..."
              value={search?.value}
              onChange={(event) =>
                setSearch({ label: "name", value: event.target.value })
              }
              className="max-w-sm mb-2"
            />
            <DataTable
              data={residents}
              columns={ResidentHistoryColumn}
              search={search}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
