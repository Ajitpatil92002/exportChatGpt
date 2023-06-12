import Nav from "@/components/Nav";
import "../styles/globals.css";
import hljs from "highlight.js";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Discover , Share & Export CHAT-GPT",
  description: "Discover , Share & Export CHAT-GPT",
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
