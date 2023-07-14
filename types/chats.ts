export interface IChat {
  id: string
  slug: string
  title: string
  chatgptUrl: string
  createdAt: string
  updatedAt: string
  questions: IQuestion[]
}

export interface IQuestion {
  id: string
  text: string
  chatId: string
  createdAt: string
  updatedAt: string
  answer: Ianswer
}

export interface Ianswer {
  id: string
  text: string
  questionId: string
  createdAt: string
  updatedAt: string
}
