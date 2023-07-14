import { getGptChat } from "@/lib/server-utils";
import { CreateChat, checkChat } from "@/lib/quires"

export const POST = async (req:Request, res:Response) => {
  const { chatgptUrl } = await req.json();
  try {
    let isChatExits = await checkChat(chatgptUrl);

    if (!isChatExits) {
      let { title, Chats } = await getGptChat(chatgptUrl);
      
      const createdChat = await CreateChat({
        title,
        chatgptUrl,
        Chats,
      });
      return new Response(JSON.stringify(createdChat), { status: 201 });
    }

    return new Response(JSON.stringify(isChatExits), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new chat", { status: 500 });
  }
};
