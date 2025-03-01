import { NextResponse } from "next/server";
import { getNFTArtwork } from "@/libs/web3/api";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const nftData = await getNFTArtwork(params.id);

  return NextResponse.json({
    title: `Latest NFT: ${nftData.title}`,
    image: nftData.image,
    buttons: [
      { label: "Tip", action: `https://art.gods.work/tip?nft=${nftData.id}` },
      { label: "Upload Content", action: `https://art.gods.work/upload?nft=${nftData.id}` }
    ]
  });
}
