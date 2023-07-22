"use client"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Chat, Prisma } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import debounce from "lodash.debounce"
import { MessageSquare } from "lucide-react"

import { IChat } from "@/types/chats"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const SearchBar: FC = () => {
  const [input, setInput] = useState<string>("")

  const pathname = usePathname()
  const commandRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useOnClickOutside(commandRef, () => {
    setInput("")
  })

  const request = debounce(async () => {
    refetch()
  }, 300)

  const debounceRequest = useCallback(() => {
    request()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Chat & {
        _count: Prisma.ChatCountOutputType
      })[]
    },
    queryKey: ["search-query"],
    enabled: false,
  })

  useEffect(() => {
    setInput("")
  }, [pathname])

  return (
    <Command
      ref={commandRef}
      className="relative z-50 mt-10 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text)
          debounceRequest()
        }}
        value={input}
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search GPT Chats..."
      />

      {input.length > 0 && (
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-popover  shadow">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="GPT Chats">
              {queryResults?.map((chat) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/chat-gpt/${chat.slug}`)
                    router.refresh()
                  }}
                  key={chat.id}
                  value={chat.title}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {chat.title.slice(0, 100)}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  )
}

export default SearchBar
