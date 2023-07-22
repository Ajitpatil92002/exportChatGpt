import { db } from "@/lib/db"

import { string_to_slug } from "./server-utils"

interface ICreateChat {
  title: string
  Chats: { question: string; answer: string }[]
  chatgptUrl: string
  userId: string | null
}

export async function CreateChat({
  title,
  Chats,
  chatgptUrl,
  userId,
}: ICreateChat) {
  let ChatsWithSchemaMatched = Chats.map((value) => {
    return {
      text: value.question,
      answer: {
        create: {
          text: value.answer,
        },
      },
    }
  })

  let slug = string_to_slug(title)

  const chat = await db.chat.create({
    data: {
      questions: {
        create: [...ChatsWithSchemaMatched],
      },
      title,
      chatgptUrl,
      slug,
      userId,
    },
    include: {
      questions: {
        include: {
          answer: true,
        },
      },
    },
  })
  await db.$disconnect()

  return chat
}

export async function checkChat(chatgptUrl: string) {
  const ischatExit = await db.chat.findFirst({
    where: { chatgptUrl },
    include: {
      questions: {
        include: {
          answer: true,
        },
      },
    },
  })
  await db.$disconnect()
  if (ischatExit) {
    return ischatExit
  } else {
    return false
  }
}

export async function getChatGpt(slug: string) {
  try {
    const ischatExit = await db.chat.findFirst({
      where: { slug },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    })

    await db.$disconnect()

    if (ischatExit) {
      return ischatExit
    } else {
      return false
    }
  } catch (error) {
    await db.$disconnect()
    throw new Error("Something gone Wrong")
  }
}

export async function getChats({ page = 0 }) {
  const PER_PAGE = 2

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
    await db.$disconnect()
    return chats
  } catch (error) {
    await db.$disconnect()
    throw new Error("Something gone Wrong")
  }
}

export async function getTotalChatCount() {
  try {
    const chatCount = await db.chat.count()
    await db.$disconnect()
    return chatCount
  } catch (error) {
    await db.$disconnect()
    throw new Error("Something gone Wrong")
  }
}
