export interface ArtworkItem {
  title: string;
  filename?: string;
  url: string;
  description: string;
  category: string;
}

export interface TattooItem extends ArtworkItem {
  category: string;
}
