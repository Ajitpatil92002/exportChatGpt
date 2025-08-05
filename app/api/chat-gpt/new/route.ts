import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { CreateChat, checkChat } from "@/lib/quires"
import { scrapeChats } from "@/lib/server-utils"

export const POST = async (req: Request, res: Response) => {
  const session = await getServerSession(authOptions)

  let userId = session?.user ? session.user.id : null

  const { chatgptUrl } = await req.json()
  try {
    let isChatExits = await checkChat(chatgptUrl)

    if (!isChatExits) {
      let { title, Chats } = await scrapeChats(chatgptUrl)

      const createdChat = await CreateChat({
        title,
        chatgptUrl,
        Chats,
        userId,
      })
      return new Response(JSON.stringify(createdChat), { status: 201 })
    }

    return new Response(JSON.stringify(isChatExits), { status: 201 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to create a new chat", { status: 500 })
  }
}
