export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  image: string;
  description: string;
  medium: string;
  dimensions: string;
  exhibition: string;
  location: string;
}

export interface Artist {
  id: number;
  name: string;
  slug: string;
  profile_picture: string;
  bio: string;
  image: string;
  description: string;
  specialties: string[];
  education: string;
  notableWorks: string[];
  contact: string;
}
