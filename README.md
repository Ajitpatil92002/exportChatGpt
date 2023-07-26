# Export Chat-GPT

An application built using the new router, server components and everything new in Next.js 13.

## About this project

ExportChatGPT is the ultimate conversation export solution that allows you to effortlessly convert your ChatGPT dialogues into PDF, images, zip files, JSON, MD, HTML. Preserve, analyze, and share your conversations in the most suitable way for your needs. Start exporting your chats with ExportChatGPT today.

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Route handlers
- Metadata files
- Server and Client Components
- API Routes and Middlewares
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **MongoDB Atlas**
- UI Components built using **Radix UI**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [ ] Add Star features to chats
- [ ] Update Chats with chatGPT Public url
- [ ] Select No. of Questions of chats to be export
- [ ] Add private gpt Chats Export and save
- [ ] Remove Issue : chats of each questions with answer should add to dynamically nextPage  of pdf if current page is full While Exporting it in PDF format

## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
npm run dev
```