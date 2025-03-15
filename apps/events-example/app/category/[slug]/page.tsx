"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EventCard } from "@/components/event-card"

interface Place {
  id: number
  name: string
  address: string
  description: string
  rankings: Array<{
    category: string
    rank: number
  }>
  images: Array<{
    url: string
    timeAgo?: string
  }>
}

const places: Place[] = [
  {
    id: 1,
    name: "Michigan & Trumble",
    address: "1331 Holden St #100, Detroit, MI 48202",
    description: "Family-owned Detroit-style pizzeria serving up top-notch pizzas with unique ingredients.",
    rankings: [
      { category: "Pizza", rank: 1 },
      { category: "Wings", rank: 3 },
      { category: "Apps", rank: 2 },
    ],
    images: [
      { url: "/placeholder.svg?height=100&width=100" },
      { url: "/placeholder.svg?height=100&width=100", timeAgo: "a week ago" },
      { url: "/placeholder.svg?height=100&width=100" },
      { url: "/placeholder.svg?height=100&width=100" },
      { url: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 2,
    name: "Supino Pizzeria",
    address: "6519 Woodward Ave, Detroit, MI 48202",
    description: "Busy place for thin-crust pizza & slices with novel toppings like egg & turkey.",
    rankings: [
      { category: "Pizza", rank: 2 },
      { category: "Dessert", rank: 3 },
      { category: "Apps", rank: 1 },
    ],
    images: [
      { url: "/placeholder.svg?height=100&width=100", timeAgo: "2 weeks ago" },
      { url: "/placeholder.svg?height=100&width=100" },
      { url: "/placeholder.svg?height=100&width=100" },
      { url: "/placeholder.svg?height=100&width=100" },
      { url: "/placeholder.svg?height=100&width=100" },
    ],
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Detroit Pizza Festival",
    date: "July 15, 2023",
    time: "12:00 PM - 8:00 PM",
    venue: "Hart Plaza",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Pizzapalooza",
    date: "July 22, 2023",
    time: "6:00 PM - 10:00 PM",
    venue: "Eastern Market",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Deep Dish Dive",
    date: "August 5, 2023",
    time: "7:00 PM - 11:00 PM",
    venue: "Michigan Central Station",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = params.slug.toUpperCase()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#333333] text-white">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <Link href="/" className="inline-flex items-center text-sm hover:opacity-80">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </div>
          <div className="py-6">
            <h1 className="text-3xl font-bold mb-1">TOP {category} PLACES</h1>
            <p className="text-white/80">DETROIT, MI</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-[300px] bg-muted relative">
        <Image
          src="/placeholder.svg?height=300&width=1200"
          alt="Map of locations"
          className="object-cover"
          fill
          priority
        />
      </div>

      {/* Places List */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {places.map((place) => (
            <Card key={place.id} className="p-6">
              <div className="space-y-4">
                <div>
                  <Link href={`/venue/${place.id}`} className="hover:underline">
                    <h2 className="text-2xl font-bold mb-1">{place.name}</h2>
                  </Link>
                  <p className="text-muted-foreground text-sm">{place.address}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {place.rankings.map((ranking, index) => (
                    <Badge key={index} variant={ranking.rank === 1 ? "default" : "secondary"} className="text-sm">
                      #{ranking.rank} {ranking.category}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground">{place.description}</p>

                <div className="relative">
                  <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                    {place.images.map((image, index) => (
                      <div key={index} className="flex-shrink-0 relative w-[100px] h-[100px]">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={`${place.name} image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {image.timeAgo && (
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {image.timeAgo}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming {params.slug.toUpperCase()} Events</h2>
        <div className="space-y-2">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              venue={event.venue}
              description={`Join us for ${event.title} at ${event.venue}`}
              image={event.image}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

