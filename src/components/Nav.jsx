import Link from "next/link";

const Nav = () => {
  return (
    <nav className="no-print flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <p className="logo_text">Export CHAT GPT</p>
      </Link>

      <div className="flex">
        <div className="flex gap-3 md:gap-5">
          <Link href="/chat-gpt" className="black_btn">
            Discover
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
