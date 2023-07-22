import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="app">{children}</main>
    </>
  )
}

export default Layout
