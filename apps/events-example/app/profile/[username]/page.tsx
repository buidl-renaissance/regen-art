import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { UpVoteButton } from "./up-vote-button"

const events = [
  {
    id: 1,
    title: "Social Design Club",
    date: "June 5th",
    time: "6 pm - 8 pm",
    venue: "Bamboo Detroit",
    image: "/placeholder.svg?height=100&width=100",
    status: "hosting"
  },
  {
    id: 2,
    title: "Detroit Art Gallery Night",
    date: "June 12th",
    time: "7 pm - 10 pm",
    venue: "MOCAD",
    image: "/placeholder.svg?height=100&width=100",
    status: "attending"
  },
  {
    id: 3,
    title: "Electronic Music Showcase",
    date: "June 15th",
    time: "9 pm - 2 am",
    venue: "The Works",
    image: "/placeholder.svg?height=100&width=100",
    status: "interested"
  }
]

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image
              src="/placeholder.svg?height=256&width=256"
              alt="Nathan Karinen profile"
              width={256}
              height={256}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center text-white space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Nathan Karinen</h1>
          <p className="text-xl text-white/80">Graphic Designer, DJ and Producer</p>
        </div>

        {/* About Section */}
        <div className="max-w-2xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl text-white font-semibold mb-4">About</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Based in Detroit, Nathan has been growing a community of creative people 
              to come together on Wednesday nights for the sake of art.
            </p>
          </section>

          {/* Up Votes Section */}
          <section className="space-y-4">
            <h2 className="text-2xl text-white font-semibold">Up Votes</h2>
            <div className="flex items-end gap-4">
              <div className="text-6xl font-bold text-white">32</div>
              <UpVoteButton />
            </div>
          </section>

          {/* Events Section */}
          <section className="space-y-4">
            <h2 className="text-2xl text-white font-semibold mb-6">Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <Link 
                  key={event.id} 
                  href={`/event/${event.id}`}
                  className="block transition-opacity hover:opacity-90"
                >
                  <Card className="p-4 bg-white/10">
                    <div className="flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={event.image}
                          alt=""
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-semibold text-white">
                            {event.title}
                          </h3>
                          <span className="text-xs uppercase text-white/60 bg-white/20 px-2 py-1 rounded">
                            {event.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/60">
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
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

