import CallToAction from "../components/CallToAction"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Footer from "../components/Footer"
    
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

