import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
// const record = require('node-record-lpcm16');

// Set up the request configuration
const request = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  },
  interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('data', (data) =>
    console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`)
  )
  .on('error', console.error)
  .on('end', () => console.log('Stream ended.'));

// Start recording and send the microphone input to the Speech API
// record
//   .start({
//     sampleRateHertz: 16000,
//     threshold: 0,
//     verbose: false,
//     recordProgram: 'sox', // Try using 'rec' if you're having issues with sox
//     silence: '10.0',
//   })
//   .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');

// const speech = require('@google-cloud/speech');

// Creates a client using your credentials
// const client = new speech.SpeechClient();

async function quickstart() {
  // The path to the audio file
  const fileName = './ClaySt.wav';

  // Reads the audio file and converts it to base64
  const fs = require('fs');
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  // Configure the request
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription!: ${transcription}`);
}

quickstart();