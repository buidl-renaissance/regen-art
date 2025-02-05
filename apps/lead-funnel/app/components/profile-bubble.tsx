'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProfile } from '@/hooks/useProfile';

export function ProfileBubble() {
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false)

  if (!profile) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-14 w-14 rounded-full p-0 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-75"></div>
              <Avatar className="h-full w-full border-2 border-white">
                <AvatarImage src={profile.profile_picture || "/placeholder.svg?height=56&width=56"} alt="Profile" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/profile">View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/members">Connect with Members</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/events">View Events</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/events/promote">Promote Event</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">Home</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

