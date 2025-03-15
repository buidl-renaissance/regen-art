'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MapPin, Search, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface Event {
  id: number
  title: string
  date: string
  time: string
  venue: string
  latitude: number
  longitude: number
  image: string
}

const events: Event[] = [
  {
    id: 1,
    title: "Social Design Club",
    date: "June 3rd",
    time: "6 pm - 8 pm",
    venue: "Bamboo Detroit",
    latitude: 42.3314,
    longitude: -83.0458,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 2,
    title: "Detroit Art Festival",
    date: "June 5th",
    time: "11 am - 6 pm",
    venue: "Eastern Market",
    latitude: 42.3488,
    longitude: -83.0397,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 3,
    title: "Tech Meetup",
    date: "June 7th",
    time: "7 pm - 9 pm",
    venue: "TechTown Detroit",
    latitude: 42.3652,
    longitude: -83.0694,
    image: "/placeholder.svg?height=100&width=100"
  }
]

export default function MapPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [viewState, setViewState] = useState({
    latitude: 42.3314,
    longitude: -83.0458,
    zoom: 12
  })

  return (
    <main className="h-screen w-full bg-[#eeeeee] flex">
      {/* Sidebar */}
      <div 
        className={`
          ${sidebarOpen ? 'w-96' : 'w-0'} 
          h-full bg-white transition-all duration-300 overflow-hidden flex flex-col
          absolute md:relative z-10
        `}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-xl font-bold text-[#222222]">Events Map</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className={`
                p-4 border-b cursor-pointer transition-colors
                ${selectedEvent?.id === event.id ? 'bg-[#eeeeee]' : 'hover:bg-[#eeeeee]'}
              `}
              onClick={() => {
                setSelectedEvent(event)
                setViewState({
                  latitude: event.latitude,
                  longitude: event.longitude,
                  zoom: 14
                })
              }}
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={event.image}
                    alt=""
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{event.title}</h3>
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
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {!sidebarOpen && (
          <Button
            variant="default"
            size="icon"
            className="absolute top-4 left-4 z-10 bg-white hover:bg-[#eeeeee] text-[#222222]"
            onClick={() => setSidebarOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
          {events.map((event) => (
            <Marker
              key={event.id}
              latitude={event.latitude}
              longitude={event.longitude}
              onClick={e => {
                e.originalEvent.stopPropagation()
                setSelectedEvent(event)
              }}
            >
              <button
                className={`
                  w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center
                  transform transition-transform hover:scale-110
                  ${selectedEvent?.id === event.id ? 'ring-2 ring-primary ring-offset-2' : ''}
                `}
                aria-label={`Show details for ${event.title}`}
              >
                <MapPin className="w-5 h-5" />
              </button>
            </Marker>
          ))}

          {selectedEvent && (
            <Popup
              latitude={selectedEvent.latitude}
              longitude={selectedEvent.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setSelectedEvent(null)}
              anchor="bottom"
            >
              <Card className="p-2 min-w-[200px]">
                <Link href={`/event/${selectedEvent.id}`} className="block hover:opacity-80">
                  <div className="flex gap-2">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={selectedEvent.image}
                        alt=""
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{selectedEvent.title}</h3>
                      <p className="text-xs text-muted-foreground">{selectedEvent.venue}</p>
                      <p className="text-xs text-muted-foreground">{selectedEvent.date}</p>
                    </div>
                  </div>
                </Link>
              </Card>
            </Popup>
          )}
        </Map>
      </div>
    </main>
  )
}

