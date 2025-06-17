import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { ScrollBar } from "../ui/scroll-area"
import { type ExpenseCategory } from "../../pages/management/type"
import { api } from "@/lib/axios"

export default function ExpenseForm({
  children,
  onSuccess,
}: {
  children: React.ReactNode
  onSuccess?: () => void
}) {
  const initialForm = {
    expense_category: "",
    description: "",
    amount: "",
  }
  const [form, setForm] = useState(initialForm)
  const [open, setOpen] = useState(false)
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  )

  useEffect(() => {
    api.get("/expense-categories").then((res) => setExpenseCategories(res.data))
  })

  const handleCategoryChange = (value: string) => {
    setForm({ ...form, expense_category: value })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        ...form,
        expense_category: parseInt(form.expense_category),
        amount: parseInt(form.amount),
      }

      await api.post("/expenses", payload)
      onSuccess?.()
      setOpen(false)
    } catch (error) {
      console.error("submit failed", error)
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className=" max-h-[80vh]">
          <DialogHeader className="text-center items-center mb-3">
            <div className="text-2xl font-bold">Tambah Pengeluaran</div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="flex flex-col gap-2 w-full max-w-full">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="category">Jenis Pengeluaran</Label>
                <Select
                  value={form.expense_category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Pengeluaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((expenseCategory) => (
                      <SelectItem
                        value={String(expenseCategory.id)}
                        key={expenseCategory.id}
                      >
                        {expenseCategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="description">Deskripsi</Label>
                <Input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="amount">Jumlah</Label>
                <Input
                  id="amount"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Simpan
            </Button>
            <ScrollBar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
