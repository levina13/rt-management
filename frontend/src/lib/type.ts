export type HouseTable = {
  id: number
  house_num: string
  is_occupied: boolean
  resident: string | null
  fee_satpam: boolean
  fee_kebersihan: boolean
  phone: string
}

export type ResidentTable = {
  id: number
  name: string
  house_num: string
  phone: string
  is_married: boolean
  status: string
  start_date: string
  end_date: string | null
  ktp: string
}

export type FeeHistoryTable = {
  id: number
  house_num: string
  resident_name: string
  resident_phone: string
  fee_category: string
  periode: string
  paid_at: string
}

export type ExpenseHistoryTable = {
  id: number
  expense_category: string
  desc: string
  date: string
  amount: number
}

export type ResidentHistoryTable = {
  name: number
  phone: number
  category: string
  start_date: string
  end_date: string
  contract_id: string
}

export type PaymentHistoryTable = {
  resident_name: string
  periode: string
  fee_category: string
  paid_at: string
}

export type House = {
  id: number
  house_num: string
}

export type Resident = {
  id: number
  name: string
}

export type ExpenseCategory = {
  id: number
  name: string
}

export type FeeCategory = {
  id: number
  name: string
  amount: number
}

export type ChartData = {
  month: number
  payment: number
  expense: number
  balance: number
}

export type Transaction = {
  name: string
  date: string
  type: "Pemasukan" | "Pengeluaran"
  amount: number
}

export type FeeTable = {
  house_num: string
  resident_name: string
  resident_phone: string
  fee_category: string
  periode: string
  paid_at: string
}

export type ExpenseTable = {
  expense_category: string
  desc: string
  date: string
  amount: number
}

export type Search = {
  label: string
  value: string
}
