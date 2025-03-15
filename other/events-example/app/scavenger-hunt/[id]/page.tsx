import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ScavengerHuntPage() {
  return (
    <main className="min-h-screen bg-[#ffffff] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          <Card className="p-6 text-center">
            <div className="text-sm font-medium">TUES</div>
            <div className="text-sm font-medium">JUN</div>
            <div className="text-4xl font-bold">13</div>
          </Card>
          <div>
            <div className="text-xl">8 pm - 11 pm</div>
            <h1 className="text-4xl font-bold mb-2">
              Tech Tuesday
              <br />
              Scavenger Hunt
            </h1>
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              <span>Bamboo Detroit</span>
            </div>
          </div>
        </div>

        {/* Current Location */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            <span className="font-bold">SPRKBOX</span>
          </div>

          <h2 className="text-3xl font-bold">You unlocked the Orange card!</h2>

          <p className="text-lg leading-relaxed">
            SPRKBOX offers a number of coffee drinks, including alcoholic beverages like a classic espresso martini.
            Come by in the morning and they will have donuts and breakfast burritos availble!
          </p>
        </div>

        {/* Next Clue */}
        <div className="space-y-4">
          <h2 className="text-2xl text-[#666666]">Second Clue</h2>

          <p className="text-lg leading-relaxed">
            Head over to this neighborhood coffee shop and bar by day, Detroit Techno club by night. Go to the second
            floor and find your next clue.
          </p>

          <div className="mt-8">
            <h3 className="font-bold mb-2">Hint:</h3>
            <p className="text-lg">On the corner of Grand River Ave & Griswold.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

