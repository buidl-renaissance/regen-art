'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const email = searchParams.get('email')
    if (email) {
      router.push(`/questionnaire?email=${encodeURIComponent(email)}`)
    } else {
      router.push('/')
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Redirecting...</CardTitle>
          <CardDescription className="text-center mt-2">Please wait while we redirect you to the questionnaire.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </CardContent>
      </Card>
    </div>
  )
}

