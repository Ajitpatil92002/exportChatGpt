"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { createChatApi } from "@/lib/client-utils"

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

const formSchema = z.object({
  url: z
    .string()
    .refine(
      (value) =>
        /^https:\/\/chat\.openai\.com\/share\/[a-zA-Z0-9-]+$/.test(value),
      "please enter valid url"
    ),
})

export const AddChatForm = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const { data: session, status } = useSession()

  let userId = session ? session.user.id : null

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    let respdata = await createChatApi(values.url, userId)

    if (respdata.slug) {
      router.push(`chat-gpt/${respdata.slug}`)
      setLoading(false)
      return
    }

    toast.error("please enter valid url")
    setLoading(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex-center relative w-full flex-col"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Your ChatGPT URL"
                    className="w-full"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {loading && (
        <div className="flex-center w-full">
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
  )
}
