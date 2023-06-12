import { string_to_slug } from ".";
import prisma from "./prismadb";

export async function CreateChat({ title, ChatsWithGPT, chatgptUrl }) {
  let Chats = ChatsWithGPT.map((value) => {
    return {
      text: value.question,
      answer: {
        create: {
          text: value.answer,
        },
      },
    };
  });

  let slug = string_to_slug(title);

  const chat = await prisma.chat.create({
    data: {
      questions: {
        create: [...Chats],
      },
      title,
      chatgptUrl,
      slug,
    },
    include: {
      questions: {
        include: {
          answer: true,
        },
      },
    },
  });
  await prisma.$disconnect();

  return chat;
}

export async function checkChat(chatgptUrl) {
  const ischatExit = await prisma.chat.findFirst({
    where: { chatgptUrl },
    include: {
      questions: {
        include: {
          answer: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  if (ischatExit) {
    return ischatExit;
  } else {
    return false;
  }
}

export async function getChatGpt(slug) {
  try {
    const ischatExit = await prisma.chat.findFirst({
      where: { slug },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    });

    await prisma.$disconnect();

    if (ischatExit) {
      return ischatExit;
    } else {
      return false;
    }
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Something gone Wrong");
  }
}

export async function getChats() {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    });
    await prisma.$disconnect();
    return chats;
  } catch (error) {
    await prisma.$disconnect();
    throw new Error("Something gone Wrong");
  }
}