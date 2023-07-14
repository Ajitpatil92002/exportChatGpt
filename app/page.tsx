import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { AddChatForm } from "@/components/add-chart-form"
import ChatsList from "@/components/chart-list"

async function getData(page: number | string) {
  const res = await fetch(`${process.env.BASE_URL}/api/chat-gpt?page=${page}`, {
    cache: "no-store",
  })

  // Recommendation: handle errors
  if (!res.ok) {
    console.log(res)
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

interface IsearchParams {
  searchParams: { page: number | string }
}

export default async function IndexPage({ searchParams }: IsearchParams) {
  let currentPage = 1

  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page)
  }

  let { chats, chatCount } = await getData(currentPage)

  let totalPages = Math.ceil(chatCount / 12)

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex-center w-full flex-col">
          <h1 className="head_text text-center">
            Discover, share &
            <br className="max-md:hidden" />
            <span className="orange_gradient">Export your GPT-CHAT</span>
          </h1>
          <p className="desc text-center">
            Export_Chat_GPT is a tool for modern world to discover, share and
            export ChatGPT conversations into a variety of formats.
          </p>
        </div>

        <div className="flex-center gap-4">
          <Link href={"/explore"} className={buttonVariants()}>
            Explore ChatGPT Conversations
          </Link>
          <Link
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
        </div>
      </section>
      <section className="feed">
        <AddChatForm />
        <ChatsList chats={chats} />
      </section>
    </>
  )
}
