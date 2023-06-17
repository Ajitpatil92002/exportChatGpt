"use client";

import { createChatApi, isMatchingURLPattern } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ExportGPTSearch = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isMatchingURLPattern(url)) {
      let respdata = await createChatApi(url);
      if (respdata.slug) {
        setError(false);
        router.push(`chat-gpt/${respdata.slug}`);
        setLoading(false);
        return;
      }
    }
    router.push(`/#tutorial`);
    setError(true);
    toast.error("please Enter a valid url");
    setLoading(false);
  };

  return (
    <>
      <form className="relative w-full flex-center flex-col" onSubmit={handleSubmit}>
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
        {error && (
          <span className="text-sm p-4 text-red-800 font-semibold">
            If you are not getting how to export then watch
            <Link href={`/#tutorial`}> this Tutorial</Link>{" "}
          </span>
        )}
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
          <p>Please Wait Untill we analyse Your Chat ....</p>
        </div>
      )}
    </>
  );
};

export default ExportGPTSearch;
