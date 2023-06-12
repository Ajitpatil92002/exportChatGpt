import Badge from "@/components/Badge";
import CardList from "@/components/CardList";
import { getGptChat ,countWords} from "@/utils";

const page = async ({ searchParams }) => {
  let { title, ChatsWithGPT } = await getGptChat(searchParams.url);

  return (
    <>
      <section className="w-full">
        <h1 className="head_text text-center">
          <span className="blue_gradient">{title}</span>
        </h1>

        <div className="no-print mt-10 flex justify-center items-center space-x-2 flex-wrap space-y-1">
          <Badge str={`Total ${ChatsWithGPT.length} Prompts`} />
          <Badge str={`Total ${countWords(ChatsWithGPT)} Words Generated`} />
        </div>

        {<CardList title={title} ChatsWithGPT={ChatsWithGPT} />}
      </section>
    </>
  );
};

export default page;
