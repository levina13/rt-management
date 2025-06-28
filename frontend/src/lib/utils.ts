import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const rupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number)
}

export function convertYyyyMmToMonthYear(yyyyMm: string) {
  const [year, month] = yyyyMm.split("-")
  // Create a Date object, setting the day to 1 to avoid issues with month lengths
  const date = new Date(parseInt(year), parseInt(month) - 1, 1)

  // Format the date to "Month Year" using toLocaleDateString
  // 'en-US' specifies the locale, and 'long' for the month name
  return date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  })
}
