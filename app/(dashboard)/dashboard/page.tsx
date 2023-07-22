import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ChatItem } from "@/components/chat-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const Chats = await db.chat.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      slug:true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Chats" text="Create and manage Chats.">
       <div></div>
      </DashboardHeader>
      <div>
        {Chats?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {Chats.map((chat) => (
              <ChatItem key={chat.id} Chat={chat} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>No Chats created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any Chats yet. Start creating content.
            </EmptyPlaceholder.Description>
            
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
