import { getProfile, saveProfile } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Profile ID is required' },
        { status: 400 }
      );
    }

    const profile = await getProfile(id);
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error getting profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email, handle, name, bio, data } = await req.json();

    const profileId = await saveProfile({ email, handle, name, bio, data });
    console.log('Profile saved:', profileId);
    const profile = await getProfile(profileId);

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error capturing email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to capture email and preferences' },
      { status: 500 }
    );
  }
}
