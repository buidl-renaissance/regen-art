import { useState } from "react"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"

const interestOptions = [
  { id: "photography", label: "Photography" },
  { id: "webDevelopment", label: "Web Development" },
  { id: "graphicDesign", label: "Graphic Design" },
  { id: "digitalArt", label: "Digital Art" },
  { id: "musicProduction", label: "Music Production" },
  { id: "filmMaking", label: "Film Making" },
  { id: "fashionDesign", label: "Fashion Design" },
  { id: "painting", label: "Painting" },
  { id: "creativeWriting", label: "Creative Writing" },
  { id: "jewelryMaking", label: "Jewelry Making" },
  { id: "theater", label: "Theater" },
  { id: "sculpture", label: "Sculpture" },
  { id: "ceramics", label: "Ceramics" },
  { id: "woodworking", label: "Woodworking" },
  { id: "printmaking", label: "Printmaking" },
]

interface InterestsFormProps {
  data: {
    interests: string[]
  }
  updateData: (data: Partial<{ interests: string[] }>) => void
}

export default function InterestsForm({ data, updateData }: InterestsFormProps) {
  const [interests, setInterests] = useState<string[]>(data.interests)
  const [customInterest, setCustomInterest] = useState("")

  const handleInterestChange = (interest: string, checked: boolean) => {
    let updatedInterests: string[]
    if (checked) {
      updatedInterests = [...interests, interest]
    } else {
      updatedInterests = interests.filter((i) => i !== interest)
    }
    setInterests(updatedInterests)
    updateData({ interests: updatedInterests })
  }

  const handleAddCustomInterest = () => {
    if (customInterest && !interests.includes(customInterest)) {
      const updatedInterests = [...interests, customInterest]
      setInterests(updatedInterests)
      updateData({ interests: updatedInterests })
      setCustomInterest("")
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Select your interests</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interestOptions.map((interest) => (
          <div key={interest.id} className="flex items-center space-x-2">
            <Checkbox
              id={interest.id}
              checked={interests.includes(interest.id)}
              onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
            />
            <Label
              htmlFor={interest.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {interest.label}
            </Label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Label htmlFor="customInterest" className="text-sm font-medium">
          Add a custom interest
        </Label>
        <div className="flex mt-1">
          <Input
            id="customInterest"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            className="flex-grow"
            placeholder="Enter a custom interest"
          />
          <Button type="button" onClick={handleAddCustomInterest} className="ml-2">
            Add
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Label className="text-sm font-medium">Selected Interests</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {interests.map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-base"
                onClick={() => handleInterestChange(interest, false)}
              >
                ×
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

