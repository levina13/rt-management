"use client"
import { type ColumnDef } from "@tanstack/react-table"
import {
  type ExpenseTable,
  type FeeTable,
  type HouseTable,
  type PaymentHistoryTable,
  type ResidentHistoryTable,
  type ResidentTable,
  type Transaction,
} from "./type"
import { convertYyyyMmToMonthYear, rupiah } from "./utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  Edit,
  MessageCircleMoreIcon,
  User,
  Wallet,
} from "lucide-react"
import { ImageModal } from "@/components/image-modal"
import ResidentForm from "@/components/forms/resident-form"
import HouseForm from "@/components/forms/house-form"
import ContractForm from "@/components/forms/contract-form"

export const TransactionColumn: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Nama</div>,
    cell: ({ row }) => <div className="text-wrap">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "date",
    header: "Tanggal",
  },
  {
    accessorKey: "type",
    header: () => <div className="text-center">Jenis</div>,
    cell: ({ row }) => {
      const type = row.getValue("type")
      if (type == "Pemasukan") return <Badge>Pemasukan</Badge>
      return <Badge variant={"destructive"}>Pengeluaran</Badge>
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Nominal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {rupiah(row.getValue("amount"))}
      </div>
    ),
  },
]

export const FeeColumn: ColumnDef<FeeTable>[] = [
  {
    accessorKey: "house_num",
    header: "Nomor Rumah",
  },
  {
    accessorKey: "resident_name",
    header: "Penghuni",
    cell: ({ row }) => (
      <div className="flex justify-between">
        <div>{row.getValue("resident_name")}</div>
        <div>
          <Button variant={"outline"} asChild>
            <a
              href={`https://wa.me/62${row.getValue("resident_phone")}`}
              target="blank"
            >
              <MessageCircleMoreIcon />
            </a>
          </Button>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "fee_category",
    header: "Jenis Iuran",
  },
  {
    accessorKey: "periode",
    header: "Periode",
    cell: ({ row }) => {
      return convertYyyyMmToMonthYear(row.getValue("periode"))
    },
  },
  {
    accessorKey: "paid_at",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Tanggal Pembayaran
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export const ExpenseColumn: ColumnDef<ExpenseTable>[] = [
  {
    accessorKey: "desc",
    header: "Nama Pengeluaran",
    cell: ({ row }) => <div className="text-wrap">{row.getValue("desc")}</div>,
  },
  {
    accessorKey: "expense_category",
    header: "Kategori",
    cell: ({ row }) => <Badge>{row.getValue("expense_category")}</Badge>,
  },
  {
    accessorKey: "date",
    header: "tanggal",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Nominal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {rupiah(row.getValue("amount"))}
      </div>
    ),
  },
]

export const ResidentColumn: ColumnDef<ResidentTable>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div className="flex justify-between">
        <div>{row.getValue("name")}</div>
        <div>
          <Button variant={"outline"} asChild>
            <a
              href={`https://wa.me/62${String(row.getValue("phone")).substring(
                1
              )}`}
              target="blank"
            >
              <MessageCircleMoreIcon />
            </a>
          </Button>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "house_num",
    header: "Rumah",
  },
  {
    accessorKey: "phone",
    header: "Telepon",
  },
  {
    accessorKey: "is_married",
    header: "Pernikahan",
    cell: ({ row }) => {
      if (row.getValue("is_married")) return <Badge>Sudah Menikah</Badge>
      return <Badge variant={"destructive"}>Belum Menikah</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.getValue("status") == "Tidak Aktif")
        return <Badge variant={"destructive"}>Tidak Aktif</Badge>
      return <Badge>{row.getValue("status")}</Badge>
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Tanggal Mulai
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Tanggal Berakhir
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <ImageModal url={row.original.ktp} alt="KTP">
            <Button variant={"outline"}>KTP</Button>
          </ImageModal>
          <ResidentForm
            id={row.original.id}
            onSuccess={() => location.reload()}
          >
            <Button variant={"default"}>
              <Edit /> Edit
            </Button>
          </ResidentForm>
        </div>
      )
    },
  },
]

export const HouseColumn: ColumnDef<HouseTable>[] = [
  {
    accessorKey: "house_num",
    header: "No Rumah",
  },
  {
    accessorKey: "is_occupied",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.is_occupied) return <Badge>Dihuni</Badge>
      return <Badge variant={"destructive"}>Kosong</Badge>
    },
  },
  {
    accessorKey: "resident",
    header: "Penghuni Aktif",
    cell: ({ row }) => {
      if (row.original.is_occupied) {
        return (
          <div className="flex justify-between">
            <div className="">{row.original.resident} </div>
            <div>
              <Button variant={"outline"} asChild>
                <a
                  href={`https://wa.me/62${row.original.phone.substring(1)}`}
                  target="blank"
                >
                  <MessageCircleMoreIcon />
                </a>
              </Button>
            </div>
          </div>
        )
      }
      return "-"
    },
  },
  {
    header: "Status Iuran",
    cell: ({ row }) => {
      const satpam = row.original.fee_satpam ? (
        <Badge>Satpam (lunas)</Badge>
      ) : (
        <Badge variant={"destructive"}>Satpam (belum bayar)</Badge>
      )
      const kebersihan = row.original.fee_kebersihan ? (
        <Badge>Kebersihan (lunas)</Badge>
      ) : (
        <Badge variant={"destructive"}>Kebersihan (belum bayar)</Badge>
      )

      return <div className="flex flex-col gap-2">{[satpam, kebersihan]}</div>
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const edit = (
        <HouseForm id={row.original.id} onSuccess={() => location.reload()}>
          <Button variant={"default"}>
            <Edit /> Edit
          </Button>
        </HouseForm>
      )
      const resident_history = (
        <Button variant={"outline"} asChild>
          <a href={`/house-management/${row.original.id}/resident-history`}>
            <User /> History Penghuni
          </a>
        </Button>
      )
      const payment_history = (
        <Button variant={"default"}>
          <Wallet />
          <a href={`/house-management/${row.original.id}/payment-history`}>
            History Pembayaran
          </a>
        </Button>
      )
      return (
        <div className="flex justify-center gap-2">
          {[edit, resident_history, payment_history]}
        </div>
      )
    },
  },
]

export const ResidentHistoryColumn: ColumnDef<ResidentHistoryTable>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div className="flex justify-between">
        <div>{row.original.name}</div>
        <div>
          <Button variant={"outline"} asChild>
            <a
              href={`https://wa.me/62${String(row.original.phone).substring(
                1
              )}`}
              target="blank"
            >
              <MessageCircleMoreIcon />
            </a>
          </Button>
        </div>
      </div>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) => {
      if (row.original.category == "permanen")
        return <Badge variant={"default"}>{row.original.category}</Badge>
      return <Badge variant={"outline"}>{row.original.category}</Badge>
    },
  },
  {
    accessorKey: "start_date",
    header: "Tanggal Mulai",
  },
  {
    accessorKey: "end_date",
    header: "Tanggal Berakhir",
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      ;<div className="flex justify-center gap-2">
        <ContractForm
          onSuccess={() => {
            location.reload()
          }}
          id={parseInt(row.original.contract_id)}
        >
          <Button variant={"default"}>
            <Edit /> Edit
          </Button>
        </ContractForm>
      </div>
    },
  },
]

export const PaymentHistoryColumn: ColumnDef<PaymentHistoryTable>[] = [
  {
    accessorKey: "resident_name",
    header: "Penghuni",
  },
  {
    accessorKey: "periode",
    header: "Periode",
    cell: ({ row }) => convertYyyyMmToMonthYear(row.original.periode),
  },
  {
    accessorKey: "fee_category",
    header: "Jenis Iuran",
  },
  {
    accessorKey: "paid_at",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Tanggal Pembayaran
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
