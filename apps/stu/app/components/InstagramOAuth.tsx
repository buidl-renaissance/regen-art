"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Instagram } from "lucide-react"

interface InstagramOAuthProps {
  onSuccess: (data: { name: string; handle: string; profile_picture: string }) => void
  onError: (error: string) => void
}

export function InstagramOAuth({ onSuccess, onError }: InstagramOAuthProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleInstagramLogin = async () => {
    setIsLoading(true)
    try {
      // Replace with your actual Instagram App ID and Redirect URI
      const instagramAppId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
      const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/instagram/callback`)
      const scope = "instagram_business_basic"

      const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${instagramAppId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`

      // Open Instagram authorization page
      window.location.href = authUrl
    } catch (error) {
      console.error("Error initiating Instagram OAuth:", error)
      onError("Failed to connect with Instagram. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleInstagramLogin} disabled={isLoading} className="flex items-center justify-center space-x-2">
      <Instagram className="w-5 h-5" />
      <span>{isLoading ? "Connecting..." : "Connect Instagram"}</span>
    </Button>
  )
}

