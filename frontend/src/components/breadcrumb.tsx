import { useLocation } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"

const BREADCRUMB_LABELS: Record<string, string> = {
  "house-management": "Rumah",
  "resident-management": "Warga",
  "resident-history": "Riwayat Penghuni",
  "payment-history": "Riwayat Iuran",
}

export default function DynamicBreadcrumb() {
  const location = useLocation()
  const paths = location.pathname.split("/").filter((p) => p !== "")
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {paths.map((path, index) => {
          const fullPath = "/" + paths.slice(0, index + 1).join("/")
          const label = BREADCRUMB_LABELS[path] || path.replace(/-/g, " ")
          return (
            <div key={index} className="flex items-center gap-1">
              <BreadcrumbItem>
                <BreadcrumbLink href={fullPath}>{label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
