import { Metadata } from 'next'
import SubscriptionForm from '../components/subscription-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Subscribe to Event Notifications',
  description: 'Sign up to receive email notifications about upcoming events at our creative studio.',
}

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Subscribe to Event Notifications</CardTitle>
            <CardDescription className="text-center">
              Stay updated with our latest events and never miss out on the creativity!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

