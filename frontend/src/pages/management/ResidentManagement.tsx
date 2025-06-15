import ResidentForm from "@/components/forms/resident-form"
import { ImageModal } from "@/components/image-modal"
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
import { Edit, PlusSquare } from "lucide-react"

export default function ResidentManagement() {
  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Manajemen Warga</p>
        </div>
        <div className="mt-5 flex flex-row-reverse">
          <div className="flex flex-row-reverse">
            <ResidentForm>
              <Button variant={"default"}>
                <PlusSquare /> Tambah Warga
              </Button>
            </ResidentForm>
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>Daftar warga RT.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">No.</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>No Rumah</TableHead>
                <TableHead>No Telepon</TableHead>
                <TableHead>Pernikahan</TableHead>
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
                <TableCell>A-2</TableCell>
                <TableCell>081273644829</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Badge>Sudah Menikah</Badge>
                    <Badge variant={"destructive"}>Belum Menikah</Badge>
                  </div>
                </TableCell>
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
                    <ImageModal url="..." alt="...">
                      <Button variant={"secondary"}>KTP</Button>
                    </ImageModal>
                    <ResidentForm>
                      <Button variant={"default"}>
                        <Edit /> Edit
                      </Button>
                    </ResidentForm>
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
