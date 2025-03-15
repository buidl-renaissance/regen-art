"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { CalendarDays, Music, Palette, Users, Star, Zap, Briefcase, Quote } from 'lucide-react'
import { ScrollLockSection } from './components/scroll-lock-section'

export default function Home() {
  return (
    <div className="scroll-lock-container">
      <ScrollLockSection 
        parallaxSpeed={0.5}
        backgroundImage="https://detroitartdao.com/wp-content/uploads/2025/01/studio-background.png"
        className="flex items-center justify-center mobile-full-height"
      >
        <div className="text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Unleash Your Creativity</h1>
          <p className="text-lg md:text-xl mb-8">Join our vibrant community at the Russell Industrial Center</p>
          <Button asChild size="lg">
            <Link href="/join">Learn More</Link>
          </Button>
        </div>
      </ScrollLockSection>

      <ScrollLockSection parallaxSpeed={0.3} className="bg-gray-900 text-white flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 lg:p-12 animate-fade-in mobile-py flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">Exclusive Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-300">
                  Access to members-only workshops, art nights, and creative sessions that inspire and challenge you.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">Collaborative Space</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-300">
                  Work alongside fellow artists in our inspiring industrial setting, fostering creativity and
                  collaboration.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">Creative Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-300">
                  Enjoy discounted rates on equipment rentals and access to shared resources to bring your vision to
                  life.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 md:mt-12 text-center">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
              <Link href="/join">Become a Member</Link>
            </Button>
          </div>
        </div>
      </ScrollLockSection>

      <ScrollLockSection parallaxSpeed={0.2} className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 lg:p-12 animate-fade-in mobile-py flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-purple-800">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-purple-300 opacity-50" />
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Sarah J."
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />                  
                  <div>
                    <p className="font-semibold text-purple-800">Sarah J.</p>
                    <p className="text-sm text-gray-600">Visual Artist</p>
                  </div>
                </div>
                <p className="italic mb-4 text-gray-700 relative z-10">"Joining this creative community has been transformative for my art. The collaborative atmosphere and diverse events have pushed my boundaries and inspired new directions in my work."</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-pink-300 opacity-50" />
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Mike R."
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-pink-800">Mike R.</p>
                    <p className="text-sm text-gray-600">DJ and Producer</p>
                  </div>
                </div>
                <p className="italic mb-4 text-gray-700 relative z-10">"As a musician, having access to the open decks nights and networking with other creatives has opened up incredible opportunities. This space is a catalyst for collaboration and growth."</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-300 opacity-50" />
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Elena T."
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-blue-800">Elena T.</p>
                    <p className="text-sm text-gray-600">Mixed Media Artist</p>
                  </div>
                </div>
                <p className="italic mb-4 text-gray-700 relative z-10">"The workshops and shared resources have allowed me to explore new mediums I never thought I'd try. This community has become my second home and a constant source of inspiration."</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-green-300 opacity-50" />
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Alex K."
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-green-800">Alex K.</p>
                    <p className="text-sm text-gray-600">Filmmaker</p>
                  </div>
                </div>
                <p className="italic mb-4 text-gray-700 relative z-10">"The diverse community here has been instrumental in expanding my creative vision. Collaborating with artists from various disciplines has added new dimensions to my filmmaking process and storytelling techniques."</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollLockSection>

      <ScrollLockSection parallaxSpeed={0.6} className="bg-gradient-to-b from-purple-400 to-pink-500 py-16 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto px-4 animate-fade-in">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-lg md:text-xl mb-8">Become a member today for only $20 per month!</p>
            <Button asChild size="lg" variant="primary" className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300">
              <Link href="/join">Join Now</Link>
            </Button>
          </div>
        </div>
      </ScrollLockSection>
    </div>
  )
}

