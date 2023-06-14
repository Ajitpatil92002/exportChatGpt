"use client";

import {
  convertArrayTostring,
  countOccurenceOfWords,
  downloadHTML,
  downloadJSONFile,
} from "@/lib";
import Card from "./Card";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { useState } from "react";
import TurndownService from "turndown";

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

  const generatePdf = async (data) => {
    const doc = new jsPDF();

    // Set initial y position for the content
    let y = 20;

    // Set font size and type for the title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");

    // Add title
    const title = "Question and Answer Sheet";
    const titleWidth =
      (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const x = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, x, y);
    y += 15;

    // Reset font size and type for the content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Loop through the data array
    data.forEach((item, index) => {
      // Add question
      doc.setFont("helvetica", "bold");
      doc.text(`Question ${index + 1}:`, 20, y);
      y += 10;
      doc.setFont("helvetica", "normal");
      const questionLines = doc.splitTextToSize(item.question, 170);
      doc.text(questionLines, 20, y);
      y += questionLines.length * 7 + 5;

      // Add answer
      doc.text(`Answer ${index + 1}:`, 20, y);
      y += 10;
      const answerLines = doc.splitTextToSize(item.answer, 170);
      console.log(answerLines);
      doc.text(answerLines, 20, y);
      y += answerLines.length * 7 + 10;

      doc.addPage();
      y = 20;
    });

    // Save or download the PDF
    doc.save("output.pdf");
  };

  const handleDownloadPdf = async () => {
    setLoading(true);
    let htmlprompt_card = Array.from(
      document.getElementsByClassName("prompt_card")
    );

    let data = [];

    for (let i = 0; i < htmlprompt_card.length; i++) {
      const question = htmlprompt_card[i].querySelector("div").innerText;
      const answer = htmlprompt_card[i].querySelector(".answer").innerText;

      data.push({ question, answer });
    }

    await generatePdf(data);
    setLoading(false);

    toast.success("PDF is Downloaded");
  };

  const convertHtmlToImagesAndDownloadZip = async (
    htmlElements,
    zipFileName
  ) => {
    const zip = new JSZip();

    // Calculate the total number of conversions
    const totalConversions = htmlElements.length;
    let completedConversions = 0;

    // Convert each HTML element to images
    const promises = Array.from(htmlElements).map(
      async (htmlElement, index) => {
        const canvas = await html2canvas(htmlElement);
        const imageData = canvas.toDataURL("image/png");
        const fileName = `image${index + 1}.png`;

        // Add image data to the zip file
        zip.file(fileName, imageData.split("base64,")[1], { base64: true });

        // Update the progress
        completedConversions++;
        const progress = Math.round(
          (completedConversions / totalConversions) * 100
        );
        setProgress(progress);
      }
    );

    // Wait for all image conversions to complete
    await Promise.all(promises);

    // Generate the zip file
    zip.generateAsync({ type: "blob" }).then((blob) => {
      // Create a link element for the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = zipFileName;

      // Append the link to the document body and click it to initiate the download
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link and revoke the URL
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      // Reset the loading state and progress
      setLoading(false);
      setProgress(0);
    });
  };

  const handleImgDownload = async () => {
    setLoading(true);
    let htmlElements = Array.from(
      document.getElementsByClassName("prompt_card")
    );
    await convertHtmlToImagesAndDownloadZip(htmlElements, "chat");
    toast.success("Images Downloaded");
  };

  const convertHtmlToMdAndDownload = async (htmlContent, fileName) => {
    // Create a new instance of the Turndown service
    const turndownService = new TurndownService();

    // Convert HTML to Markdown
    const markdownContent = turndownService.turndown(htmlContent);

    // Create a Blob from the Markdown content
    const blob = new Blob([markdownContent], { type: "text/markdown" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element for the download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Append the link to the document body and click it to initiate the download
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-1/3 text-center text-white">
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
