import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import type React from "react"

export function ErrorAlert({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start w-full">
      <Alert variant={"destructive"} className="w-full border-destructive">
        <AlertCircleIcon />
        <AlertTitle>Error!!</AlertTitle>
        <AlertDescription>
          <ul className="list-inside list-disc text-sm">{children}</ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
