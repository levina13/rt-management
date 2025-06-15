import ContractForm from "@/components/forms/contract-form"
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
import { Edit, MessageCircleMore, PlusSquare } from "lucide-react"

export default function ResidentHistory() {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center flex items-center text-3xl font-bold">
            <p>History Penghuni Rumah ...</p>
          </div>
          <div className="mt-5 flex flex-row-reverse">
            <div className="flex flex-row-reverse">
              <ContractForm>
                <Button variant={"default"}>
                  <PlusSquare /> Tambah Penghuni
                </Button>
              </ContractForm>
            </div>
          </div>
          <div>
            <Table>
              <TableCaption>Daftar penghuni rumah ...</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">No.</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Status </TableHead>
                  <TableHead>Tanggal Mulai</TableHead>
                  <TableHead>Tanggal Berakhir</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Arjuna</TableCell>
                  <TableCell className="">
                    <div className="flex flex-col">
                      <Badge>Kontrak</Badge>
                      <Badge variant={"secondary"}>Tetap</Badge>
                      <Badge variant={"destructive"}>Tidak Aktif</Badge>
                    </div>
                  </TableCell>
                  <TableCell>20 Oktober 2020</TableCell>
                  <TableCell>20 Oktober 2025</TableCell>
                  <TableCell className="">
                    <div className="flex justify-center gap-2">
                      <ContractForm>
                        <Button variant={"default"}>
                          <Edit /> Edit
                        </Button>
                      </ContractForm>
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
