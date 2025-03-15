'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { ReloadIcon } from "@radix-ui/react-icons"
import { updateProfile } from '../actions'
import { InlineSearchSelect } from '../components/InlineSearchSelect'
import { getProfile } from '../actions'
import ProfilePictureForm from '../build-profile/ProfilePictureForm'

const certifications = [
  "AWS Certified Solutions Architect",
  "Certified Information Systems Security Professional (CISSP)",
  "Project Management Professional (PMP)",
  "Certified Ethical Hacker (CEH)",
  "Cisco Certified Network Associate (CCNA)",
  "CompTIA A+",
  "Microsoft Certified: Azure Administrator Associate",
  "Certified Information Systems Auditor (CISA)",
  "Certified Cloud Security Professional (CCSP)",
  "ITIL Foundation",
  "Real Estate License",
  "General Contractor License",
  "LEED Accredited Professional",
  "Certified Construction Manager (CCM)",
  "Home Inspector Certification",
]

const skills = [
  "JavaScript", "Python", "React", "Node.js", "AWS", "Docker", "Kubernetes",
  "Machine Learning", "Data Analysis", "DevOps", "Cybersecurity",
  "Network Administration", "Real Estate Appraisal", "Property Management",
  "Construction Project Management", "Building Code Compliance",
  "Contract Negotiation", "Cost Estimation", "CAD/BIM",
  "Sustainable Building Practices",
]

const creativePursuits = [
  "Painting", "Photography", "Sculpture", "Digital Art", "Music Production",
  "Graphic Design", "Film Making", "Creative Writing", "Dance", "Theater",
  "Fashion Design", "Ceramics", "Woodworking", "Jewelry Making", "Printmaking",
]

const groupFitnessActivities = [
  "Yoga", "Pilates", "Zumba", "Spinning", "CrossFit", "HIIT", "Bootcamp",
  "Kickboxing", "Barre", "TRX", "Climbing", "Running", "Hockey", "Tennis",
  "Skating", "Soccer", "Ultimate", "Golf",
]

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [profilePicture, setProfilePicture] = useState<string>('')
  const [userCertifications, setUserCertifications] = useState<string[]>([])
  const [userSkills, setUserSkills] = useState<string[]>([])
  const [userCreativePursuits, setUserCreativePursuits] = useState<string[]>([])
  const [userGroupFitnessActivities, setUserGroupFitnessActivities] = useState<string[]>([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // Simulate fetching user data
        const profileId = localStorage.getItem('profileId')
        if (profileId) {
          const profile = await getProfile(profileId)
          setName(profile.name)
          setHandle(profile.handle)
          setEmail(profile.email)
          setBio(profile.bio)
          setProfilePicture(profile.profile_picture)
          setUserCertifications(profile.data?.certifications || [])
          setUserSkills(profile.data?.skills || [])
          setUserCreativePursuits(profile.data?.creativePursuits || [])
          setUserGroupFitnessActivities(profile.data?.groupFitnessActivities || [])
        } else {
          router.push('/join')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError('Failed to load user data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    try {
      const result = await updateProfile({ 
        name, 
        email,   
        bio, 
        handle,
        profile_picture: profilePicture || undefined,
        certifications: userCertifications, 
        skills: userSkills,
        creativePursuits: userCreativePursuits,
        groupFitnessActivities: userGroupFitnessActivities
      })
      if (result.success) {
        console.log('Profile updated successfully')
      } else {
        setError(result.errors ? Object.values(result.errors).flat()[0] : 'An error occurred while updating your profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center">
        <ReloadIcon className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your Profile</CardTitle>
          <CardDescription className="text-center mt-2">Update your member information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-6">
              <ProfilePictureForm 
                data={{ profile_picture: profilePicture }} 
                updateData={(data) => setProfilePicture(data.profile_picture || '')} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle">Handle</Label>
              <Input
                id="handle"
                name="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="space-y-2">
              <Label>Certifications</Label>
              <InlineSearchSelect
                options={certifications}
                value={userCertifications}
                onChange={setUserCertifications}
                placeholder="Search or add certifications..."
              />
            </div>
            <div className="space-y-2">
              <Label>Skills</Label>
              <InlineSearchSelect
                options={skills}
                value={userSkills}
                onChange={setUserSkills}
                placeholder="Search or add skills..."
              />
            </div>
            <div className="space-y-2">
              <Label>Creative Pursuits</Label>
              <InlineSearchSelect
                options={creativePursuits}
                value={userCreativePursuits}
                onChange={setUserCreativePursuits}
                placeholder="Search or add creative pursuits..."
              />
            </div>
            <div className="space-y-2">
              <Label>Group Fitness Activities</Label>
              <InlineSearchSelect
                options={groupFitnessActivities}
                value={userGroupFitnessActivities}
                onChange={setUserGroupFitnessActivities}
                placeholder="Search or add group fitness activities..."
              />
            </div>
            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
