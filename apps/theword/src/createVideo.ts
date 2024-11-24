import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

async function createVideoFromImageAndAudio(imagePath: string, audioPath: string, outputPath: string): Promise<void> {
  try {
    const ffmpegCommand = `ffmpeg -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest "${outputPath}"`;
    
    await execAsync(ffmpegCommand);
    console.log(`Video created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
}

// Usage example:
// const imagePath = path.join(__dirname, 'path/to/image.jpg');
// const audioPath = path.join(__dirname, 'path/to/audio.mp3');
// const outputPath = path.join(__dirname, 'output/video.mp4');
// createVideoFromImageAndAudio(imagePath, audioPath, outputPath);
