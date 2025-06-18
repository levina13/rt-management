import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { useState } from "react"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { DatePicker } from "../date-picker"
import { Button } from "../ui/button"

export default function ContractForm({
  children,
}: {
  children: React.ReactNode
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    isMarried: "no",
    houseNumber: "",
    startDate: "",
    endDate: "",
  })

  const handleMarriedChange = (value: string) => {
    setForm({ ...form, isMarried: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Submitted:", form)
    // POST ke API di sini kalau backend sudah siap
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-[30vw] max-h-[80vh]">
        <DialogHeader className="text-center items-center mb-3">
          <div className="text-2xl font-bold">Tambah Penghuni</div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 w-full max-w-full">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="status">Penghuni</Label>
                  <Select value={"Adi"} onValueChange={handleMarriedChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Adi</SelectItem>
                      <SelectItem value="yes">Rahmat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select value={"Adi"} onValueChange={handleMarriedChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Kontrak</SelectItem>
                      <SelectItem value="yes">Tetap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="Date">Tanggal Mulai</Label>
                  <DatePicker />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="Date">Tanggal Akhir</Label>
                  <DatePicker />
                </div>
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
  )
}
