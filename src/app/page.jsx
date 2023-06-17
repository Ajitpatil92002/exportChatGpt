import ChatsList from "@/components/ChatsList";
import ExportGPTSearch from "@/components/ExportGPTSearch";
import Loading from "@/components/Loading";
import { Pagination } from "@/components/Pagination";
import { Suspense } from "react";

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

const ExportChatGPTVideo = () => {
  return (
    <div id="tutorial" className="mt-10 flex items-center flex-col">
      <span className="text-xl font-semibold text-center mb-4">
        Exporting Chat GPT Tutorial
      </span>
      <iframe
        src="https://drive.google.com/file/d/15pYECG-hkQItxQ5laZgh83riWsehTLf3/preview"
        title="Export Chat GPT Tutorial"
        className="w-[400px] h-[240px] md:w-[600px] md:h-[300px]"
      ></iframe>
    </div>
  );
};

export default async function Home({ searchParams }) {
  let currentPage = 1;

  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page);
  }

  let { chats, chatCount } = await getData(currentPage);

  let totalPages = Math.ceil(chatCount / 12);

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
          export ChatGPT conversations into a variety of formats. <br /> Whether
          you need a PDF, images, JSON, MD, HTML, or even audio , we've got you
          covered.
        </p>

        {/* Feed */}
        <section className="feed">
          <Suspense fallback={<Loading />}>
            <ExportGPTSearch />
            <ExportChatGPTVideo />
          </Suspense>

          <ChatsList chats={chats} />
        </section>
        <Pagination page={currentPage} pageCount={totalPages} />
      </sections>
    </>
  );
}
