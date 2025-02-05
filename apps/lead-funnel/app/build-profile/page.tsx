"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import BasicInfoForm from "./BasicInfoForm"
import InterestsForm from "./InterestsForm"
import ProfilePictureForm from "./ProfilePictureForm"
import SocialConnectForm from "./SocialConnectForm"
import { submitProfile, savePartialProfile } from "../actions"
import { toast } from "@/components/ui/use-toast"
import { getEmail } from "@/lib/utils"

const steps = ["Connect Social", "Bio"]
// const steps = ["Connect Social", "Bio", "Interests", "Profile Picture"]

export default function BuildProfilePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState({
    email: getEmail(),
    socialConnection: null as "instagram" | "linkedin" | "skip" | null,
    name: "",
    handle: "",
    bio: "",
    interests: [] as string[],
    profile_picture: null as string | null,
    certifications: [] as string[],
    skills: [] as string[],
    creativePursuits: [] as string[],
    groupFitnessActivities: [] as string[]
  })
  const router = useRouter()

  useEffect(() => {
    const storedEmail = getEmail()
    if (!storedEmail) {
      router.push('/join')
      return
    }
    
    setProfileData(prev => ({
      ...prev,
      email: storedEmail
    }))
  }, [router])

  const handleNext = async () => {
    if (currentStep === 1) {
      // Save basic info before moving to the next step
      const result = await savePartialProfile({
        email: profileData.email,
        name: profileData.name,
        handle: profileData.handle,
        bio: profileData.bio,
        profile_picture: profileData.profile_picture ?? undefined,
      })
      if (result.success) {
        toast({
          title: "Profile information saved",
          description: "Your basic info has been saved successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to save profile information. Please try again.",
          variant: "destructive",
        })
        return
      }
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const result = await submitProfile({
      ...profileData,
      profile_picture: profileData.profile_picture ?? undefined
    })
    if (result.success) {
      const profileId = result.profileId;
      // Store profile ID in localStorage for later use
      localStorage.setItem('profileId', profileId.toString());

      router.push("/members")
    } else {
      console.error("Error submitting profile:", result.errors)
      toast({
        title: "Error",
        description: "Failed to submit profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateProfileData = (newData: Partial<typeof profileData>) => {
    setProfileData({ ...profileData, ...newData })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SocialConnectForm data={profileData} updateData={updateProfileData} onNext={handleNext} />
      case 1:
        return (
          <>
            <ProfilePictureForm data={profileData} updateData={updateProfileData} />
            <BasicInfoForm data={profileData} updateData={updateProfileData} />
          </>
        )
      // case 2:
      //   return (
      //     <InterestsForm data={profileData} updateData={updateProfileData} />
      //   )
      // case 3:
      //   return <ProfilePictureForm data={profileData} updateData={updateProfileData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Build Your Profile</CardTitle>
          {/* <CardDescription className="text-center mt-2">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          {/* <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-6" /> */}
          {renderStep()}
          {currentStep > 0 && (
            <div className="flex justify-end mt-6">
              {/* <Button variant="outline" onClick={handlePrevious}>Previous</Button> */}
              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit}>Submit</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

