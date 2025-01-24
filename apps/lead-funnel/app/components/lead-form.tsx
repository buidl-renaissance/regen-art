'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function LeadForm({ buttonText, initialEmail = '' }: { buttonText: string, initialEmail?: string }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState(initialEmail)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setEmail(initialEmail)
  }, [initialEmail])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    try {
      const response = await fetch('/api/capture-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      const result = await response.json()

      if (result.success) {
        router.push(`/questionnaire?email=${encodeURIComponent(result.email)}`)
      } else {
        setError(result.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
          buttonText
        )}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}

