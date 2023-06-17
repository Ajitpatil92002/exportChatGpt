import Badge from "@/components/Badge";
import CardList from "@/components/CardList";
import { getChatGpt } from "@/utils/Queries";

export async function generateMetadata({ params }) {
  const chats = await getChatGpt(params.slug);

  return {
    title: chats.title,
    description: chats.title,
  };
}

const page = async ({ params }) => {
  const chats = await getChatGpt(params.slug);

  function countWords(arr) {
    let tcount = 0;
    for (let i = 0; i < arr.length; i++) {
      let qusAns = arr[i];
      let qwordCount = qusAns.text.split(" ").length;
      let awordCount = qusAns.answer.text.split(" ").length;
      tcount = tcount + qwordCount + awordCount;
    }

    return tcount;
  }

  return (
    <>
      <section className="w-full">
        <h1 id="chatTitle" className="head_text text-center">
          <span className="blue_gradient">{chats.title}</span>
        </h1>

        <div className="no-print mt-10 flex justify-center items-center space-x-2 flex-wrap space-y-1">
          <Badge str={`Total ${chats.questions.length} Prompts`} />
          <Badge str={`Total ${countWords(chats.questions)} Words Generated`} />
        </div>

        {
          <CardList
            chatgptUrl={chats.chatgptUrl}
            title={chats.title}
            ChatsWithGPT={chats.questions}
          />
        }
      </section>
    </>
  );
};

export default page;
