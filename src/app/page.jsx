import ChatsList from "@/components/ChatsList";
import ExportGPTSearch from "@/components/ExportGPTSearch";
import { Pagination } from "@/components/Pagination";

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

export default async function Home({ searchParams }) {
  let currentPage = 1;

  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page);
  }

  let {chats, chatCount} = await getData(currentPage);


  let totalPages = Math.ceil(chatCount/12);

  return (
    <>
      <sections className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover, share &
          <br className="max-md:hidden" />
          <span className="orange_gradient">Export your GPT-CHAT</span>
        </h1>
        <p className="desc text-center">
          Export_Chat_GPT is a tool for modern world to discover, share and
          export your GPT-CHAT
        </p>

        {/* Feed */}
        <section className="feed">
          <ExportGPTSearch />
          <ChatsList chats={chats} />
        </section>
        <Pagination page={currentPage} pageCount={totalPages} />
      </sections>
    </>
  );
}
