"use client"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Globe, Calendar, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would typically come from an API or database
const neighborhoodData = {
  name: "Midtown",
  description:
    "Midtown is a vibrant cultural district home to museums, universities, and trendy restaurants. It's known for its diverse dining scene, artistic community, and educational institutions.",
  image: "/placeholder.svg?height=400&width=1200",
  categories: [
    {
      name: "Restaurants",
      venues: [
        {
          name: "Selden Standard",
          description: "New American small plates & craft cocktails in a modern, rustic-chic space.",
          address: "3921 Second Ave, Detroit, MI 48201",
          phone: "(313) 438-5055",
          website: "http://www.seldenstandard.com",
          hours: "Tue-Thu 5-10PM, Fri-Sat 5-11PM, Sun 10AM-2PM",
          rank: 1,
          id: 1,
          subRankings: [
            { category: "Ambiance", rank: 1 },
            { category: "Service", rank: 2 },
          ],
        },
        {
          name: "Hop Cat",
          description: "Lively brewpub with a huge beer selection, pub grub & a spacious patio.",
          address: "4265 Woodward Ave, Detroit, MI 48201",
          phone: "(313) 769-8828",
          website: "http://www.hopcat.com",
          hours: "Mon-Sun 11AM-12AM",
          rank: 2,
          id: 2,
          subRankings: [
            { category: "Beer Selection", rank: 1 },
            { category: "Pub Food", rank: 3 },
          ],
        },
        {
          name: "Grey Ghost Detroit",
          description: "Upscale New American fare & craft cocktails in a stylish, industrial-chic space.",
          address: "47 E Watson St, Detroit, MI 48201",
          phone: "(313) 262-6534",
          website: "http://www.greyghostdetroit.com",
          hours: "Tue-Sun 4PM-10PM",
          rank: 3,
          id: 3,
          subRankings: [
            { category: "Cocktails", rank: 1 },
            { category: "Fine Dining", rank: 2 },
          ],
        },
      ],
    },
    {
      name: "Attractions",
      venues: [
        {
          name: "Detroit Institute of Arts",
          description: "Expansive museum with a vast collection of art from ancient to modern times.",
          address: "5200 Woodward Ave, Detroit, MI 48202",
          phone: "(313) 833-7900",
          website: "http://www.dia.org",
          hours: "Tue-Thu 9AM-4PM, Fri 9AM-10PM, Sat-Sun 10AM-5PM",
          rank: 1,
          id: 4,
          subRankings: [
            { category: "Collections", rank: 1 },
            { category: "Educational Programs", rank: 2 },
          ],
        },
        {
          name: "Museum of Contemporary Art Detroit",
          description: "Non-collecting contemporary art museum in a former auto dealership.",
          address: "4454 Woodward Ave, Detroit, MI 48201",
          phone: "(313) 832-6622",
          website: "http://www.mocadetroit.org",
          hours: "Wed-Sun 11AM-5PM",
          rank: 2,
          id: 5,
          subRankings: [
            { category: "Exhibitions", rank: 1 },
            { category: "Architecture", rank: 3 },
          ],
        },
        {
          name: "Charles H. Wright Museum of African American History",
          description: "The world's largest institution dedicated to African American culture.",
          address: "315 E Warren Ave, Detroit, MI 48201",
          phone: "(313) 494-5800",
          website: "http://www.thewright.org",
          hours: "Thu-Sat 9AM-5PM, Sun 1PM-5PM",
          rank: 3,
          id: 6,
          subRankings: [
            { category: "Historical Significance", rank: 1 },
            { category: "Educational Resources", rank: 2 },
          ],
        },
      ],
    },
    {
      name: "Nightlife",
      venues: [
        {
          name: "The Whitney",
          description: "Upscale American cuisine in a historic mansion with a garden & ghost bar.",
          address: "4421 Woodward Ave, Detroit, MI 48201",
          phone: "(313) 832-5700",
          website: "http://www.thewhitney.com",
          hours: "Tue-Sat 5PM-10PM, Sun 11AM-2PM",
          rank: 1,
          id: 7,
          subRankings: [
            { category: "Ambiance", rank: 1 },
            { category: "Cocktails", rank: 2 },
          ],
        },
        {
          name: "Marble Bar",
          description: "Hip nightclub featuring electronic music, DJ sets & dancing in industrial digs.",
          address: "1501 Holden St, Detroit, MI 48208",
          phone: "(313) 551-3158",
          website: "http://www.marblebardetroit.com",
          hours: "Fri-Sat 10PM-2AM",
          rank: 2,
          id: 8,
          subRankings: [
            { category: "Music", rank: 1 },
            { category: "Atmosphere", rank: 3 },
          ],
        },
        {
          name: "Cafe D'Mongos Speakeasy",
          description: "Eclectic, vintage-style bar with craft cocktails, live music & a speakeasy vibe.",
          address: "1439 Griswold St, Detroit, MI 48226",
          phone: "(313) 784-9508",
          website: "http://www.cafedmongos.com",
          hours: "Fri-Sat 8PM-2AM",
          rank: 3,
          id: 9,
          subRankings: [
            { category: "Cocktails", rank: 1 },
            { category: "Ambiance", rank: 2 },
          ],
        },
      ],
    },
  ],
}

function getTodayHours(hours: string): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = days[new Date().getDay()]
  const hoursParts = hours.split(", ")
  const todayHours = hoursParts.find((part) => part.startsWith(today))
  return todayHours ? todayHours.split(" ")[1] : "Closed"
}

export default function NeighborhoodPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Neighborhood Image */}
        <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={neighborhoodData.image || "/placeholder.svg"}
            alt={neighborhoodData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="p-6">
              <h1 className="text-4xl font-bold text-white mb-2">{neighborhoodData.name}</h1>
              <p className="text-white/80">{neighborhoodData.description}</p>
            </div>
          </div>
        </div>

        {/* Venues by Category */}
        {neighborhoodData.categories.map((category) => (
          <div key={category.name} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
            <div className="space-y-2">
              {category.venues.map((venue) => (
                <div key={venue.name} className="overflow-hidden">
                  <div className="py-2 flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Badge
                        variant="secondary"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                      >
                        {venue.rank}
                      </Badge>
                    </div>
                    <div className="flex-grow">
                      <Link href={`/venue/${venue.id}`} className="hover:underline">
                        <h3 className="text-xl font-semibold mb-1">{venue.name}</h3>
                      </Link>
                      {venue.subRankings && (
                        <div className="text-sm text-muted-foreground mb-2">
                          {venue.subRankings.map((subRank, index) => (
                            <span key={index} className="mr-2">
                              {subRank.category}: #{subRank.rank}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        <Phone className="w-5 h-5" />
                        <a
                          href={venue.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          <span>{getTodayHours(venue.hours)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                className="text-primary hover:underline flex items-center"
              >
                <span>View all {category.name}</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

