import { IChat } from "@/types/chats"

interface IChatsLists {
  chats: IChat[]
}

export default async function sitemap() {
  const res = await fetch(`${process.env.BASE_URL}/api/chats`, {
    cache: "no-store",
  })

  let data = await res.json()

  const chats = data.map((chat:IChat) => ({
    url: `${process.env.BASE_URL}/chat-gpt/${chat.slug}`,
    lastModified: chat.updatedAt,
  }))

  const routes = ["", "chat-gpt"].map((route) => ({
    url: `${process.env.BASE_URL}/${route}`,
    lastModified: new Date().toISOString(),
  }))
  return [...routes, ...chats]
}
