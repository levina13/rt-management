import PaymentForm from "@/components/forms/payment-form"
import Layout from "@/components/Layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MessageCircleMore, PlusSquare } from "lucide-react"
import React from "react"

export default function Payment() {
  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Histori Iuran</p>
        </div>
        <div className="mt-5 flex flex-row-reverse flex-between">
          {/* <div></div> */}
          <div className="flex flex-row-reverse">
            <PaymentForm>
              <Button variant={"default"}>
                <PlusSquare /> Tambah Pembayaran
              </Button>
            </PaymentForm>
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>Daftar Iuran</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">No.</TableHead>
                <TableHead>Rumah</TableHead>
                <TableHead>Pembayar</TableHead>
                <TableHead>Jenis Iuran </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>A-02</TableCell>
                <TableCell>Arjuna5</TableCell>
                <TableCell className="">Iuran Kebersihan</TableCell>
                <TableCell>
                  <Badge>Lunas</Badge>
                  <Badge variant={"destructive"}>Belum Bayar</Badge>
                </TableCell>
                <TableCell>Oktober 2025</TableCell>
                <TableCell>20 Oktober 2025</TableCell>
                <TableCell className="">
                  <div className="flex justify-center gap-2">
                    <Button variant={"default"}>
                      <MessageCircleMore /> Chat
                    </Button>
                    <PaymentForm>
                      <Button variant={"outline"}>
                        <MessageCircleMore /> Konfirmasi Pembayaran
                      </Button>
                    </PaymentForm>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}
