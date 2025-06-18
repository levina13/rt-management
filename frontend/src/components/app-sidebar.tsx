import { CreditCard, Home, LayoutDashboard, Users, Wallet } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Iuran",
    url: "/payment",
    icon: CreditCard,
  },
  {
    title: "Pengeluaran",
    url: "/expense",
    icon: Wallet,
  },
  {
    title: "Warga",
    url: "/resident-management",
    icon: Users,
  },
  {
    title: "Rumah",
    url: "/house-management",
    icon: Home,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-20 flex items-center text-3xl font-extrabold align-middle text-center">
        RT Management
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
