import { CID } from "multiformats/cid";
import * as json from "multiformats/codecs/json";
import { sha256 } from "multiformats/hashes/sha2";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Bucket = "dpop"; // replace with your bucket name

const s3Client = new S3Client({
  endpoint: process.env.DO_ENDPOINT,
  region: "us-east-1", // DigitalOcean Spaces uses us-east-1
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY!,
    secretAccessKey: process.env.DO_SPACES_SECRET!,
  },
});

export const generate_cid = async (json_data: any) => {
  const data = typeof json_data === 'object' ? JSON.stringify(json_data) : json_data;
  const bytes = json.encode(data);
  const hash = await sha256.digest(bytes);
  const cid = CID.create(1, json.code, hash);
  return cid.toString();
};

export const upload = async (json_data: any) => {
  const data = JSON.stringify(json_data);

  const cid = await generate_cid(data);

  const objectName = cid; // File name which you want to put in s3 bucket
  const objectData = data;
  const objectType = "application/json"; // type of file

  // setup params for putObject
  const command = new PutObjectCommand({
    ACL: "public-read",
    Bucket: s3Bucket,
    Key: objectName,
    Body: objectData,
    ContentType: objectType,
  });
  const result = await s3Client.send(command);
  console.log(
    `File uploaded successfully at https:/` +
      s3Bucket +
      `.s3.do.com/` +
      objectName
  );
  return cid;
};

export default async function handler(req: any, res: any) {
  try {
    const cid = await upload(req.body);
    res.status(200).json({ cid });
  } catch (error) {
    console.log("error", error);
    res.status(422).json("error");
  }
}