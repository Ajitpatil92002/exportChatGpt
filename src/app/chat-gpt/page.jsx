import ChatsList from "@/components/ChatsList";
import { Pagination } from "@/components/Pagination";

export async function generateMetadata({ params }) {
  return {
    title:
      "Explore Captivating Conversations with GPT: 🤖🗣️ Unveiling the Power of AI 🚀✨",
    description:
      "Explore Captivating Conversations with GPT: 🤖🗣️ Unveiling the Power of AI 🚀✨",
  };
}

async function getData(page) {
  const res = await fetch(`${process.env.BASE_URL}/api/chat-gpt?page=${page}`, {
    cache: "no-store",
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({ searchParams }) => {
  let currentPage = 1;

  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page);
  }

  let { chats, chatCount } = await getData(currentPage);

  let totalPages = Math.ceil(chatCount / 12);

  return (
    <>
      <h1 className="text-4xl text-center font-extrabold leading-[1.15]">
        <span className="blue_gradient">
          Explore Captivating Conversations with GPT:
        </span>
        <span>🤖🗣️</span> <br className="max-md:hidden" />
        <span className="blue_gradient">Unveiling the Power of AI</span>
        <span>🚀✨</span>
      </h1>

      <section className=" mx-auto w-full">
        <ChatsList chats={chats} />
      </section>
      <Pagination page={currentPage} pageCount={totalPages} />
    </>
  );
};

export default page;
