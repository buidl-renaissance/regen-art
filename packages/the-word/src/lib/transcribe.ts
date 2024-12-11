import * as fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

export const transcribeAudio = async (audioFilePath: string): Promise<string> => {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioFilePath),
    model: "whisper-1",
  });

  console.log(transcription.text);

  return transcription.text;
};

export const transcribeAudioFromUrl = async (audioUrl: string): Promise<string> => {
  // Download the file to a temporary location
  const response = await fetch(audioUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create temporary file
  const tempFilePath = `/tmp/${Date.now()}.m4a`;
  fs.writeFileSync(tempFilePath, buffer);

  try {
    // Transcribe the downloaded file
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-1",
    });

    return transcription.text;
  } finally {
    // Clean up temporary file
    fs.unlinkSync(tempFilePath);
  }
};

export const transcribeAudioStream = async (audioStream: NodeJS.ReadableStream): Promise<string> => {
  // Create temporary file to store the stream
  const tempFilePath = `/tmp/${Date.now()}.m4a`;
  const writeStream = fs.createWriteStream(tempFilePath);

  // Write stream to temporary file
  await new Promise((resolve, reject) => {
    audioStream.pipe(writeStream)
      .on('finish', resolve)
      .on('error', reject);
  });

  try {
    // Transcribe the temporary file
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-1",
    });

    return transcription.text;
  } finally {
    // Clean up temporary file
    fs.unlinkSync(tempFilePath);
  }
};

