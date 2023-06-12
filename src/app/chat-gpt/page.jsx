import ChatsList from "@/components/ChatsList";
import React from "react";

export const metadata = {
  title:
    "Explore Captivating Conversations with GPT: 🤖🗣️ Unveiling the Power of AI 🚀✨",
  description:
    "Explore Captivating Conversations with GPT: 🤖🗣️ Unveiling the Power of AI 🚀✨",
};

const page = () => {
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
        <ChatsList />
      </section>
    </>
  );
};

export default page;
