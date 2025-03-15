'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Calendar } from "../../../components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, ImageIcon } from 'lucide-react'
import { cn } from "../../../lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Checkbox } from "../../../components/ui/checkbox"
import { submitEvent } from './actions'
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert"

export default function EventPromotionPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [publishToEventbrite, setPublishToEventbrite] = useState(false)
  const [publishToLuma, setPublishToLuma] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ eventId: number, blockchainHash: string } | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsPending(true)
    setError(null)
    setSuccess(null)

    if (!date) {
      setError('Please select a date')
      setIsPending(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('date', date.toISOString())
    formData.append('time', time)
    formData.append('location', location)
    formData.append('category', category)
    formData.append('publishToEventbrite', publishToEventbrite.toString())
    formData.append('publishToLuma', publishToLuma.toString())
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const result = await submitEvent(formData)

      if (result.success) {
        setSuccess({ eventId: result.eventId, blockchainHash: result.blockchainHash })
      } else {
        setError(result.error || 'An error occurred while submitting the event')
      }
    } catch (error) {
      console.error('Error submitting event:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Promote Your Event</CardTitle>
            <CardDescription className="text-center mt-2">Share your event with the community</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert>
                <AlertTitle>Event Created Successfully!</AlertTitle>
                <AlertDescription>
                  Your event has been created with ID: {success.eventId}
                  <br />
                  Blockchain Hash: {success.blockchainHash}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Event Image</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Event preview"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Publishing Options</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publishToEventbrite"
                      checked={publishToEventbrite}
                      onCheckedChange={(checked) => setPublishToEventbrite(checked as boolean)}
                    />
                    <label
                      htmlFor="publishToEventbrite"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Publish to Eventbrite
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publishToLuma"
                      checked={publishToLuma}
                      onCheckedChange={(checked) => setPublishToLuma(checked as boolean)}
                    />
                    <label
                      htmlFor="publishToLuma"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Publish to Luma
                    </label>
                  </div>
                </div>
                <Button className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Event"
                  )}
                </Button>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

