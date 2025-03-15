import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"

interface BasicInfoFormProps {
  data: {
    name: string
    handle: string
    bio: string
    socialConnection: "instagram" | "linkedin" | "skip" | null
  }
  updateData: (data: Partial<{ name: string; handle: string; bio: string }>) => void
}

export default function BasicInfoForm({ data, updateData }: BasicInfoFormProps) {
  return (
    <div className="space-y-4">
      {data.socialConnection && data.socialConnection !== "skip" && (
        <p className="text-sm text-gray-600 mb-4">
          We've pre-filled some information based on your {data.socialConnection} profile. Feel free to edit or add more
          details.
        </p>
      )}
      <div>
        <Label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="Enter your name"
          required
        />
        {/* <p className="text-sm text-gray-500 mt-1">Your name is required.</p> */}
      </div>
      <div>
        <Label htmlFor="handle">
          Handle <span className="text-red-500">*</span>
        </Label>
        <Input
          id="handle"
          value={data.handle}
          onChange={(e) => updateData({ handle: e.target.value })}
          placeholder="Enter your unique handle"
          required
        />
        {/* <p className="text-sm text-gray-500 mt-1">Your unique handle is required (e.g., @username).</p> */}
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder="Tell us about yourself"
          rows={6}
        />
      </div>
    </div>
  )
}

