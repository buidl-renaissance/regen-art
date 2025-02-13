import { Inter } from "next/font/google"
import { NextAuthProvider } from "@/components/next-auth-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import "@/styles/globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Events Platform",
  description: "Discover events in the Renaissance City",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ScrollToTop />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}



import './globals.css'