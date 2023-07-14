import { db } from "@/lib/db"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get("q")

  if (!q) return new Response("Invalid query", { status: 400 })

  const chats = await db.chat.findMany({
    where: {
      OR: [
        {
          questions: {
            some: {
              OR: [
                { text: { contains: q, mode: "insensitive" } },
                { answer: { text: { contains: q, mode: "insensitive" } } },
              ],
            },
          },
        },
      ],
    },
  })

  return new Response(JSON.stringify(chats))
}
