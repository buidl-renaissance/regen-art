import { Button } from "../../components/ui/button"

export default function Hero() {
  return (
    <section className="bg-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Renaissance City Community Fund</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
          Building a sustainable future by reinvesting in Detroit&apos;s infrastructure and small businesses.
        </p>
        <Button asChild className="animate-fade-in-up animation-delay-600">
          <a href="#join">Learn More</a>
        </Button>
      </div>
    </section>
  )
}

