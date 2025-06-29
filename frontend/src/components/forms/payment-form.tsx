import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import React, { useEffect, useState } from "react"
import { Label } from "../ui/label"
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
import { type FeeCategory, type House } from "@/lib/type"
import { isAxiosError } from "axios"
import { ErrorAlert } from "../error-alert"

export default function PaymentForm({
  children,
  onSuccess,
  houseId,
}: {
  children: React.ReactNode
  onSuccess?: () => void
  houseId?: string
}) {
  const initialForm = {
    house_id: "",
    fee_category: "",
    fee_count: "",
  }
  const [form, setForm] = useState(initialForm)
  const [open, setOpen] = useState(false)
  const [maxMonths, setMaxMonths] = useState(0)
  const [houses, setHouses] = useState<House[]>([])
  const [categories, setCategories] = useState<FeeCategory[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch rumah (yang tidak kosong)
  useEffect(() => {
    api.get("/houses").then((res) => setHouses(res.data))
    api.get("/fee-categories").then((res) => setCategories(res.data))
    setForm(
      houseId == "" ? initialForm : { ...form, house_id: String(houseId) }
    )
  }, [open])

  useEffect(() => {
    if (form.house_id && form.fee_category) {
      api
        .get(`/fees/max-months/${form.house_id}/${form.fee_category}`, {
          params: { category_id: form.fee_category },
        })
        .then((res) => {
          setMaxMonths(res.data.max_months)
          setForm((prev) => ({
            ...prev,
            months: Math.min(
              parseInt(prev.fee_count),
              res.data.max_months || 0
            ),
          }))
        })
    }
  }, [form.house_id, form.fee_category])

  const handleHouseChange = (value: string) => {
    setForm({ ...form, house_id: value })
  }

  const handleFeeCategoryChange = (value: string) => {
    setForm({ ...form, fee_category: value })
  }

  const handleFeeCountChange = (value: string) => {
    setForm({ ...form, fee_count: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        house_id: parseInt(form.house_id),
        fee_category: parseInt(form.fee_category),
        fee_count: parseInt(form.fee_count),
      }

      await api.post("/fees", payload)

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
        <DialogContent className="md:max-w-[70vw] max-h-[80vh] w-fit ">
          <DialogHeader className="text-center items-center mb-3">
            <div className="text-2xl font-bold">Konfirmasi Pembayaran</div>
            <div className="flex w-full">
              {Object.keys(errors).length > 0 ? (
                <ErrorAlert>
                  {errors["house_id"] != undefined && (
                    <li>{errors["house_id"]}</li>
                  )}
                  {errors["fee_category"] != undefined && (
                    <li>{errors["fee_category"]}</li>
                  )}
                  {errors["fee_count"] != undefined && (
                    <li>{errors["fee_count"]}</li>
                  )}
                </ErrorAlert>
              ) : (
                <></>
              )}
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] ">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 w-full max-w-full">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label>Rumah</Label>
                  <Select
                    value={form.house_id}
                    onValueChange={handleHouseChange}
                    disabled={houseId == undefined ? false : true}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih rumah" />
                    </SelectTrigger>
                    <SelectContent>
                      {houses.map((h) => (
                        <SelectItem key={h.id} value={String(h.id)}>
                          {h.house_num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label>Jenis Iuran</Label>
                  <Select
                    value={form.fee_category}
                    onValueChange={handleFeeCategoryChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih iuran" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label>Jumlah Bulan</Label>
                  <Select
                    value={form.fee_count}
                    onValueChange={handleFeeCountChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih jumlah iuran" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: maxMonths }, (_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          {i + 1} bulan
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
