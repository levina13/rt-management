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
import { type ExpenseCategory } from "../../lib/type"
import { api } from "@/lib/axios"
import { isAxiosError } from "axios"
import { ErrorAlert } from "../error-alert"

export default function ExpenseForm({
  children,
  onSuccess,
}: {
  children: React.ReactNode
  onSuccess?: () => void
}) {
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [open, setOpen] = useState(false)
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  function emptyForm() {
    setErrors({})
    setCategory("")
    setDescription("")
    setAmount("")
  }

  useEffect(() => {
    api.get("/expense-categories").then((res) => setExpenseCategories(res.data))
  }, [])

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        description: description,
        expense_category: parseInt(category),
        amount: parseInt(amount),
      }

      await api.post("/expenses", payload)
      onSuccess?.()
      setOpen(false)
      emptyForm()
    } catch (err) {
      if (isAxiosError(err)) {
        setErrors(err.response?.data?.errors)
      }
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className=" max-h-[80vh]">
          <DialogHeader className="text-center items-center mb-3">
            <div className="text-2xl font-bold">Tambah Pengeluaran</div>
            <div className="flex w-full">
              {Object.keys(errors).length > 0 ? (
                <ErrorAlert>
                  {errors["description"] != undefined && (
                    <li>{errors["description"]}</li>
                  )}
                  {errors["expense_category"] != undefined && (
                    <li>{errors["expense_category"]}</li>
                  )}
                  {errors["amount"] != undefined && <li>{errors["amount"]}</li>}
                </ErrorAlert>
              ) : (
                <></>
              )}
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="flex flex-col gap-2 w-full max-w-full">
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="category">Jenis Pengeluaran</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
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
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="description">Deskripsi</Label>
                <Input
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="amount">Jumlah</Label>
                <Input
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  type="number"
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full mt-4">
              Simpan
            </Button>
            <ScrollBar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
