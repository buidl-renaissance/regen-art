import { NextResponse } from 'next/server'
import { getEvents, insertEvent } from '../../../lib/db'
import { writeFile } from 'fs/promises'
import { join } from 'path'

// This would be replaced with actual SDK implementations
const publishToEventbrite = async (eventData: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Published to Eventbrite:', eventData)
  return { success: true, eventbriteId: 'eb_' + Math.random().toString(36).substr(2, 9) }
}

const publishToLuma = async (eventData: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Published to Luma:', eventData)
  return { success: true, lumaId: 'luma_' + Math.random().toString(36).substr(2, 9) }
}

const publishToBlockchain = async (eventData: any) => {
  // Simulate blockchain API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  const hash = 'bch_' + Math.random().toString(36).substr(2, 32)
  console.log('Published to Blockchain:', eventData)
  return { success: true, blockchainHash: hash }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const eventData = Object.fromEntries(formData as unknown as Iterable<[string, string]>)
    
    let eventbriteResult = null
    let lumaResult = null

    if (eventData.publishToEventbrite === 'true') {
      eventbriteResult = await publishToEventbrite(eventData)
      eventData.eventbriteId = eventbriteResult.eventbriteId
    }

    if (eventData.publishToLuma === 'true') {
      lumaResult = await publishToLuma(eventData)
      eventData.lumaId = lumaResult.lumaId
    }

    // Always publish to blockchain
    const blockchainResult = await publishToBlockchain(eventData)
    eventData.blockchainHash = blockchainResult.blockchainHash

    // Handle image upload
    const image = formData.get('image') as File
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const path = join(process.cwd(), 'public', 'uploads', `${Date.now()}_${image.name}`)
      await writeFile(path, buffer)
      eventData.imagePath = `/uploads/${path.split('/').pop()}`
    }

    // Save to local database
    const eventId = await insertEvent(eventData)

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      eventId,
      eventbriteResult,
      lumaResult,
      blockchainResult
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json({ success: true, events })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

