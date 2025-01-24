import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, eventPreferences } = await req.json()

    // Here you would typically save the email and event preferences to your database
    // For this example, we'll just log it
    console.log(`Capturing lead: ${name} (${email})`)
    console.log('Event preferences:', eventPreferences)

    // Simulate a delay to mimic database operation
    await new Promise(resolve => setTimeout(resolve, 1000))

    // You might want to perform additional operations here, such as:
    // - Sending a welcome email with personalized event recommendations
    // - Creating a user account with preset preferences
    // - Adding the email to specific mailing lists based on preferences

    return NextResponse.json({ success: true, email })
  } catch (error) {
    console.error('Error capturing email:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to capture email and preferences' },
      { status: 500 }
    )
  }
}

