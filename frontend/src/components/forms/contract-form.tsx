import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import DatePicker from "../date-picker"
import { Button } from "../ui/button"
import { api } from "@/lib/axios"
import { format } from "date-fns"
import { useParams } from "react-router-dom"

export default function ContractForm({
  children,
  onSuccess,
  id,
}: {
  children: React.ReactNode
  onSuccess?: () => void
  id?: number
}) {
  const isEditting = !!id

  const { houseId } = useParams<{ houseId: string }>()
  const [resident, setResident] = useState("1")
  const [category, setCategory] = useState("kontrak")
  const [startDate, setStartDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const [endDate, setEndDate] = useState<Date>()
  const [residentList, setResidentList] = useState([])
  const categoryList = ["kontrak", "permanen"]

  function fetchResident() {
    api
      .get("/residents")
      .then((res) => setResidentList(res.data))
      .catch((err) => console.error(err))
  }

  function handleResidentChange(value: string) {
    setResident(value)
  }

  function handleCategoryChange(value: string) {
    setCategory(value)
  }

  function emptyForm() {
    setResident("1")
    setCategory("kontrak")
    setStartDate(undefined)
  }

  useEffect(() => {
    fetchResident()
  }, [open])

  useEffect(() => {
    if (isEditting && open) {
      api.get(`/contracts/${id}`).then((res) => {
        const data = res.data
        setResident(String(data.resident_id))
        setCategory(data.contract_category)
        setStartDate(data.start_date as Date)
        setEndDate(data.end_date ? new Date(data.end_date) : undefined)
      })
    }
  }, [id, open])

  const handleSubmit = async () => {
    const payload = {
      resident_id: parseInt(resident),
      contract_category: category,
      start_date: format(startDate as Date, "yyyy-MM-dd"),
      end_date: endDate ? format(endDate as Date, "yyyy-MM-dd") : "",
      house_id: houseId,
    }
    try {
      if (isEditting) {
        await api.put(`/contracts/${id}`, payload)
      } else {
        await api.post(`/houses/${houseId}/residents`, payload)
      }
      onSuccess?.()
      setOpen(false)
      emptyForm()
    } catch (error) {
      console.error("Submit failed", error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-[30vw] max-h-[80vh]">
        <DialogHeader className="text-center items-center mb-3">
          <div className="text-2xl font-bold">Tambah Penghuni</div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 w-full max-w-full">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="penghuni">Penghuni</Label>
                <Select value={resident} onValueChange={handleResidentChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih penghuni" />
                  </SelectTrigger>
                  <SelectContent>
                    {residentList.map((r) => (
                      <SelectItem value={String(r["id"])}>
                        {r["name"]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="category">Jenis Penghuni</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Jenis Penghuni" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList.map((c) => (
                      <SelectItem value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="Date">Tanggal Mulai</Label>
                <DatePicker date={startDate} onChange={setStartDate} />
              </div>
              {category == "kontrak" ? (
                <>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="Date">Tanggal Akhir</Label>
                    <DatePicker date={endDate} onChange={setEndDate} />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full mt-5">
            Simpan
          </Button>
          <ScrollBar />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
