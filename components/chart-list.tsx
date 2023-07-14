import Image from "next/image"
import Link from "next/link"

import { IChat } from "@/types/chats"

interface IChatsListsProps {
  chats: IChat[]
}

const ChatsList = async ({ chats }: IChatsListsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    return date.toString()
  }

  return (
    <>
      <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="h-fit w-full flex-1 break-inside-avoid rounded-lg border bg-clip-padding p-6 pb-4 backdrop-blur-lg md:w-[360px]"
          >
            <div className="flex items-start justify-between gap-5">
              <Link href={`/chat-gpt/${chat.slug}`}>
                <div className="flex flex-1 cursor-pointer items-center justify-start gap-3">
                  <Image
                    src={"/assets/icons/working.png"}
                    alt="user_image"
                    width={40}
                    height={40}
                    className="self-start rounded-full bg-gray-600 object-contain"
                  />

                  <div className="flex flex-col">
                    <h3 className="font-semibold">{chat.title}</h3>
                    <span className="font-inter text-sm">
                      {formatDate(chat.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <p className="my-4 text-base">
              {chat.questions[0].text.length >= 100
                ? chat.questions[0].text.slice(0, 100) + " ..."
                : chat.questions[0].text}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ChatsList
