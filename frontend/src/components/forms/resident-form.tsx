import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"
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

export default function ResidentForm({
  children,
}: {
  children: React.ReactNode
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    isMarried: "no",
    ktp: "",
    houseNumber: "",
    startDate: "",
    endDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleMarriedChange = (value: string) => {
    setForm({ ...form, isMarried: value })
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
        <DialogContent className="md:max-w-[70vw] w-fit max-h-[80vh]">
          <DialogHeader className="text-center items-center mb-3">
            <div className="text-2xl font-bold">Tambah Warga</div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <div className="flex flex-col gap-2 w-full max-w-full">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="phone">No. HP</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="status">Status Pernikahan</Label>
                    <Select
                      value={form.isMarried}
                      onValueChange={handleMarriedChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Single</SelectItem>
                        <SelectItem value="yes">Sudah Menikah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="ktp">KTP</Label>
                    <Input
                      id="ktp"
                      name="ktp"
                      value={form.ktp}
                      type="file"
                      onChange={handleChange}
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
