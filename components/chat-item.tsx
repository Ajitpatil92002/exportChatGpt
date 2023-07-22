import Link from "next/link"
import { Chat } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ChatOperations } from "@/components/chat-operations"

interface ChatItemProps {
  Chat: Pick<Chat, "id" | "title"| "slug"  | "createdAt">
}

export function ChatItem({ Chat }: ChatItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/chat-gpt/${Chat.slug}`}
          className="font-semibold hover:underline"
        >
          {Chat.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(Chat.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ChatOperations chat={{ id: Chat.id, title: Chat.title }} />
    </div>
  )
}

ChatItem.Skeleton = function ChatItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
