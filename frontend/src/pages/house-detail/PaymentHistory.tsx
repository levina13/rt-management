import Layout from "@/components/Layout"
import PaymentForm from "@/components/forms/payment-form"
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

export default function PaymentHistory() {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center flex items-center text-3xl font-bold">
            <p>History Pembayaran Rumah ...</p>
          </div>
          <div className="mt-5 flex flex-row-reverse">
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
              <TableCaption>Daftar pembayaran rumah ...</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">No.</TableHead>
                  <TableHead>Penghuni</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Jenis Iuran </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Pembayaran</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Arjuna</TableCell>
                  <TableCell>Januari 2025</TableCell>
                  <TableCell className="">Iuran Kebersihan</TableCell>
                  <TableCell>
                    <Badge>Lunas</Badge>
                    {/* <Badge variant={"destructive"}>Belum Bayar</Badge> */}
                  </TableCell>
                  <TableCell>20 Oktober 2025</TableCell>
                  <TableCell className="">
                    <div className="flex justify-center gap-2">
                      <Button variant={"secondary"}>
                        <MessageCircleMore /> Chat
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  )
}
