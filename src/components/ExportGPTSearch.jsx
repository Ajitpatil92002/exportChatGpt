"use client";

import { createChatApi, isMatchingURLPattern } from "@/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ExportGPTSearch = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isMatchingURLPattern(url)) {
      let respdata = await createChatApi(url);
      if (respdata.slug) {
        router.push(`chat-gpt/${respdata.slug}`);
        setLoading(false);
        return;
      }
    }
    toast.error("please Enter a valid url");
    setLoading(false);
  };

  return (
    <>
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your ChatGPT URL"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          required
          className="search_input peer"
        />
      </form>
      {loading && (
        <div className="w-full flex-center">
          <Image
            src="assets/icons/loader.svg"
            width={50}
            height={50}
            alt="loader"
            className="object-contain"
          />
          <p>Please Wait Untill we analyse You Chat ....</p>
        </div>
      )}
    </>
  );
};

export default ExportGPTSearch;
