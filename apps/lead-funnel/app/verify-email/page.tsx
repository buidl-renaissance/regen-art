'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const VerifyEmailBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (email && typeof email === 'string') {
      router.push(`/questionnaire?email=${encodeURIComponent(email)}`)
    } else {
      router.push('/')
    }
  }, [router])

  return (
    <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-center">Redirecting...</CardTitle>
      <CardDescription className="text-center mt-2">Please wait while we redirect you to the questionnaire.</CardDescription>
    </CardHeader>
    <CardContent className="text-center">
      <Button onClick={() => router.push('/')}>Return to Home</Button>
    </CardContent>
  </Card>

  )
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailBox />
      </Suspense>
    </div>
  )
}


