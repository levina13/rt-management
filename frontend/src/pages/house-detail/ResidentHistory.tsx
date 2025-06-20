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
import { api } from "@/lib/axios"
import { Edit, MessageCircleMoreIcon, PlusSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ResidentHistory() {
  const { houseId } = useParams<{ houseId: string }>()
  const [residents, setResidents] = useState([])
  const [disabled, setDisabled] = useState(false)

  function fetchResidents() {
    api
      .get(`/houses/${houseId}/residents`)
      .then((res) => {
        setResidents(res.data.residents)
        setDisabled(res.data.current_contract === "permanen" ? true : false)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchResidents()
  }, [])

  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center flex items-center text-3xl font-bold">
            <p>History Penghuni Rumah ...</p>
          </div>
          <div className="mt-5 flex flex-row-reverse">
            <div className="flex flex-row-reverse">
              <ContractForm onSuccess={fetchResidents}>
                <Button variant={"default"} disabled={disabled}>
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
                {residents.map((resident, index) => (
                  <TableRow key={resident["id"]}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex justify-between">
                        <div>{resident["name"]}</div>
                        <div>
                          <Button variant={"outline"} asChild>
                            <a
                              href={`https://wa.me/62${String(
                                resident["phone"]
                              ).substring(1)}`}
                              target="blank"
                            >
                              <MessageCircleMoreIcon />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {resident["category"] == "permanen" ? (
                        <Badge variant={"default"}>
                          {resident["category"]}
                        </Badge>
                      ) : (
                        <Badge variant={"outline"}>
                          {resident["category"]}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{resident["start_date"]}</TableCell>
                    <TableCell>{resident["end_date"] ?? "-"}</TableCell>
                    <TableCell className="">
                      <div className="flex justify-center gap-2">
                        <ContractForm
                          onSuccess={fetchResidents}
                          id={resident["contract_id"]}
                        >
                          <Button variant={"default"}>
                            <Edit /> Edit
                          </Button>
                        </ContractForm>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  )
}
