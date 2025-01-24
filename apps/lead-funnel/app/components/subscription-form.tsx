'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import { subscribeToEvents } from '../actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const interestOptions = [
  { id: 'art', label: 'Art Events' },
  { id: 'music', label: 'Music Events' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'networking', label: 'Networking Events' },
]

export default function SubscriptionForm() {
  const [state, formAction] = useFormState(subscribeToEvents, null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formAction(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label>Interests</Label>
        {interestOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox id={option.id} name="interests" value={option.id} />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </div>
      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
      {state?.success && (
        <Alert className="mt-4">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {state?.errors && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {Object.values(state.errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}

