import { Answer, Question } from "@prisma/client"

import { getChatGpt } from "@/lib/quires"
import Badge from "@/components/Badge"
import CardList from "@/components/CardList"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const chats = await getChatGpt(params.slug)

  if (chats) {
    return {
      title: chats.title,
      description: chats.title,
    }
  }
}

type QuestionWithAnswer = {
  answer: Answer | null
} & Question

type PrismaQuestions = QuestionWithAnswer[]

const page = async ({ params }: { params: { slug: string } }) => {
  const chats = await getChatGpt(params.slug)

  function countWords(arr: PrismaQuestions) {
    let tcount = 0
    for (let i = 0; i < arr.length; i++) {
      let qusAns = arr[i]
      let qwordCount = qusAns.text.split(" ").length
      let awordCount = 0
      if (qusAns.answer) {
        awordCount = qusAns.answer.text.split(" ").length
      }
      tcount = tcount + qwordCount + awordCount
    }

    return tcount
  }

  if (chats)
    return (
      <>
        <section className="w-full">
          <h1 id="chatTitle" className="head_text text-center">
            <span className="blue_gradient">{chats.title}</span>
          </h1>

          <div className="no-print mt-10 flex flex-wrap items-center justify-center space-x-2 space-y-1">
            <Badge str={`Total ${chats.questions.length} Prompts`} />
            <Badge
              str={`Total ${countWords(chats.questions)} Words Generated`}
            />
          </div>

          {
            <CardList
              chatgptUrl={chats.chatgptUrl}
              title={chats.title}
              ChatsWithGPT={chats.questions}
            />
          }
        </section>
      </>
    )
}

export default page
