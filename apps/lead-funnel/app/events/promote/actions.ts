'use server'

import { z } from 'zod'

const eventSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().datetime(),
  time: z.string(),
  location: z.string().min(2, "Location must be at least 2 characters"),
  category: z.string(),
  publishToEventbrite: z.boolean(),
  publishToLuma: z.boolean(),
})

export async function submitEvent(formData: FormData) {
  const validatedFields = eventSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    date: formData.get('date'),
    time: formData.get('time'),
    location: formData.get('location'),
    category: formData.get('category'),
    publishToEventbrite: formData.get('publishToEventbrite') === 'true',
    publishToLuma: formData.get('publishToLuma') === 'true',
  })

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors }
  }

  const imageFile = formData.get('image') as File | null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
      method: 'POST',
      body: formData, // Send the entire FormData object
    })

    if (!response.ok) {
      throw new Error('Failed to create event')
    }

    const result = await response.json()

    if (result.success) {
      return { 
        success: true, 
        eventId: result.eventId,
        blockchainHash: result.blockchainResult.blockchainHash
      }
    } else {
      return { success: false, error: result.error || 'An error occurred while creating the event' }
    }
  } catch (error) {
    console.error('Error creating event:', error)
    return { success: false, error: 'An error occurred while creating the event' }
  }
}

