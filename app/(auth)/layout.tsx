import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser()

  if (user) {
    redirect("/")
  }

  return <div className="flex items-center justify-center">{children}</div>
}
