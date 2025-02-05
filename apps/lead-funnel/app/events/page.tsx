import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const studioEvents = [
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
    time: "7:00 PM - 10:00 PM",
    emoji: "🍽️🎨"
  },
  {
    id: "4",
    title: "Art Night Wednesdays",
    description: "Join us for a creative evening of art and socializing.",
    date: "Every Wednesday",
    time: "7:00 PM - 1:00 AM",
    emoji: "🖼️"
  }
]

export default function StudioEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Studio Events</h1>
          <Button asChild>
            <Link href="/community-events">View Community Events</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studioEvents.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">{event.emoji}</span>
                  {event.title}
                </CardTitle>
                <CardDescription>{event.date} | {event.time}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/join">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/join">Become a Member</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

