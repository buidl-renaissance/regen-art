import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvestmentOpportunities() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-900">Investment Opportunities</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Midnight Temple</CardTitle>
            <CardDescription>A vibrant gathering place in the heart of Detroit</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Midnight Temple is fostering culture, cuisine, and community with its dynamic music lounge and scenic
              rooftop patio. It offers a unique social experience that brings people together.
            </p>
            <Button asChild>
              <Link href="#contact">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
        {/* Add more investment opportunity cards here as needed */}
      </div>
    </div>
  )
}

