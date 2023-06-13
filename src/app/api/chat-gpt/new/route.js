import { getGptChat } from "@/utils";
import { CreateChat, checkChat } from "@/utils/Queries";

export const POST = async (req, res) => {
  const { chatGptUrl } = await req.json();
  try {
    let isChatExits = await checkChat(chatGptUrl);

    if (!isChatExits) {
      let { title, ChatsWithGPT } = await getGptChat(chatGptUrl);

      console.log("fetched data",title,chatGptUrl);
      
      let Chats = await CreateChat({
        title,
        chatgptUrl: chatGptUrl,
        ChatsWithGPT,
      });
      return new Response(JSON.stringify(Chats), { status: 201 });
    }

    return new Response(JSON.stringify(isChatExits), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new chat", { status: 500 });
  }
};
