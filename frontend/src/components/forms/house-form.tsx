import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"

export default function HouseForm({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState({
    houseNum: "",
    status: "empty",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleStatusChange = (value: string) => {
    setForm({ ...form, status: value })
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Rumah</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2 w-full max-w-full">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="houseNum">Nomor Rumah</Label>
                <Input
                  id="houseNum"
                  name="houseNum"
                  value={form.houseNum}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="status">Status Rumah</Label>
                <Select value={form.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empty">Kosong</SelectItem>
                    <SelectItem value="contract">Kontrak</SelectItem>
                    <SelectItem value="permanent">Tetap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
