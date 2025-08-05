import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { CreateChat, checkChat } from "@/lib/quires"

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

async function scrapeChats(url: string) {
  // Dynamically import the right packages for Vercel or local
  const isVercel = !!process.env.VERCEL_ENV
  let puppeteer: any,
    launchOptions: any = { headless: true }

  if (isVercel) {
    const chromium = (await import("@sparticuz/chromium")).default
    puppeteer = await import("puppeteer-core")
    launchOptions = {
      ...launchOptions,
      args: chromium.args,
      executablePath: await chromium.executablePath(),
    }
  } else {
    puppeteer = await import("puppeteer")
    launchOptions = {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }
  }

  let browser: any
  try {
    browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    )
    await page.setJavaScriptEnabled(true)
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 })

    const title = await page.evaluate(() => document.title)

    if (title === "404: This page could not be found") {
      throw new Error("Not Found")
    }

    // Scraping logic (same as your Express code)
    const articles = await page.evaluate(() => {
      const parent = document.querySelector(
        '[class*="@thread-xl/thread:pt-header-height"]'
      )
      if (!parent) return []
      return Array.from(parent.querySelectorAll(":scope > article")).map(
        (article) => ({
          turn: article.getAttribute("data-turn"),
          text: article.textContent,
          html: article.innerHTML,
        })
      )
    })

    // Build Chats array: pair user (question, text) and next assistant (answer, html)
    const Chats = []
    for (let i = 0; i < articles.length - 1; i++) {
      if (articles[i].turn === "user" && articles[i + 1].turn === "assistant") {
        Chats.push({
          question: articles[i].text,
          answer: articles[i + 1].html,
        })
      }
    }

    await browser.close()
    return { title, Chats }
  } catch (err) {
    if (browser) await browser.close()
    throw err
  }
}
