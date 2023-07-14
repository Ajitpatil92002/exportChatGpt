import Image from "next/image"
import { Answer, Question } from "@prisma/client"
import parse from "html-react-parser"

const Card = ({
  question,
  answer,
}: {
  question: string
  answer: Answer | null
}) => {
  return (
    <div className="prompt_card">
      <div className="wrapper flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
        <Image
          src={"/assets/icons/working.png"}
          alt="user_image"
          width={40}
          height={40}
          className="h-full rounded-full  object-contain"
        />
        <div className="content my-3 ml-5 self-end md:ml-0 md:self-start">
          <h3 className="font-satoshi text-xl font-semibold">
            {question.charAt(0).toLocaleUpperCase() + question.slice(1)}
          </h3>
        </div>
      </div>

      <div className="wrapper mt-8 flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
        <Image
          src={"/assets/icons/icons8-bot-48.png"}
          alt="user_image"
          width={40}
          height={40}
          className="self-start rounded-full  object-contain"
        />
        <div className="answer content my-3 ml-5 self-end md:ml-0 md:self-start">
          {answer && parse(answer.text)}
        </div>
      </div>
    </div>
  )
}

export default Card
