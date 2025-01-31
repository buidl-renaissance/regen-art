import { Button } from "@/components/ui/button"
import { Instagram, Linkedin } from "lucide-react"

interface SocialConnectFormProps {
  data: {
    socialConnection: "instagram" | "linkedin" | "skip" | null
  }
  updateData: (data: Partial<{ socialConnection: "instagram" | "linkedin" | "skip" | null }>) => void
  onNext: () => void
}

export default function SocialConnectForm({ data, updateData, onNext }: SocialConnectFormProps) {
  const handleConnect = (platform: "instagram" | "linkedin") => {
    // Here you would typically initiate the OAuth flow for the selected platform
    // For this example, we'll just update the state and move to the next step
    updateData({ socialConnection: platform })
    onNext()
  }

  const handleSkip = () => {
    updateData({ socialConnection: "skip" })
    onNext()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-center">Connect your social media to get started</h2>
      <div className="flex flex-col space-y-4">
        <Button onClick={() => handleConnect("instagram")} className="flex items-center justify-center space-x-2">
          <Instagram className="w-5 h-5" />
          <span>Connect Instagram</span>
        </Button>
        <Button onClick={() => handleConnect("linkedin")} className="flex items-center justify-center space-x-2">
          <Linkedin className="w-5 h-5" />
          <span>Connect LinkedIn</span>
        </Button>
        <Button variant="outline" onClick={handleSkip}>
          Skip and create profile manually
        </Button>
      </div>
    </div>
  )
}

