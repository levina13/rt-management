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
import { useState } from "react"
import { DatePicker } from "../date-picker"
import { Button } from "../ui/button"
import { ScrollBar } from "../ui/scroll-area"

export default function ExpenseForm({
  children,
}: {
  children: React.ReactNode
}) {
  const [form, setForm] = useState({
    category: "",
    description: "",
    amount: "",
    bill: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleCategoryChange = (value: string) => {
    setForm({ ...form, category: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Submitted:", form)
    // POST ke API di sini kalau backend sudah siap
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className=" max-h-[80vh]">
          <DialogHeader className="text-center items-center mb-3">
            <div className="text-2xl font-bold">Tambah Pengeluaran</div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2 w-full max-w-full">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="category">Jenis Pengeluaran</Label>
                  <Select
                    value={form.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Pengeluaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Gaji Satpam</SelectItem>
                      <SelectItem value="2">Listrik Pos Satpam</SelectItem>
                      <SelectItem value="3">Perbaikan Jalan</SelectItem>
                      <SelectItem value="4">Perbaikan Selokan</SelectItem>
                      <SelectItem value="5">Lainnya</SelectItem>
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
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="Date">Tanggal Pembayaran</Label>
                  <DatePicker />
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
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="bill">Bukti Pembayaran</Label>
                  <Input
                    id="bill"
                    name="bill"
                    value={form.bill}
                    type="file"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Simpan
              </Button>
            </form>
            <ScrollBar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
