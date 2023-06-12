import { getChats } from "@/utils/Queries";
import Image from "next/image";
import Link from "next/link";

const ChatsList = async () => {
  const chats = await getChats();

  const formatDate = (dateString) => {
    const date = new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date.toString();
  };

  return (
    <>
      <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {chats.map((chat) => (
          <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
            <div className="flex justify-between items-start gap-5">
              <Link href={`/chat-gpt/${chat.slug}`}>
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                  <Image
                    src={"/assets/icons/working.png"}
                    alt="user_image"
                    width={40}
                    height={40}
                    className="rounded-full object-contain bg-gray-600 self-start"
                  />

                  <div className="flex flex-col">
                    <h3 className="font-satoshi font-semibold text-gray-900">
                      {chat.title}
                    </h3>
                    <span className="font-inter text-sm text-gray-500">
                      {formatDate(chat.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <p className="my-4 font-satoshi text-base text-gray-700">
              {chat.questions[0].text.length >= 100
                ? chat.questions[0].text.slice(0, 100)+" ..."
                : chat.questions[0].text}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatsList;
