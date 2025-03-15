import { EventCard } from "@/components/event-card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const events = [
  {
    id: 1,
    date: "June 3rd",
    time: "6 pm - 8 pm",
    title: "Social Design Club",
    venue: "Bamboo Detroit",
    description: "Join us at Social Design Club for in-person meetups where we chat...",
    image: "/placeholder.svg?height=128&width=128",
  },
  {
    id: 2,
    date: "June 3rd",
    time: "10 pm - 2 am",
    title: "Human Being",
    venue: "SPRK BOX",
    description: "DJs XSTRAKT and HULKOLAS : Master of Ceremonies Silan",
    image: "/placeholder.svg?height=128&width=128",
  },
  {
    id: 3,
    date: "June 5th",
    time: "7 pm - 9 pm",
    title: "Tech Meetup: AI in Detroit",
    venue: "TechTown Detroit",
    description: "Explore the latest AI innovations shaping Detroit's tech scene",
    image: "/placeholder.svg?height=128&width=128",
  },
  {
    id: 4,
    date: "June 7th",
    time: "6:30 pm - 8:30 pm",
    title: "Detroit Entrepreneurs Networking Night",
    venue: "WeWork Campus Martius",
    description: "Connect with fellow entrepreneurs and startups in Detroit",
    image: "/placeholder.svg?height=128&width=128",
  },
  {
    id: 5,
    date: "June 10th",
    time: "11 am - 4 pm",
    title: "Eastern Market Art Fair",
    venue: "Eastern Market",
    description: "Discover local artists and artisans at this outdoor art fair",
    image: "/placeholder.svg?height=128&width=128",
  },
]

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6">All Events</h1>
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </main>
  )
}

