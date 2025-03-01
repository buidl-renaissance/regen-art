import { NobleEd25519Signer } from "@farcaster/hub-nodejs";

export async function generateWarpcastAuthToken(privateKey: string, publicKey: string, fid: number) {
  const signer = new NobleEd25519Signer(new Uint8Array(Buffer.from(privateKey, 'hex')));

  const header = {
    t: "eip191",
    fid,
    pk: publicKey,
  };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');

  const payload = {
    method: "publishCast",
    params: {
      fid,
      network: "FARCASTER_NETWORK",
    },
    exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

  const messageToSign = `${encodedHeader}.${encodedPayload}`;
  const signatureResult = await signer.signMessageHash(Buffer.from(messageToSign, 'utf-8'));
  
  if (signatureResult.isErr()) {
    throw new Error("Failed to sign Warpcast auth message");
  }

  const encodedSignature = Buffer.from(signatureResult.value).toString("base64url");

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function publishToFarcaster(text: string, privateKey: string, publicKey: string, fid: number) {
  try {
    // Generate auth token
    const authToken = await generateWarpcastAuthToken(privateKey, publicKey, fid);

    // Prepare cast data
    const castData = {
      text: text,
      embeds: [],
      embedsDeprecated: [],
      mentions: [],
      mentionsPositions: [],
      parent: null,
    };

    // Make API request to publish cast
    const response = await fetch('https://api.warpcast.com/v2/casts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(castData)
    });

    if (!response.ok) {
      throw new Error(`Failed to publish cast: ${response.statusText}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error publishing to Farcaster:', error);
    throw error;
  }
}

