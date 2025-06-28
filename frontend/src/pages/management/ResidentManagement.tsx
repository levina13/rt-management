import ResidentForm from "@/components/forms/resident-form"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import type { Search } from "../../lib/type"
import { ErrorAlert } from "@/components/error-alert"
import DynamicBreadcrumb from "@/components/breadcrumb"
import DataTable from "@/components/data-table"
import { ResidentColumn } from "@/lib/column"
import { Input } from "@/components/ui/input"

export default function ResidentManagement() {
  const [residents, setResidents] = useState([])
  const [errors, setErrors] = useState<string[]>([])
  const [search, setSearch] = useState<Search>()

  function fetchResident() {
    api
      .get("/resident-table")
      .then((res) => setResidents(res.data))
      .catch(() => setErrors(["Gagal mengambil data untuk tabel."]))
  }
  useEffect(() => {
    fetchResident()
  }, [])
  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Manajemen Warga</p>
        </div>
        <div className="mt-5 flex flex-row-reverse justify-between">
          <ResidentForm onSuccess={fetchResident}>
            <Button variant={"default"}>
              <PlusSquare /> Tambah Warga
            </Button>
          </ResidentForm>
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
            placeholder="Cari Warga..."
            value={search?.value}
            onChange={(event) =>
              setSearch({ label: "name", value: event.target.value })
            }
            className="max-w-sm mb-2"
          />
          <DataTable
            data={residents}
            columns={ResidentColumn}
            search={search}
          />
        </div>
      </div>
    </Layout>
  )
}
