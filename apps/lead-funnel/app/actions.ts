'use server'

import { z } from 'zod'

const subscriptionSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
})

export async function subscribeToEvents(prevState: any, formData: FormData) {
  const validatedFields = subscriptionSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    interests: formData.getAll('interests'),
  })

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors }
  }

  const { email, name, interests } = validatedFields.data

  // Here you would typically save the subscription to your database
  // and potentially trigger a welcome email
  // For this example, we'll just log the information
  console.log(`New subscription: ${name} (${email})`)
  console.log(`Interests: ${interests.join(', ')}`)

  // Simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: true, message: "You've successfully subscribed to event notifications!" }
}

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  certifications: z.array(z.string()),
  skills: z.array(z.string()),
  creativePursuits: z.array(z.string()),
  groupFitnessActivities: z.array(z.string()),
})

export async function updateProfile(data: z.infer<typeof profileSchema>) {
  const validatedFields = profileSchema.safeParse(data)

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors }
  }

  const { name, email, bio, certifications, skills, creativePursuits, groupFitnessActivities } = validatedFields.data

  // Here you would typically update the user's profile in your database
  // For this example, we'll just log it
  console.log(`Updating profile for ${name} (${email})`)
  console.log(`Bio: ${bio}`)
  console.log(`Certifications: ${certifications.join(', ')}`)
  console.log(`Skills: ${skills.join(', ')}`)
  console.log(`Creative Pursuits: ${creativePursuits.join(', ')}`)
  console.log(`Group Fitness Activities: ${groupFitnessActivities.join(', ')}`)

  // Simulate a delay to mimic database operation
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: true }
}

