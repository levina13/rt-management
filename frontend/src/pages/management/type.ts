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

export type House = {
  id: number
  house_num: string
}

export type Resident = {
  id: number
  name: string
}

export const FeeCategory = ["satpam", "kebersihan"]
