import { db } from "@/lib/db"

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get("page"))

  const PER_PAGE = 12

  const options = {
    take: PER_PAGE,
    skip: (page ? page - 1 : 0) * PER_PAGE,
  }

  try {
    const chats = await db.chat.findMany({
      ...options,
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    })

    const chatCount = await db.chat.count()

    await db.$disconnect()

    return new Response(JSON.stringify({ chats, chatCount }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch chats", {
      status: 500,
    })
  }
}
