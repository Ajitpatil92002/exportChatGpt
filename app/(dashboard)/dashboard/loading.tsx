import { DashboardHeader } from "@/components/header"
import { ChatItem } from "@/components/chat-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Chats" text="Create and manage Chats.">
        <div></div>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ChatItem.Skeleton />
        <ChatItem.Skeleton />
        <ChatItem.Skeleton />
        <ChatItem.Skeleton />
        <ChatItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
