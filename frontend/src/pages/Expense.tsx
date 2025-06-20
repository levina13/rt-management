import ExpenseForm from "@/components/forms/expense-form"
import Layout from "@/components/Layout"
import { Badge } from "@/components/ui/badge"
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
import type { ExpenseHistoryTable } from "./management/type"
import { rupiah } from "@/lib/utils"

export default function Expense() {
  const [expenses, setExpenses] = useState([])

  function fetchExpenses() {
    api
      .get("/expense-history-table")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err))
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
          <div className="mt-5 flex flex-row-reverse">
            <div className="flex flex-row-reverse">
              <ExpenseForm>
                <Button variant={"default"}>
                  <PlusSquare /> Tambah Pengeluaran
                </Button>
              </ExpenseForm>
            </div>
          </div>
          <div>
            <Table>
              <TableCaption>Daftar Pengeluaran di RT..</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">No.</TableHead>
                  <TableHead>Jenis Pengeluaran</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense: ExpenseHistoryTable, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Badge>{expense.expense_category}</Badge>
                    </TableCell>
                    <TableCell>{expense.desc}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{rupiah(expense.amount)}</TableCell>
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
