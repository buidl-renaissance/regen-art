import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

export default function FeaturedOpportunity() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Featured Investment Opportunity</h2>
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Midnight Temple</CardTitle>
            <CardDescription className="text-xl">A vibrant gathering place in the heart of Detroit</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-700">
              Your investment helps businesses like Midnight Temple, fostering culture, cuisine, and community.
              Featuring a dynamic music lounge and a scenic rooftop patio, it offers a unique social experience that
              brings people together. By supporting innovative and beloved local businesses, you play a role in shaping
              a prosperous and connected city.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/investment-opportunities">Explore Opportunities</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

