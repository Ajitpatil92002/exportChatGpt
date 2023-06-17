import Nav from "@/components/Nav";
import "../styles/globals.css";
import hljs from "highlight.js";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Discover , Share & Export CHAT-GPT",
  description:
    "ExportChatGPT is the ultimate conversation export solution that allows you to effortlessly convert your ChatGPT dialogues into PDF, images, zip files, JSON, MD, HTML. Preserve, analyze, and share your conversations in the most suitable way for your needs. Start exporting your chats with ExportChatGPT today.",
  generator: "Discover , Share & Export CHAT-GPT",
  applicationName: "Discover , Share & Export CHAT-GPT",
  referrer: "origin-when-cross-origin",
  keywords: [
    "ChatGPT",
    "Conversational AI",
    "Chatbot",
    "Natural Language Processing",
    "Artificial Intelligence",
    "Text Generation",
    "ExportChatGPT",
    "Conversation Export",
    "Chat Export",
    "Export Conversations",
    "Dialogue Conversion",
    "Export Tool",
    "ExportGPTPDF",
    "Export to PDF",
    "Chat to PDF",
    "Conversation to PDF",
    "PDF Conversion",
    "Chat Export as PDF",
    "ExportGPTImages",
    "Export to Images",
    "Chat to Images",
    "Conversation to Images",
    "Image Conversion",
    "Chat Export as Images",
    "ExportGPTZip",
    "Export to Zip",
    "Chat to Zip",
    "Conversation to Zip",
    "Zip File Conversion",
    "Chat Export as Zip File",
    "ExportGPTJSON",
    "Export to JSON",
    "Chat to JSON",
    "Conversation to JSON",
    "JSON Conversion",
    "Chat Export as JSON",
    "ExportGPTMD",
    "Export to MD",
    "Chat to MD",
    "Conversation to MD",
    "Markdown Conversion",
    "Chat Export as Markdown",
    "ExportGPTHTML",
    "Export to HTML",
    "Chat to HTML",
    "Conversation to HTML",
    "HTML Conversion",
    "Chat Export as HTML",
    "ExportGPTAudio",
    "Export to Audio",
    "Chat to Audio",
    "Conversation to Audio",
    "Audio Conversion",
    "Chat Export as Audio",
    "Conversation Preservation",
    "Conversation Analysis",
    "Conversation Sharing",
    "Dialogue Export",
    "Export Format Options",
  ],
  authors: [
    {
      name: "Ajit Patil",
      url: `patilajit.com`,
    },
  ],
  themeColor: "#ffffff",
  colorScheme: "light",
  creator: "Ajit Patil",
  publisher: "Ajit Patil",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "Discover , Share & Export CHAT-GPT",
    description:
      "ExportChatGPT is the ultimate conversation export solution that allows you to effortlessly convert your ChatGPT dialogues into PDF, images, zip files, JSON, MD, HTML. Preserve, analyze, and share your conversations in the most suitable way for your needs. Start exporting your chats with ExportChatGPT today.",
    url: `${process.env.BASE_URL}`,
    siteName: "Discover , Share & Export CHAT-GPT",
    images: [
      {
        url: `${process.env.BASE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Discover , Share & Export CHAT-GPT",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@exportChatGpt",
    title: "Discover , Share & Export CHAT-GPT",
    description:
      "ExportChatGPT is the ultimate conversation export solution that allows you to effortlessly convert your ChatGPT dialogues into PDF, images, zip files, JSON, MD, HTML. Preserve, analyze, and share your conversations in the most suitable way for your needs. Start exporting your chats with ExportChatGPT today.",
    images: [
      {
        url: `${process.env.BASE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Discover , Share & Export CHAT-GPT",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "google-site-verification=0",
    bing: "msvalidate.01=0",
    yandex: "yandex-verification=0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
