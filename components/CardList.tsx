"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Answer, Question } from "@prisma/client"
import toast from "react-hot-toast"

import {
  convertArrayTostring,
  convertHtmlToImagesAndDownloadZip,
  convertHtmlToMdAndDownload,
  countOccurenceOfWords,
  downloadHTML,
  downloadJSONFile,
  generatePdf,
} from "@/lib/client-utils"

import Card from "./Card"
import { Button, buttonVariants } from "./ui/button"

type QuestionWithAnswer = {
  answer: Answer | null
} & Question

type PrismaQuestions = QuestionWithAnswer[]

const CardList = ({
  ChatsWithGPT,
  title,
  chatgptUrl,
}: {
  ChatsWithGPT: PrismaQuestions
  title: string
  chatgptUrl: string
}) => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  function countWords(arr: PrismaQuestions) {
    let tcount = 0
    for (let i = 0; i < arr.length; i++) {
      let qusAns = arr[i]
      let qwordCount = qusAns.text.split(" ").length
      let awordCount = 0
      if (qusAns.answer) {
        awordCount = qusAns.answer.text.split(" ").length
      }
      tcount = tcount + qwordCount + awordCount
    }

    return tcount
  }

  const handleJsonFileDownload = () => {
    setLoading(true)
    let str = convertArrayTostring(ChatsWithGPT)
    let data = countOccurenceOfWords(str)
    let totalWordsGenarted = countWords(ChatsWithGPT)
    let totalPromts = ChatsWithGPT.length
    downloadJSONFile(
      [
        ChatsWithGPT,
        { title },
        { type: "Analysed Text", totalPromts, totalWordsGenarted, data },
      ],
      "document"
    )
    setLoading(false)

    toast.success("Exporting to JSON File", { duration: 3000 })
  }

  const handledownloadHTML = () => {
    setLoading(true)
    downloadHTML("document")
    setLoading(false)

    toast.success("Exporting to HTML File", { duration: 3000 })
  }

  const handleDownloadPdf = async () => {
    setLoading(true)
    let htmlprompt_card = Array.from(
      document.getElementsByClassName("prompt_card")
    )
    let title = document.getElementById("chatTitle")?.innerText
    console.log(title)

    let data = []

    for (let i = 0; i < htmlprompt_card.length; i++) {
      const question = htmlprompt_card[i].querySelector("div")?.innerText
      let answer = ""
      const firstElement: HTMLElement | undefined = htmlprompt_card[
        i
      ].querySelector(".answer") as HTMLElement | undefined

      if (firstElement) {
        answer = firstElement.innerText
        // Now you can use the 'innerText' property without TypeScript errors
      }
      data.push({ question, answer })
    }
    await generatePdf(data, title ? title : "")
    setLoading(false)

    toast.success("PDF is Downloaded")
  }

  const handleImgDownload = async () => {
    setLoading(true)
    let htmlElements = document.getElementsByClassName(
      "prompt_card"
    ) as HTMLCollectionOf<HTMLElement>
    await convertHtmlToImagesAndDownloadZip(htmlElements, "chat")
    toast.success("Images Downloaded")
    // Reset the loading state and progress
    setLoading(false)
    setProgress(0)
  }

  const handleMDFileDownload = async () => {
    setLoading(true)

    let htmlContent = document.getElementById("content") as HTMLHtmlElement

    if (htmlContent) {
      await convertHtmlToMdAndDownload(htmlContent, "chat.md")
    }

    setLoading(false)
    toast.success("Mark down (.md) file downloaded !")
  }

  return (
    <>
    
      {loading && (
        <div className=" fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-400 opacity-75">
          <Image
            src="/assets/icons/loader.svg"
            width={50}
            height={50}
            alt="loader"
            className="object-contain"
          />{" "}
          <h2 className="text-center text-xl font-semibold text-black">
            Loading...
          </h2>
          <p className="w-1/3 text-center text-black">
            This may take a few seconds, please don&apos;t close this page.
          </p>
        </div>
      )}
      <div className="no-print mt-4 flex flex-wrap items-center justify-center space-x-2 space-y-2">
        <button></button>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={`${chatgptUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>Continue With this Chat</span>
        </Link>
        <Button
          onClick={handleDownloadPdf}
          variant={"outline"}
        >
          Export Chat GPT to PDF File
        </Button>
        <Button
          onClick={handleImgDownload}
          variant={"outline"}
        >
          Export Chat GPT to Image File
        </Button>
        <Button
          onClick={handleMDFileDownload}
          variant={"outline"}
        >
          Export Chat GPT to MarkDown (.md) File
        </Button>
        <Button
          onClick={handleJsonFileDownload}
          variant={"outline"}
        >
          Export Chat GPT to JSON File
        </Button>
        <Button
          onClick={handledownloadHTML}
          variant={"outline"}
        >
          Export Chat GPT to HTML File
        </Button>
      </div>
      <div id="content" className="prompt_layout mt-5">
        {ChatsWithGPT.map((post, i) => (
          <Card key={i} answer={post.answer} question={post.text} />
        ))}
        <div className="no-print relative flex items-center justify-between rounded-t-md bg-black px-4 py-2 font-sans text-xs text-gray-200"></div>
      </div>
    </>
  )
}

export default CardList
