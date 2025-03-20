import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION!,
  endpoint: process.env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'true'
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.AWS_S3_BUCKET || !process.env.AWS_ENDPOINT) {
      console.error('Missing required environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Create temp directory if it doesn't exist
    const tempDir = join(process.cwd(), 'tmp');
    try {
      await mkdir(tempDir, { recursive: true });
    } catch (error) {
      console.log('Temp directory already exists or cannot be created');
    }

    // Get form data from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get file data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a temporary file
    const tempFilePath = join(tempDir, uuidv4());
    await writeFile(tempFilePath, buffer);

    // Detect file type from mimetype
    const mimeType = file.type || '';
    if (!mimeType.match(/^(image\/jpeg|image\/jpg|image\/png|video\/.*)/)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG/PNG images and videos are allowed.' }, 
        { status: 400 }
      );
    }

    // Generate appropriate folder and extension based on type
    const isVideo = mimeType.startsWith('video/');
    const folder = isVideo ? 'videos' : 'images';
    const extension = isVideo ? mimeType.split('/')[1] : mimeType.includes('png') ? 'png' : 'jpg';

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${folder}/${uniqueSuffix}.${extension}`;

    // Upload to S3 with public-read ACL
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
      Body: buffer,
      ContentType: mimeType,
      ACL: 'public-read', // Make object publicly readable
    });

    await s3Client.send(command);

    // Return the DigitalOcean Spaces URL
    const url = `${process.env.AWS_ENDPOINT}/${process.env.AWS_S3_BUCKET}/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
