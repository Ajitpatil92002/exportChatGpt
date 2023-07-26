import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"

import { UserAccountNav } from "./user-account-nav"

export async function SiteHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-40 w-full bg-background shadow-md backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ModeToggle />
            {user ? (
              <>
                <UserAccountNav
                className="space-x-2"
                  user={{
                    name: user?.name,
                    image: user?.image,
                    email: user?.email,
                  }}
                />
              </>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
