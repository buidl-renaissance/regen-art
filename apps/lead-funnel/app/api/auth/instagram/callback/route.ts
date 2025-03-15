import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect("/build-profile?error=instagram_auth_failed")
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID!,
        client_secret: process.env.INSTAGRAM_APP_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
        code,
      }),
    })

    const { access_token, user_id } = await tokenResponse.json()

    // Fetch user profile information
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`,
    )
    const profile = await profileResponse.json()

    // Here you would typically save the user information to your database
    // For this example, we'll just redirect back to the profile builder with the data
    const userData = {
      name: profile.username, // Instagram doesn't provide full name, so we use username
      handle: `@${profile.username}`,
      instagramId: profile.id,
    }

    const userDataParam = encodeURIComponent(JSON.stringify(userData))
    return NextResponse.redirect(`/build-profile?instagram_data=${userDataParam}`)
  } catch (error) {
    console.error("Error in Instagram OAuth callback:", error)
    return NextResponse.redirect("/build-profile?error=instagram_auth_failed")
  }
}

