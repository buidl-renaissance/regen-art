'use client'

import SubscriptionForm from '../components/subscription-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation';


export default function SubscribePage() {
  const router = useRouter();
  
  const onSuccess = (result: any) => {
    router.push(`/questionnaire?email=${encodeURIComponent(result.email)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Cook up at Studio 202</CardTitle>
            <CardDescription className="text-center">
              Sign up to receive information about how you can get involved with our creative studio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionForm onSuccess={onSuccess} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

