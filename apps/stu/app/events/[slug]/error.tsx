'use client'

import { useEffect } from 'react'
import { Button } from "../../../components/ui/button"
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-4">We&apos;re sorry, but we couldn&apos;t load the event details. Please try again later.</p>
        <div className="space-x-4">
          <Button onClick={() => reset()}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

