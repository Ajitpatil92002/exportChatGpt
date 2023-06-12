import { getChats } from "@/utils/Queries";

export default async function sitemap() {
  const res = await getChats();

  const chats = res.map((chat) => ({
    url: `${process.env.BASE_URL}/chat-gpt/${chat.slug}`,
    lastModified: chat.updatedAt,
  }));

  const routes = ["", "/chat-gpt"].map((route) => ({
    url: `${process.env.BASE_URL}/${route}`,
    lastModified: new Date().toISOString(),
  }));
  return [...routes, ...chats];
}
