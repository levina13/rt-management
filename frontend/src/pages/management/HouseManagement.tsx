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
import { api } from "@/lib/axios"
import {
  Edit,
  MessageCircleMoreIcon,
  PlusSquare,
  User,
  Wallet,
} from "lucide-react"
import { useEffect, useState } from "react"
import type { HouseTable } from "./type"

export default function HouseManagement() {
  const [houses, setHouses] = useState([])
  function fetchHouses() {
    api
      .get("/house-table")
      .then((res) => setHouses(res.data))
      .catch((err) => console.error(err))
  }
  useEffect(() => {
    fetchHouses()
  }, [])

  return (
    <Layout>
      <div className="container">
        <div className="text-center flex items-center text-3xl font-bold">
          <p>Manajemen Rumah</p>
        </div>
        <div className="mt-5 flex flex-row-reverse">
          <div className="flex flex-row-reverse">
            <HouseForm onSuccess={fetchHouses}>
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
              {houses.map((house: HouseTable, index) => (
                <TableRow key={house.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{house.house_num}</TableCell>
                  <TableCell>
                    {house.is_occupied ? (
                      <Badge>Dihuni</Badge>
                    ) : (
                      <Badge variant={"destructive"}>Tidak Dihuni</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {house.is_occupied ? (
                      <div className="flex justify-between">
                        <div className="">{house.resident} </div>
                        <div>
                          <Button variant={"outline"} asChild>
                            <a
                              href={`https://wa.me/62${house.phone.substring(
                                1
                              )}`}
                              target="blank"
                            >
                              <MessageCircleMoreIcon />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      {house.fee_satpam ? (
                        <Badge>Satpam (lunas)</Badge>
                      ) : (
                        <Badge variant={"destructive"}>
                          Satpam (belum bayar)
                        </Badge>
                      )}
                      {house.fee_kebersihan ? (
                        <Badge>Kebersihan (lunas)</Badge>
                      ) : (
                        <Badge variant={"destructive"}>
                          Keberishan (belum bayar)
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <HouseForm id={house.id} onSuccess={fetchHouses}>
                        <Button variant={"default"}>
                          <Edit /> Edit
                        </Button>
                      </HouseForm>
                      <Button variant={"outline"} asChild>
                        <a
                          href={`/house-management/${house.id}/resident-history`}
                        >
                          <User /> History Penghuni
                        </a>
                      </Button>
                      <Button variant={"default"}>
                        <Wallet />
                        <a
                          href={`/house-management/${house.id}/payment-history`}
                        >
                          History Pembayaran
                        </a>
                      </Button>
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
