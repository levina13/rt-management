import ExpenseForm from "@/components/forms/expense-form"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { type Search } from "../lib/type"
import { ErrorAlert } from "@/components/error-alert"
import DynamicBreadcrumb from "@/components/breadcrumb"
import { Input } from "@/components/ui/input"
import DataTable from "@/components/data-table"
import { ExpenseColumn } from "@/lib/column"

export default function Expense() {
  const [expenses, setExpenses] = useState([])
  const [errors, setErrors] = useState<string[]>([])
  const [search, setSearch] = useState<Search>()

  function fetchExpenses() {
    api
      .get("/expense-history-table")
      .then((res) => setExpenses(res.data))
      .catch(() => setErrors(["Gagal mengambil data untuk tabel."]))
  }
  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center flex items-center text-3xl font-bold">
            <p>Manajemen Pengeluaran</p>
          </div>
          <div className="mt-5 flex flex-row-reverse justify-between">
            <ExpenseForm onSuccess={fetchExpenses}>
              <Button variant={"default"}>
                <PlusSquare /> Tambah Pengeluaran
              </Button>
            </ExpenseForm>
            <DynamicBreadcrumb />
          </div>
          {errors.length > 0 && (
            <ErrorAlert>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ErrorAlert>
          )}
          <div className="mt-5">
            <Input
              placeholder="Cari Pengeluaran..."
              value={search?.value}
              onChange={(event) =>
                setSearch({ label: "desc", value: event.target.value })
              }
              className="max-w-sm mb-2"
            />
            <DataTable
              columns={ExpenseColumn}
              data={expenses}
              search={search}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
