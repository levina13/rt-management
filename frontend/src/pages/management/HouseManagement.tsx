import HouseForm from "@/components/forms/house-form"
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
import {
  Edit,
  MessageCircleMoreIcon,
  PlusSquare,
  User,
  Wallet,
} from "lucide-react"

export default function HouseManagement() {
  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Manajemen Rumah</p>
        </div>
        <div className="mt-5 flex flex-row-reverse">
          <div className="flex flex-row-reverse">
            <HouseForm>
              <Button variant={"default"}>
                <PlusSquare /> Tambah Rumah
              </Button>
            </HouseForm>
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>Daftar Rumah di RT..</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">No.</TableHead>
                <TableHead>No Rumah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Penghuni Aktif</TableHead>
                <TableHead>Status Iuran</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>A-2</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Badge>Dihuni</Badge>
                    <Badge variant={"destructive"}>Tidak Dihuni</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  Arjuna{" "}
                  <Button>
                    <MessageCircleMoreIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Badge>Satpam (lunas)</Badge>
                    <Badge variant={"destructive"}>Satpam (belum bayar)</Badge>
                    <Badge>Kebersihan (lunas)</Badge>
                    <Badge variant={"destructive"}>
                      Keberishan (belum bayar)
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex justify-center gap-2">
                    <HouseForm>
                      <Button variant={"default"}>
                        <Edit /> Edit
                      </Button>
                    </HouseForm>
                    <Button variant={"outline"} asChild>
                      <a href="/house-management/0/resident-history">
                        <User /> History Penghuni
                      </a>
                    </Button>
                    <Button variant={"default"}>
                      <Wallet />
                      <a href="/house-management/0/payment-history">
                        History Pembayaran
                      </a>
                    </Button>
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
