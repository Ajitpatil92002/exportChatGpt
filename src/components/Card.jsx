import parse from "html-react-parser";
import Image from "next/image";

const Card = ({ question, answer }) => {
  return (
    <div className="prompt_card">
      <div className="wrapper md:flex justify-start md:items-center flex-col md:flex-row md:gap-5">
        <Image
          src={"/assets/icons/working.png"}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain h-full bg-gray-600"
        />
        <div className="content self-end md:self-start ml-5 my-3 md:ml-0">
          <h3 className="font-satoshi font-semibold text-gray-900 text-xl">
            {question.charAt(0).toLocaleUpperCase() + question.slice(1)}
          </h3>
        </div>
      </div>

      <div className="wrapper md:flex justify-start md:items-center flex-col md:flex-row md:gap-5 mt-8">
        <Image
          src={"/assets/icons/icons8-bot-48.png"}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain bg-gray-600 self-start"
        />
        <div className="content self-end md:self-start ml-5 my-3 md:ml-0">
          {parse(answer.text)}
        </div>
      </div>
    </div>
  );
};

export default Card;
