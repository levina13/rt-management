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
import { api } from "@/lib/axios"
import { Edit, MessageCircleMoreIcon, PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import type { ResidentTable } from "./type"

export default function ResidentManagement() {
  const [residents, setResidents] = useState([])
  function fetchResident() {
    api
      .get("/resident-table")
      .then((res) => setResidents(res.data))
      .catch((err) => console.error(err))
  }
  useEffect(() => {
    fetchResident()
  }, [])
  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Manajemen Warga</p>
        </div>
        <div className="mt-5 flex flex-row-reverse">
          <div className="flex flex-row-reverse">
            <ResidentForm onSuccess={fetchResident}>
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
              {residents.map((resident: ResidentTable, index) => (
                <TableRow key={resident.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex justify-between">
                      <div>{resident.name}</div>
                      <div>
                        <Button variant={"outline"} asChild>
                          <a
                            href={`https://wa.me/62${resident.phone.substring(
                              1
                            )}`}
                            target="blank"
                          >
                            <MessageCircleMoreIcon />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{resident.house_num}</TableCell>
                  <TableCell>{resident.phone}</TableCell>
                  <TableCell>
                    {resident.is_married ? (
                      <Badge>Sudah Menikah</Badge>
                    ) : (
                      <Badge variant={"destructive"}>Belum Menikah</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {resident.status == "Tidak Aktif" ? (
                      <Badge variant={"destructive"}>Tidak Aktif</Badge>
                    ) : (
                      <Badge>{resident.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{resident?.start_date}</TableCell>
                  <TableCell>{resident?.end_date}</TableCell>
                  <TableCell className="">
                    <div className="flex justify-center gap-2">
                      <ImageModal url={resident.ktp} alt="KTP">
                        <Button variant={"outline"}>KTP</Button>
                      </ImageModal>
                      <ResidentForm id={resident.id} onSuccess={fetchResident}>
                        <Button variant={"default"}>
                          <Edit /> Edit
                        </Button>
                      </ResidentForm>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}
