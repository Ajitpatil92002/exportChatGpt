import toast from "react-hot-toast";

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
    const ques = arr[i].question;
    const ans = arr[i].answer;
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
