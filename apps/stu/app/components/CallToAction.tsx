"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend or email service
    console.log("Submitted email:", email)
    // Reset the form
    setEmail("")
    // Show a success message (you might want to add state for this)
    // alert("Thank you for signing up! We'll be in touch soon.")
    fetch('/api/capture-email', {
      method: 'POST',
      body: JSON.stringify({ email, formId: 'fund' }),
    })

    document.body.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <section id="join" className="bg-gradient-to-br from-blue-900 to-blue-700 py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">Join the Movement</CardTitle>
            <CardDescription className="text-lg">
              Be part of a community-powered investment model that strengthens Detroit&apos;s future, one bond at a time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit" size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                  Sign Up <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Sign up today to learn how you can invest with purpose and make a lasting impact on Detroit&apos;s
                communities.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

