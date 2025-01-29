import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const eventOptions = [
  { id: 'dj', label: '🎧 Open Decks/DJ Practice' },
  { id: 'movie', label: '🎬 Movie Night/Game Night' },
  { id: 'artWorkshop', label: '🖌️ Art Workshops (Tie-Dye, Acrylic/Oil Painting)' },
  { id: 'drawing', label: '🎨 Open Drawing/Figure Drawing' },
  { id: 'crafts', label: '🛠️ Arts, Crafts & Other Workshops' },
  { id: 'vr', label: '🌐 VR Experiences' },
  { id: 'dinner', label: '🍽️ Dinner Nights' },
  { id: 'hack', label: '💻 Hack Nights' },
  { id: 'drum', label: '🥁 Drum Circles' },
]

export type EventPreferences = {
  [key: string]: boolean | string
  customIdea?: string
}

interface EventPreferencesProps {
  preferences: EventPreferences
  onChange: (preferences: EventPreferences) => void
}

export function EventPreferences({ preferences, onChange }: EventPreferencesProps) {
  const handleCheckboxChange = (id: string, checked: boolean) => {
    onChange({ ...preferences, [id]: checked })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {eventOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={preferences[option.id] as boolean || false}
              onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
            />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </div>
      <div className="space-y-2 mt-4">
        <Label htmlFor="customIdea">Have another idea? Tell us about it!</Label>
        <Textarea
          id="customIdea"
          value={preferences.customIdea as string || ''}
          onChange={(e) => onChange({ ...preferences, customIdea: e.target.value })}
          placeholder="Share your ideas for events or activities..."
          className="h-24"
        />
      </div>
      <p className="text-sm text-gray-600">Whether you're looking to learn, share, or just have fun, our space is here for you. Share your preferences, and let's build an inspiring calendar together!</p>
    </div>
  )
}

