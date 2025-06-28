import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
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
import { api } from "@/lib/axios"
import { isAxiosError } from "axios"
import { ErrorAlert } from "../error-alert"

export default function ResidentForm({
  children,
  onSuccess,
  id,
}: {
  children: React.ReactNode
  onSuccess?: () => void
  id?: number
}) {
  const isEditing = !!id

  const initialForm = {
    name: "",
    phone: "",
    is_married: "0",
    ktp: "",
  }
  const [form, setForm] = useState(initialForm)
  const [open, setOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing && open) {
      api
        .get(`/residents/${id}`)
        .then((res) => {
          const data = res.data
          setForm({
            ...data,
            is_married: String(data.is_married),
          })
          setImagePreview(data.ktp_url)
        })
        .catch((err) => console.error("Failed to fetch resident", err))
    } else if (!isEditing) {
      setForm(initialForm)
    }
  }, [id, open])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleMarriedChange = (value: string) => {
    setForm({ ...form, is_married: value })
  }

  const handleSubmit = async () => {
    let photoUrl = form.ktp

    if (imageFile) {
      const formData = new FormData()
      formData.append("image", imageFile)
      const res = await api.post("/upload-ktp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      photoUrl = res.data.url
    }

    const payload = {
      ...form,
      ktp: photoUrl,
      is_married: form.is_married === "1",
    }

    try {
      if (isEditing) {
        await api.put(`/residents/${id}`, payload)
      } else {
        await api.post("/residents", payload)
      }
      onSuccess?.()
      setOpen(false)
      setForm(initialForm)
      setErrors({})
      setImagePreview("")
      console.log("aman")
    } catch (err) {
      if (isAxiosError(err)) {
        setErrors(err.response?.data?.errors)
      }
      console.log(err)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="md:max-w-[70vw] w-fit max-h-[90vh]">
          <DialogHeader className="text-center items-center mb-3">
            <div className="text-2xl font-bold">
              {isEditing ? "Edit" : "Tambah"} Warga
            </div>
            <div className="flex w-full">
              {Object.keys(errors).length > 0 ? (
                <ErrorAlert>
                  {errors["name"] != undefined && <li>{errors["name"]}</li>}
                  {errors["phone"] != undefined && <li>{errors["phone"]}</li>}
                  {errors["is_married"] != undefined && (
                    <li>{errors["is_married"]}</li>
                  )}
                  {errors["ktp"] != undefined && <li>{errors["ktp"]}</li>}
                </ErrorAlert>
              ) : (
                <></>
              )}
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 w-full max-w-full">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="phone">No. HP</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="status">Status Pernikahan</Label>
                  <Select
                    value={form.is_married}
                    onValueChange={handleMarriedChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Single</SelectItem>
                      <SelectItem value="1">Sudah Menikah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="ktp">KTP</Label>
                  <Input
                    id="ktp"
                    name="ktp"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full mt-4">
              Simpan
            </Button>
            <Scrollbar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
