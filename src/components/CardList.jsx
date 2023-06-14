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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CardList = ({ ChatsWithGPT, title, chatgptUrl }) => {
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

  const downloadPdf = async () => {
    const cards = Array.from(document.getElementsByClassName("prompt_card"));

    const pdf = new jsPDF("p", "mm", "a4");

    let imagesData = [];

    for (let i = 0; i < cards.length; i++) {
      const element = cards[i];
      const imageData = await html2canvas(element);
      imagesData.push(imageData);
    }

    for (let i = 0; i < imagesData.length; i++) {
      const imgData = imagesData[i];

      if (i !== 0) {
        pdf.addPage(); // Add a new page except for the first page
      }

      const aspectRatio = imgData.width / imgData.height;

      const maxWidth = 180; // Adjust as needed
      const maxHeight = 180 / aspectRatio; // Calculate the height based on the aspect ratio

      let width, height;
      if (imgData.width > maxWidth || imgData.height > maxHeight) {
        // Scale down the image proportionally to fit within the available space
        if (aspectRatio > 1) {
          width = maxWidth;
          height = width / aspectRatio;
        } else {
          height = maxHeight;
          width = height * aspectRatio;
        }
      } else {
        // Use the original image dimensions
        width = imgData.width;
        height = imgData.height;
      }

      const x = (pdf.internal.pageSize.getWidth() - width) / 2;
      const y = (pdf.internal.pageSize.getHeight() - height) / 2;

      pdf.addImage(imgData, "JPEG", x, y, width, height);
    }
    pdf.save("chat.pdf");
  };

  return (
    <>
      <div className="no-print mt-4 flex justify-center items-center space-x-2 flex-wrap space-y-1">
        <a className="black_btn" href={`${chatgptUrl}`} target="_blank">
          <span>Continue With this Chat</span>
        </a>

        <button onClick={downloadPdf} className="black_btn">
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
