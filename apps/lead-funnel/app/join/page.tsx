'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function JoinPage() {
  const router = useRouter()
  // const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    try {
      const captureResponse = await fetch('/api/capture-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, formId: 'join' }),
      })

      const captureResult = await captureResponse.json()

      if (captureResult.success) {
        router.push(`/questionnaire?email=${encodeURIComponent(email)}`)
      } else {
        setError(captureResult.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Join Our Creative Studio</CardTitle>
          <CardDescription className="text-center mt-2">Unleash your creativity and connect with fellow artists!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Why Join Us?</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">🎨</span>
                  <span>Access exclusive events and workshops</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🤝</span>
                  <span>Connect with a diverse community of artists</span>
                </li>
                {/* <li className="flex items-center">
                  <span className="mr-2">💼</span>
                  <span>Showcase your skills and certifications</span>
                </li> */}
                <li className="flex items-center">
                  <span className="mr-2">🌟</span>
                  <span>Collaborate on inspiring projects</span>
                </li>
              </ul>
            </div>
            {/* <div>
              <h2 className="text-xl font-semibold mb-2">Membership Includes:</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">🖼️</span>
                  <span>Art Night Wednesdays – Connect, collaborate, and create</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🍽️</span>
                  <span>Sunday Community Dinner – Share a meal with fellow members</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎨</span>
                  <span>Sunday Open Studio – Work on your projects after dinner</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎧</span>
                  <span>Monday Open Decks – Practice your DJ skills</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✨</span>
                  <span>Rotating Tuesday Workshops – Learn new skills and techniques</span>
                </li>
              </ul>
            </div> */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Exclusive Membership Perks:</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">🔊</span>
                  <span>Discounted speaker and equipment rentals</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🖼️</span>
                  <span>At-cost custom canvas frames</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🏙️</span>
                  <span>Exclusive deals and perks at local establishments</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Connect with Members:</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">👥</span>
                  <span>View detailed member profiles</span>
                </li>
                {/* <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span>Access contact information for collaboration</span>
                </li> */}
                <li className="flex items-center">
                  <span className="mr-2">🔍</span>
                  <span>Find members with complementary skills</span>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Join Now"
              )}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

