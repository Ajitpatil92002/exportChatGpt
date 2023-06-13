import prisma from "../../../utils/prismadb";

export const GET = async (req) => {
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

    return new Response(JSON.stringify(chats), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch chats", {
      status: 500,
    });
  }
};
