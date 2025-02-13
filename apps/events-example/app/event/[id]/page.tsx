import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bookmark, MessageCircle, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { ChatForm } from "@/components/chat-form"
import { useRouter } from "next/navigation"

interface Geo {
  full: string;
  address: string;
  city: string;
  state: string | null;
  country: string;
  zipcode: string;
  lat: number;
  lng: number;
}

interface Contact {
  phone: string | null;
  website: string | null;
}

interface Venue {
  id: number;
  title: string;
  cid: string;
  slug: string;
  geo: Geo;
  contact: Contact;
}

interface Category {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
}

interface ImageData {
  file: string;
  width: number;
  height: number;
  'mime-type': string;
  filesize: number;
  url: string;
}

interface User {
  id: number;
  cid: string;
  name: string;
  organization: string;
}

interface RSVP {
  id: number;
  user: User;
  number: number;
  confirmed: boolean | null;
}

interface Event {
  id: number;
  title: string;
  cid: string;
  slug: string;
  host: string | null;
  venue: Venue;
  start_date: string;
  end_date: string;
  event_categories: Category[];
  categories: string[];
  excerpt: string;
  featured: boolean;
  image_data: ImageData;
  image: string;
  content: string;
  url: string;
  rsvps: RSVP[];
  comments: any[];
  check_ins: any[];
}

async function getEvent(id: string): Promise<Event> {
  const response = await fetch(`https://api.detroiter.network/api/event/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch event')
  }
  return response.json()
}

export default async function EventPage({ params }: { params: { id: string }}) {
  const router = useRouter()
  const event = await getEvent(params.id)

  const eventDate = new Date(event.start_date)
  const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()
  const day = eventDate.toLocaleString('default', { weekday: 'short' }).toUpperCase()
  const date = eventDate.getDate()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 p-0 hover:bg-transparent">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {/* Date and Title Section */}
        <div className="flex gap-6 items-start mb-6">
          <Card className="p-4 text-center w-32">
            <div className="text-sm font-medium">{day}</div>
            <div className="text-sm font-medium">{month}</div>
            <div className="text-4xl font-bold">{date}</div>
          </Card>
          <div className="flex-1">
            <div className="text-lg text-muted-foreground mb-1">
              {new Date(event.start_date).toLocaleTimeString()} - {new Date(event.end_date).toLocaleTimeString()}
            </div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="text-xl text-muted-foreground">{event.venue.title}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button size="lg" className="flex-1">
            I&apos;m going
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            I&apos;m interested
          </Button>
        </div>

        {/* Event Image */}
        <div className="relative aspect-video mb-8 bg-muted rounded-lg overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg?height=400&width=800"}
            alt={`${event.title} event banner`}
            width={800}
            height={400}
            className="object-cover"
            priority
          />
        </div>

        {/* Event Description */}
        <p className="text-xl mb-8">
          {event.content}
        </p>

        {/* Chat Input */}
        <Card className="p-4 mb-8">
          <ChatForm />
        </Card>

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
          <div className="max-w-2xl mx-auto flex justify-end gap-4">
            <Button variant="ghost" size="icon">
              <Bookmark className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
