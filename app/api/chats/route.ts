import { db } from "@/lib/db"

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)

  try {
    const chats = await db.chat.findMany({
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    })

    await db.$disconnect()

    return new Response(JSON.stringify(chats), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch chats", {
      status: 500,
    })
  }
}
