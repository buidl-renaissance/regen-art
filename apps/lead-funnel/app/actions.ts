'use server';

import { saveProfile, getProfile as getProfileFromDb, getMembers as getMembersFromDb } from '@/lib/db';
import { z } from 'zod';

const subscriptionSchema = z.object({
  email: z.string().email('Invalid email address'),
  // name: z.string().min(2, "Name must be at least 2 characters"),
  // phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

export async function subscribeToEvents(prevState: any, formData: FormData) {
  const validatedFields = subscriptionSchema.safeParse({
    email: formData.get('email'),
    // name: formData.get('name'),
    // phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  // Here you would typically save the subscription to your database
  // and potentially trigger a welcome email
  // For this example, we'll just log the information
  console.log(`New subscription: ${email}`);

  // Simulate an API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "You've successfully subscribed to event notifications!",
    data: validatedFields.data,
  };
}

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  handle: z.string().min(2, 'Handle must be at least 2 characters'),
  bio: z.string().optional(),
  certifications: z.array(z.string()),
  skills: z.array(z.string()),
  creativePursuits: z.array(z.string()),
  groupFitnessActivities: z.array(z.string()),
  profile_picture: z.string().optional(),
});

const partialProfileSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  handle: z.string().min(2, 'Handle must be at least 2 characters'),
  bio: z.string().optional(),
  profile_picture: z.string().optional(),
});

export async function savePartialProfile(
  data: z.infer<typeof partialProfileSchema>
) {
  const validatedFields = partialProfileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, handle, bio, email, profile_picture } = validatedFields.data;

  // Here you would typically save the partial profile data to your database
  // For this example, we'll just log it
  console.log(`Saving partial profile for ${name} (${handle})`);
  console.log(`Bio: ${bio}`);

  // Simulate a delay to mimic database operation
  const response = await saveProfile({
    email,
    handle,
    name,
    bio,
    profile_picture,
  });

  return { success: true, profileId: response };
}

export const submitProfile = async (data: z.infer<typeof profileSchema>) => {
  const validatedFields = profileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    name,
    email,
    bio,
    certifications,
    skills,
    creativePursuits,
    groupFitnessActivities,
    handle,
    profile_picture,
  } = validatedFields.data;

  // Here you would typically update the user's profile in your database
  // For this example, we'll just log it
  console.log(`Updating profile for ${name} (${email})`);
  console.log(`Bio: ${bio}`);
  console.log(`Certifications: ${certifications.join(', ')}`);
  console.log(`Skills: ${skills.join(', ')}`);
  console.log(`Creative Pursuits: ${creativePursuits.join(', ')}`);
  console.log(`Group Fitness Activities: ${groupFitnessActivities.join(', ')}`);

  const response = await saveProfile({
    email,
    handle,
    name,
    bio,
    profile_picture: profile_picture || '',
    data: { 
      certifications, 
      skills, 
      creativePursuits, 
      groupFitnessActivities,
    },
  });

  return { success: true, profileId: response };
};

export const updateProfile = async (data: z.infer<typeof profileSchema>) => {
  return submitProfile(data);
};

export const getProfile = async (profileId: string) => {
  return getProfileFromDb(profileId);
};

export const getMembers = async () => {
  return getMembersFromDb();
};