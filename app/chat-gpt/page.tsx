import ChatsList from "@/components/chart-list"

export async function generateMetadata({ params }: { params: any }) {
  return {
    title:
      "Explore Captivating Conversations with GPT: 🤖🗣️ Unveiling the Power of AI 🚀✨",
    description:
      "Explore Captivating Conversations with GPT: 🤖🗣️ Unveiling the Power of AI 🚀✨",
  }
}

async function getData(page: string | number) {
  const res = await fetch(`${process.env.BASE_URL}/api/chat-gpt?page=${page}`, {
    cache: "no-store",
  })

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

interface IsearchParams {
  searchParams: { page: number | string }
}
const page = async ({ searchParams }: IsearchParams) => {
  let currentPage = 1

  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page)
  }

  let { chats, chatCount } = await getData(currentPage)

  let totalPages = Math.ceil(chatCount / 12)

  return (
    <>
      <h1 className="mt-5 text-center text-4xl font-extrabold leading-[1.15]">
        <span className="blue_gradient">
          Explore Captivating Conversations with GPT:
        </span>
        <span>🤖🗣️</span> <br className="max-md:hidden" />
        <span className="blue_gradient">Unveiling the Power of AI</span>
        <span>🚀✨</span>
      </h1>

      <section className="feed">
        <ChatsList chats={chats} />
      </section>
    </>
  )
}

export default page
