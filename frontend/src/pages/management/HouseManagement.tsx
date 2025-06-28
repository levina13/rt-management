import HouseForm from "@/components/forms/house-form"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { ErrorAlert } from "@/components/error-alert"
import DynamicBreadcrumb from "@/components/breadcrumb"
import DataTable from "@/components/data-table"
import { HouseColumn } from "@/lib/column"
import type { Search } from "@/lib/type"
import { Input } from "@/components/ui/input"

export default function HouseManagement() {
  const [houses, setHouses] = useState([])
  const [errors, setErrors] = useState<string[]>([])
  const [search, setSearch] = useState<Search>()

  function fetchHouses() {
    api
      .get("/house-table")
      .then((res) => setHouses(res.data))
      .catch(() => setErrors(["Gagal mengambil data untuk tabel."]))
  }
  useEffect(() => {
    fetchHouses()
  }, [])

  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Manajemen Rumah</p>
        </div>
        <div className="mt-5 flex flex-row-reverse justify-between">
          <HouseForm onSuccess={fetchHouses}>
            <Button variant={"default"}>
              <PlusSquare /> Tambah Rumah
            </Button>
          </HouseForm>
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
          <DataTable columns={HouseColumn} data={houses} search={search} />
        </div>
      </div>
    </Layout>
  )
}
