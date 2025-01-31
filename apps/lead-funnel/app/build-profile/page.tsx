"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import BasicInfoForm from "./BasicInfoForm"
import InterestsForm from "./InterestsForm"
import ProfilePictureForm from "./ProfilePictureForm"
import SocialConnectForm from "./SocialConnectForm"
import { submitProfile } from "../actions"

const steps = ["Connect Social", "Bio", "Interests", "Profile Picture"]

export default function BuildProfilePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState({
    socialConnection: null as "instagram" | "linkedin" | "skip" | null,
    bio: "",
    interests: [] as string[],
    profilePicture: null as string | null,
  })
  const router = useRouter()

  const handleNext = () => {
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
    const result = await submitProfile(profileData)
    if (result.success) {
      router.push("/profile")
    } else {
      console.error("Error submitting profile:", result.errors)
      // Handle error (e.g., show error message to user)
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
        return <BasicInfoForm data={profileData} updateData={updateProfileData} />
      case 2:
        return <InterestsForm data={profileData} updateData={updateProfileData} />
      case 3:
        return <ProfilePictureForm data={profileData} updateData={updateProfileData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Build Your Profile</CardTitle>
          <CardDescription className="text-center mt-2">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-6" />
          {renderStep()}
          {currentStep > 0 && (
            <div className="flex justify-between mt-6">
              <Button onClick={handlePrevious}>Previous</Button>
              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit}>Finish</Button>
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

