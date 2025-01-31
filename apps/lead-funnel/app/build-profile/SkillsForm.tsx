import { useState } from "react"
import { Label } from "@/components/ui/label"
import { InlineSearchSelect } from "../components/InlineSearchSelect"

const skillOptions = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "AWS",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "Data Analysis",
  "DevOps",
  "Cybersecurity",
  "Network Administration",
  "Real Estate Appraisal",
  "Property Management",
  "Construction Project Management",
  "Building Code Compliance",
  "Contract Negotiation",
  "Cost Estimation",
  "CAD/BIM",
  "Sustainable Building Practices",
]

interface SkillsFormProps {
  data: {
    skills: string[]
  }
  updateData: (data: Partial<{ skills: string[] }>) => void
}

export default function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data.skills)

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills)
    updateData({ skills: newSkills })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="skills">Skills</Label>
        <InlineSearchSelect
          options={skillOptions}
          value={skills}
          onChange={handleSkillsChange}
          placeholder="Search or add skills..."
        />
      </div>
    </div>
  )
}

