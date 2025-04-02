import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ProfileBubble } from './components/profile-bubble'
import { ScrollManager } from './components/scroll-manager'
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Studio Portal',
  description: 'Join our creative community at the Russell Industrial Center',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollManager />
        {children}
        <ProfileBubble />
      </body>
      <Analytics />
    </html>
  )
}

