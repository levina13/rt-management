import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"

export default function DetailModel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex items-center">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center items-center mb-3">
          <div className="text-2xl font-bold">Detail Transaksi</div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="flex flex-col gap-2 w-full max-w-full">
            <div>Nama: Iuran Satpam </div>
            <div>
              Jenis: <Badge variant={"destructive"}>Keluar</Badge>{" "}
            </div>
            <div>Tanggal: 20 Januari 2025 </div>
            <div>Jumlah: Rp. 200.000 </div>
            {/* <div>Nomor Rumah: A-1 </div>
            <div>Nomor Rumah: A-1 </div> */}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
