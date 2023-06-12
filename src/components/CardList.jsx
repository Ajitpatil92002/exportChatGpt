"use client";

import {
  convertArrayTostring,
  countOccurenceOfWords,
  downloadHTML,
  downloadJSONFile,
  printContent,
} from "@/lib";
import Card from "./Card";
import toast from "react-hot-toast";

const CardList = ({ ChatsWithGPT, title }) => {

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
    toast.success("Exporting to JSON File", { duration: 3000 });
  };

  const handledownloadHTML = () => {
    downloadHTML("document");
    toast.success("Exporting to HTML File", { duration: 3000 });
  };

  return (
    <>
      <div className="no-print mt-4 flex justify-center items-center space-x-2 flex-wrap space-y-1">
        <button onClick={printContent} className="black_btn">
          Export Chat GPT to PDF File
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
