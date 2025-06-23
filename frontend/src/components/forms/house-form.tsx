import type React from "react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { api } from "@/lib/axios"
import { isAxiosError } from "axios"
import { ErrorAlert } from "../error-alert"

export default function HouseForm({
  children,
  onSuccess,
  id,
}: {
  children: React.ReactNode
  onSuccess?: () => void
  id?: number
}) {
  const initialForm = {
    house_num: "",
  }
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const isEditing = !!id

  useEffect(() => {
    if (isEditing && open) {
      api.get(`/houses/${id}`).then((res) => setForm(res.data))
    } else if (!isEditing) {
      setForm(initialForm)
    }
  }, [id, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await api.put(`/houses/${id}`, form)
      } else {
        await api.post("/houses", form)
      }
      onSuccess?.()
      setOpen(false)
      setForm(initialForm)
      setErrors({})
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit" : "Tambah"} Rumah</DialogTitle>
            <div className="flex w-full">
              {Object.keys(errors).length > 0 ? (
                <ErrorAlert>
                  {errors["house_num"] != undefined && (
                    <li>{errors["house_num"]}</li>
                  )}
                </ErrorAlert>
              ) : (
                <></>
              )}
            </div>
          </DialogHeader>

          <div className="flex flex-col gap-2 w-full max-w-full">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="house_num">Nomor Rumah</Label>
              <Input
                id="house_num"
                name="house_num"
                value={form.house_num}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
