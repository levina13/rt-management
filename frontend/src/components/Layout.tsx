import type React from "react"
import { SidebarProvider } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import Navbar from "./nav-bar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <SidebarProvider>
        <AppSidebar />
        <main className="mt-20">{children}</main>
      </SidebarProvider>
    </>
  )
}
