import { MessageSquare, Settings } from "lucide-react"

import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Chats",
      href: "/dashboard",
      icon: "MessageSquare",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "Settings",
    },
  ],
}
