import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const upcomingEvents = [
  {
    id: "1",
    title: "Open Decks/DJ Practice",
    description: "Spin some tunes and practice your DJ skills.",
    date: "Every Monday",
    time: "7:00 PM - 10:00 PM",
    emoji: "🎧"
  },
  {
    id: "2",
    title: "Workshop Tuesdays",
    description: "Rotating workshops including VR Experience, Tie-Dye, Figure Drawing, Live Modeling, and Canvas Frame Making.",
    date: "Every Tuesday",
    time: "6:00 PM - 9:00 PM",
    emoji: "🎨"
  },
  {
    id: "3",
    title: "Community Dinner & Open Studio",
    description: "Join us for a communal dinner and stay for open studio time to work on your projects.",
    date: "Every Sunday",
    time: "6:00 PM - 11:00 PM",
    emoji: "🍽️🎨"
  },
  {
    id: "4",
    title: "Art Night Wednesdays",
    description: "Join us for a creative evening of art and socializing.",
    date: "Every Wednesday",
    time: "7:00 PM - 10:00 PM",
    emoji: "🖼️"
  }
]

export default function EventList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {upcomingEvents.slice(0, 4).map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">{event.emoji}</span>
              {event.title}
            </CardTitle>
            <CardDescription>{event.date} | {event.time}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/events">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

