import { NextApiRequest, NextApiResponse } from 'next';
import { transcribeAudioFromUrl } from '@gods.work/the-word';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audioUrl } = req.body;

    if (!audioUrl) {
      return res.status(400).json({ error: 'No audio URL provided' });
    }

    // Transcribe the audio using the transcribe package
    const transcription = await transcribeAudioFromUrl(audioUrl);

    // Return the transcription
    return res.status(200).json({ transcription });

  } catch (error) {
    console.error('Error in transcription:', error);
    return res.status(500).json({ error: 'Error transcribing audio' });
  }
}
