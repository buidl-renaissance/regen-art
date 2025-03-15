"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Users,
  ChevronDown,
  ChevronUp,
  Twitter,
  Instagram,
  Facebook,
  ChevronLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { JoinNowModal } from "@/components/join-now-modal"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from "next/navigation"

const communityData = {
  id: 1,
  name: "Detroit Tech Hub",
  description:
    "Detroit Tech Hub is a community for tech professionals and enthusiasts in the Detroit area. We bring together developers, designers, and entrepreneurs to collaborate on projects, share knowledge, and grow the local tech ecosystem.",
  foundedYear: 2018,
  members: 1200,
  website: "https://www.detroittechhub.org",
  image: "/placeholder.svg?height=300&width=800",
  organizers: [
    { id: 1, name: "Alex Johnson", role: "Community Lead", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Samantha Lee", role: "Events Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "David Chen", role: "Tech Advisor", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Maria Rodriguez", role: "Partnerships Manager", avatar: "/placeholder.svg?height=40&width=40" },
  ],
  events: [
    {
      id: 1,
      title: "Tech Meetup: AI in Detroit",
      date: "June 15th",
      time: "7 pm - 9 pm",
      venue: "TechTown Detroit",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Detroit Startup Week",
      date: "June 20th - June 24th",
      time: "Various Times",
      venue: "Multiple Locations",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Code for Detroit Hackathon",
      date: "July 8th - July 9th",
      time: "9 am - 5 pm",
      venue: "Wayne State University",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "Detroit Tech Job Fair",
      date: "July 15th",
      time: "10 am - 3 pm",
      venue: "Cobo Center",
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  socialMedia: [
    { name: "Twitter", url: "https://twitter.com/detroittechhub", icon: "Twitter" },
    { name: "Instagram", url: "https://instagram.com/detroittechhub", icon: "Instagram" },
    { name: "Facebook", url: "https://facebook.com/detroittechhub", icon: "Facebook" },
  ],
}

export default function CommunityPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 p-0 hover:bg-transparent">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Community Image */}
        <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] mb-6 rounded-lg overflow-hidden">
          <Image
            src={communityData.image || "/placeholder.svg"}
            alt={communityData.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Community Info */}
        <div className="mb-8 space-y-3">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{communityData.name}</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">{communityData.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Founded in {communityData.foundedYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{communityData.members} members</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <a
                href={communityData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {communityData.website}
              </a>
            </div>
          </div>
        </div>

        {/* Learn More Section */}
        <Collapsible open={isOpen} onOpenChange={toggleOpen} className="mb-8">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>{isOpen ? "Show Less" : "Learn More"}</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Organizers</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {communityData.organizers.map((organizer) => (
                  <div key={organizer.id} className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={organizer.avatar} alt={organizer.name} />
                      <AvatarFallback>
                        {organizer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{organizer.name}</p>
                      <p className="text-xs text-muted-foreground">{organizer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Connect With Us</h2>
              <div className="flex space-x-4">
                {communityData.socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social.icon === "Twitter" && <Twitter className="h-6 w-6" />}
                    {social.icon === "Instagram" && <Instagram className="h-6 w-6" />}
                    {social.icon === "Facebook" && <Facebook className="h-6 w-6" />}
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">About Us</h2>
              <p className="text-muted-foreground">
                Detroit Tech Hub was founded in {communityData.foundedYear} with the mission to foster innovation and
                collaboration in Detroit's tech community. We've grown to a community of {communityData.members}{" "}
                members, all working together to make Detroit a leading tech hub in the Midwest.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Events Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {communityData.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Fixed Join Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <JoinNowModal className="w-full" />
        </div>
      </div>
    </main>
  )
}

function EventCard({ event }: { event: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-24 h-24 flex-shrink-0">
            <Image src={event.image || "/placeholder.svg"} alt="" fill className="object-cover rounded-lg" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link href={`/event/${event.id}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

