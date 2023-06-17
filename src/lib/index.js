import jsPDF from "jspdf";
import JSZip from "jszip";
import toast from "react-hot-toast";
import TurndownService from "turndown";

export function countOccurenceOfWords(str) {
  // Words to ignore (prepositions and conjunctions)
  const ignoredWords = [
    "a",
    "about",
    "above",
    "across",
    "after",
    "against",
    "along",
    "among",
    "around",
    "as",
    "at",
    "before",
    "behind",
    "below",
    "beneath",
    "beside",
    "between",
    "beyond",
    "by",
    "despite",
    "down",
    "during",
    "except",
    "for",
    "from",
    "in",
    "is",
    "p",
    "inside",
    "we",
    "into",
    "like",
    "near",
    "of",
    "off",
    "on",
    "onto",
    "out",
    "outside",
    "our",
    "over",
    "past",
    "regarding",
    "round",
    "through",
    "throughout",
    "to",
    "toward",
    "under",
    "the",
    "underneath",
    "until",
    "unto",
    "up",
    "upon",
    "with",
    "within",
    "without",
    "and",
    "because",
    "but",
    "if",
    "nor",
    "or",
    "since",
    "so",
    "that",
    "though",
    "unless",
    "when",
    "where",
    "while",
    "yet",
  ];

  // Convert the string to lowercase and split into words
  const words = str.toLowerCase().match(/\b\w+\b/g) || [];

  // Count the occurrences of each word
  const wordCount = {};
  for (let word of words) {
    // Skip ignored words
    if (ignoredWords.includes(word)) {
      continue;
    }
    // Increment word count
    wordCount[word] = (wordCount[word] || 0) + 1;
  }

  // Convert wordCount object to an array of objects
  const result = Object.keys(wordCount).map((word) => ({
    word,
    occurrences: wordCount[word],
  }));

  return result;
}

export function convertArrayTostring(arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    const ques = arr[i].text;
    const ans = arr[i].answer.text;
    str = str + ques + ans;
  }
  return str;
}

export function printContent() {
  // Clone the content element
  const contentClone = document.getElementById("content");

  // Hide unwanted elements
  const elementsToHide = contentClone.querySelectorAll(".no-print");
  elementsToHide.forEach((element) => {
    element.style.display = "none";
  });

  // Create a new iframe
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";

  // Append the iframe to the document body
  document.body.appendChild(iframe);

  // Get the document of the iframe
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  // Write the printable content to the iframe document
  iframeDoc.write(
    "<html><head></head><body>" + contentClone.outerHTML + "</body></html>"
  );
  iframeDoc.close();

  // Copy parent document styles to the iframe document
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((stylesheet) => {
    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = stylesheet.href;
    iframeDoc.head.appendChild(newLink);
  });

  // Call the print method on the iframe window
  iframe.contentWindow.print();

  // Remove the iframe from the document body
  document.body.removeChild(iframe);
  toast.success("Exporting to PDF File", { duration: 3000 });
}

export function downloadJSONFile(data, filename) {
  // Convert the JSON data to a string

  const jsonData = JSON.stringify(data);

  // Create a blob from the JSON string
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Append the link to the document body
  document.body.appendChild(link);

  // Trigger the click event of the link to start the download
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);

  // Release the URL object
  URL.revokeObjectURL(url);
}

export function downloadHTML(filename) {
  // Get the HTML content of the current page
  const htmlContent = document.documentElement.outerHTML;

  // Create a blob from the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Append the link to the document body
  document.body.appendChild(link);

  // Trigger the click event of the link to start the download
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);

  // Release the URL object
  URL.revokeObjectURL(url);
}

export const generatePdf = async (data, chatTitle) => {
  const doc = new jsPDF();

  // Set initial y position for the content
  let y = 20;

  // Set font size and type for the title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  // Add title
  const title = `${chatTitle}`;
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
    doc.text("Human Question", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    const questionLines = doc.splitTextToSize(item.question, 170);
    doc.text(questionLines, 20, y);
    y += questionLines.length * 7 + 5;

    // Add answer
    doc.text(`Ai Answer`, 20, y);
    y += 10;
    const answerLines = doc.splitTextToSize(item.answer, 170);
    doc.text(answerLines, 20, y);
    y += answerLines.length * 7 + 10;

    doc.addPage();
    y = 20;
  });

  // Save or download the PDF
  doc.save("output.pdf");
};

export function isMatchingURLPattern(url) {
  const regex = /^https:\/\/chat\.openai\.com\/share\/[a-zA-Z0-9-]+$/;
  return regex.test(url);
}

export const convertHtmlToImagesAndDownloadZip = async (
  htmlElements,
  zipFileName
) => {
  const zip = new JSZip();

  // Calculate the total number of conversions
  const totalConversions = htmlElements.length;
  let completedConversions = 0;

  // Convert each HTML element to images
  const promises = Array.from(htmlElements).map(async (htmlElement, index) => {
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
  });

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
  });
};

export const convertHtmlToMdAndDownload = async (htmlContent, fileName) => {
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

export async function createChatApi(url) {
  try {
    const response = await fetch("/api/chat-gpt/new", {
      method: "POST",
      body: JSON.stringify({
        chatGptUrl: url,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(`chat created`);
      return data;
    }
  } catch (error) {
    return false;
  }
}
