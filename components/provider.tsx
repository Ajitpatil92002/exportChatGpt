"use client"

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from 'next-auth/react'

interface LayoutProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
