import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Phone, Globe, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const venueData = {
  id: 1,
  name: "Bamboo Detroit",
  description:
    "Bamboo Detroit is a coworking space and event venue located in the heart of downtown Detroit. We offer flexible workspace solutions and host a variety of community events.",
  address: "1420 Washington Blvd, Detroit, MI 48226",
  phone: "(313) 555-1234",
  website: "https://www.bamboodetroit.com",
  email: "info@bamboodetroit.com",
  image: "/placeholder.svg?height=300&width=800",
  upcomingEvents: [
    {
      id: 1,
      title: "Social Design Club",
      date: "June 5th",
      time: "6 pm - 8 pm",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Tech Meetup",
      date: "June 10th",
      time: "7 pm - 9 pm",
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  promotedEvents: [
    {
      id: 3,
      title: "Startup Pitch Night",
      date: "June 15th",
      time: "6:30 pm - 9 pm",
      venue: "TechTown Detroit",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "Detroit Design Festival",
      date: "June 20th - June 25th",
      time: "Various Times",
      venue: "Multiple Locations",
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
}

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Venue Image */}
        <div className="relative h-[200px] sm:h-[300px] lg:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={venueData.image || "/placeholder.svg"}
            alt={venueData.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Venue Info */}
        <div className="mb-8 space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{venueData.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{venueData.description}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>{venueData.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>{venueData.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <a
                  href={venueData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {venueData.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <a href={`mailto:${venueData.email}`} className="text-primary hover:underline">
                  {venueData.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="promoted">Promoted Events</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {venueData.upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} venueId={venueData.id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="promoted">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {venueData.promotedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function EventCard({ event, venueId }: { event: any; venueId?: number }) {
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
              {event.venue && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
              )}
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

