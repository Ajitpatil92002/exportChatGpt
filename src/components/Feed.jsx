"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Feed = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.length > 0) {
      router.push(`chat-gpt?url=${url}`);
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Export your GPT-CHAT"
          value={url}
          onChange={(e) => { setUrl(e.target.value)}}
          required
          className="search_input peer"
        />
        {/* <button type="submit" className="mx-4 black_btn">
          Submit
        </button> */}
      </form>
    </section>
  );
};

export default Feed;
