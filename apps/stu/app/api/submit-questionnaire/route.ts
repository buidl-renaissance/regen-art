import { NextResponse } from 'next/server';
import { saveQuestionnaireResponse } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { email, eventPreferences } = await req.json();

    // Store questionnaire response in database
    await saveQuestionnaireResponse(email, eventPreferences);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting questionnaire:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit questionnaire' },
      { status: 500 }
    );
  }
}
