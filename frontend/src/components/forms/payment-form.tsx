import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import React, { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ScrollArea } from "../ui/scroll-area"
import { Scrollbar } from "@radix-ui/react-scroll-area"
import { Separator } from "../ui/separator"
import { MonthCheckbox } from "../month-checkbox"
import { DatePicker } from "../date-picker"

export default function PaymentForm({
  children,
}: {
  children: React.ReactNode
}) {
  const [form, setForm] = useState({
    house_number: "",
    resident: "",
    fee_category: "",
    payment_date: "no",
    year: "",
    months: ["january"] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFeeCategoryChange = (value: string) => {
    setForm({ ...form, fee_category: value })
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
        <DialogContent className="md:max-w-[70vw] max-h-[80vh] w-fit ">
          <DialogHeader className="text-center items-center mb-3">
            <div className="text-2xl font-bold">Konfirmasi Pembayaran</div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] ">
            <form onSubmit={handleSubmit} className="space-y-4 m-5">
              <div className="flex flex-col  md:grid md:grid-cols-2 gap-1 md:gap-x-4">
                <div className="flex flex-col gap-2 w-full max-w-full">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="houseNum">Nomor Rumah</Label>
                    <Input
                      id="houseNum"
                      name="houseNum"
                      value={form.house_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="name">Pembayar</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.resident}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="status">Jenis Iuran</Label>
                    <Select
                      value={form.fee_category}
                      onValueChange={handleFeeCategoryChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih iuran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Kebersihan</SelectItem>
                        <SelectItem value="yes">Satpam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="Date">Tanggal Pembayaran</Label>
                    <DatePicker />
                  </div>
                </div>
                <Separator className="md:hidden mt-2" />
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold">Periode Iuran</div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="year">Tahun</Label>
                    <Select
                      value={form.year}
                      onValueChange={handleFeeCategoryChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Tahun" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="endDate">Bulan</Label>
                    <MonthCheckbox
                      selectedMonths={form.months}
                      onChange={(months) =>
                        setForm((prev) => ({ ...prev, months }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Simpan
              </Button>
            </form>
            <Scrollbar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
