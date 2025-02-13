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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { JoinNowModal } from "@/components/join-now-modal"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const organizationData = {
  id: 1,
  name: "Detroit Creative Collective",
  description:
    "Detroit Creative Collective is a non-profit organization dedicated to fostering creativity and innovation in the Detroit area. We bring together artists, designers, and entrepreneurs to collaborate on projects that benefit the community.",
  foundedYear: 2015,
  members: 500,
  website: "https://www.detroitcreativecollective.org",
  image: "/placeholder.svg?height=300&width=800",
  organizers: [
    { id: 1, name: "Sarah Johnson", role: "Executive Director", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Michael Lee", role: "Events Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Emily Rodriguez", role: "Community Outreach", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "David Chen", role: "Marketing Director", avatar: "/placeholder.svg?height=40&width=40" },
  ],
  events: [
    {
      id: 1,
      title: "Annual Art Showcase",
      date: "July 15th",
      time: "6 pm - 10 pm",
      venue: "Detroit Institute of Arts",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Creative Workshop Series",
      date: "July 20th - August 10th",
      time: "Every Wednesday, 7 pm - 9 pm",
      venue: "TechTown Detroit",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Detroit Design Festival",
      date: "August 1st - August 7th",
      time: "Various Times",
      venue: "Multiple Locations",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "Startup Pitch Night",
      date: "August 15th",
      time: "6:30 pm - 9 pm",
      venue: "Bamboo Detroit",
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  socialMedia: [
    { name: "Twitter", url: "https://twitter.com/detroitcreative", icon: "Twitter" },
    { name: "Instagram", url: "https://instagram.com/detroitcreative", icon: "Instagram" },
    { name: "Facebook", url: "https://facebook.com/detroitcreative", icon: "Facebook" },
  ],
}

export default function OrganizationPage({ params }: { params: { id: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen])
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Organization Image */}
        <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] mb-6 rounded-lg overflow-hidden">
          <Image
            src={organizationData.image || "/placeholder.svg"}
            alt={organizationData.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Organization Info */}
        <div className="mb-8 space-y-3">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{organizationData.name}</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">{organizationData.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Founded in {organizationData.foundedYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{organizationData.members} members</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <a
                href={organizationData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {organizationData.website}
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
                {organizationData.organizers.map((organizer) => (
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
                {organizationData.socialMedia.map((social) => (
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
                Detroit Creative Collective was founded in {organizationData.foundedYear} with the mission to foster
                creativity and innovation in the Detroit area. We've grown to a community of {organizationData.members}{" "}
                members, all working together to make Detroit a hub for art, design, and entrepreneurship.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Events Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {organizationData.events.map((event) => (
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

