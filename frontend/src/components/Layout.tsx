import type React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className="p-5 m-5" variant={"default"} />
          <main className=" container md:px-10">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
