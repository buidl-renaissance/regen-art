'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function PromoteEventPage() {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
  })
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEventDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the event submission logic
    console.log('Event submitted', eventDetails)
    toast({
      title: "Event Submitted",
      description: "Your event has been submitted for review.",
    })
    // Redirect to the organization page after submission
    router.push('/organization/1')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Promote Your Event</CardTitle>
          <CardDescription>Fill in the details of your event below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Enter event title"
                value={eventDetails.title}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Input 
                id="date" 
                name="date" 
                type="date"
                value={eventDetails.date}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Event Time</Label>
              <Input 
                id="time" 
                name="time" 
                type="time"
                value={eventDetails.time}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input 
                id="venue" 
                name="venue" 
                placeholder="Enter event venue"
                value={eventDetails.venue}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Describe your event"
                value={eventDetails.description}
                onChange={handleChange}
                required 
              />
            </div>
            <Button type="submit" className="w-full">Submit Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

