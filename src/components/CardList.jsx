"use client";

import {
  convertArrayTostring,
  convertHtmlToImagesAndDownloadZip,
  convertHtmlToMdAndDownload,
  countOccurenceOfWords,
  downloadHTML,
  downloadJSONFile,
  generatePdf,
} from "@/lib";
import Card from "./Card";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";

const CardList = ({ ChatsWithGPT, title, chatgptUrl }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleJsonFileDownload = () => {
    setLoading(true);
    let str = convertArrayTostring(ChatsWithGPT);
    let data = countOccurenceOfWords(str);
    let totalWordsGenarted = countWords(ChatsWithGPT);
    let totalPromts = ChatsWithGPT.length;
    downloadJSONFile(
      [
        ChatsWithGPT,
        { title },
        { type: "Analysed Text", totalPromts, totalWordsGenarted, data },
      ],
      "document"
    );
    setLoading(false);

    toast.success("Exporting to JSON File", { duration: 3000 });
  };

  const handledownloadHTML = () => {
    setLoading(true);
    downloadHTML("document");
    setLoading(false);

    toast.success("Exporting to HTML File", { duration: 3000 });
  };

  const handleDownloadPdf = async () => {
    setLoading(true);
    let htmlprompt_card = Array.from(
      document.getElementsByClassName("prompt_card")
    );
    let title = document.getElementById("chatTitle").innerText;
    console.log(title);

    let data = [];

    for (let i = 0; i < htmlprompt_card.length; i++) {
      const question = htmlprompt_card[i].querySelector("div").innerText;
      const answer = htmlprompt_card[i].querySelector(".answer").innerText;

      data.push({ question, answer });
    }

    await generatePdf(data, title);
    setLoading(false);

    toast.success("PDF is Downloaded");
  };

  const handleImgDownload = async () => {
    setLoading(true);
    let htmlElements = Array.from(
      document.getElementsByClassName("prompt_card")
    );
    await convertHtmlToImagesAndDownloadZip(htmlElements, "chat");
    toast.success("Images Downloaded");
    // Reset the loading state and progress
    setLoading(false);
    setProgress(0);
  };

  const handleMDFileDownload = async () => {
    setLoading(true);

    let htmlContent = document.getElementById("content");

    await convertHtmlToMdAndDownload(htmlContent, "chat.md");

    setLoading(false);
    toast.success("Mark down (.md) file downloaded !");
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-400 opacity-75 flex flex-col items-center justify-center">
          <Image
            src="/assets/icons/loader.svg"
            width={50}
            height={50}
            alt="loader"
            className="object-contain"
          />{" "}
          <h2 className="text-center text-black text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-1/3 text-center text-black">
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      )}
      <div className="no-print mt-4 flex justify-center items-center space-x-2 flex-wrap space-y-2">
        <button></button>
        <a className="black_btn" href={`${chatgptUrl}`} target="_blank">
          <span>Continue With this Chat</span>
        </a>
        <button onClick={handleDownloadPdf} className="black_btn">
          Export Chat GPT to PDF File
        </button>
        <button onClick={handleImgDownload} className="black_btn">
          Export Chat GPT to Image File
        </button>
        <button onClick={handleMDFileDownload} className="black_btn">
          Export Chat GPT to MarkDown (.md) File
        </button>
        <button onClick={handleJsonFileDownload} className="black_btn">
          Export Chat GPT to JSON File
        </button>
        <button onClick={handledownloadHTML} className="black_btn">
          Export Chat GPT to HTML File
        </button>
      </div>
      <div id="content" className="mt-5 prompt_layout">
        {ChatsWithGPT.map((post, i) => (
          <Card key={i} answer={post.answer} question={post.text} />
        ))}
        <div className="no-print flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div>
      </div>
    </>
  );
};

export default CardList;
