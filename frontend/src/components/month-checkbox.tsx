import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

type Props = {
  selectedMonths: string[]
  onChange: (months: string[]) => void
}

export function MonthCheckbox({ selectedMonths, onChange }: Props) {
  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      onChange(selectedMonths.filter((m) => m !== month))
    } else {
      onChange([...selectedMonths, month])
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {months.map((month) => (
        <div key={month} className="flex items-center space-x-2">
          <Checkbox
            id={month}
            checked={selectedMonths.includes(month)}
            onCheckedChange={() => toggleMonth(month)}
          />
          <Label htmlFor={month}>{month}</Label>
        </div>
      ))}
    </div>
  )
}
