import ChatsList from "@/components/ChatsList";
import ExportGPTSearch from "@/components/ExportGPTSearch";

export default function Home() {
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
          <ChatsList />
        </section>
      </sections>
    </>
  );
}
