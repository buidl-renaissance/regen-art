export const getArtwork = async (id: number) => {
  return artworks.find((artwork) => artwork.id === id);
};

export const artworks = [
  {
    id: 1,
    title: "Urban Metamorphosis",
    artist: "Sarah Chen & Marcus Rivera",
    year: "2023",
    image:
      "https://nyc3.digitaloceanspaces.com/dpop/images/1740711833455-618073127.jpg",
    description: "An exploration of urban transformation through mixed media, combining traditional painting techniques with digital elements. This piece reflects on the evolving nature of city landscapes and human adaptation.",
    medium: "Mixed Media on Canvas, Digital Projection",
    dimensions: "150cm x 200cm",
    exhibition: "Future Cities Exhibition",
    location: "Main Gallery"
  },
  {
    id: 2,
    title: "Digital Dreams",
    artist: "Alex Kim & Jordan Taylor", 
    year: "2023",
    image:
      "https://nyc3.digitaloceanspaces.com/dpop/images/1740711844597-428880793.jpg",
    description: "A collaborative digital artwork exploring the intersection of human consciousness and artificial intelligence, rendered through generative algorithms and hand-painted elements.",
    medium: "Digital Art, Acrylic on Canvas",
    dimensions: "100cm x 100cm",
    exhibition: "Digital Frontiers",
    location: "New Media Wing"
  },
  {
    id: 3,
    title: "Nature's Dialogue",
    artist: "Maya Patel & Chris Wong",
    year: "2023",
    image:
      "https://nyc3.digitaloceanspaces.com/dpop/images/1740711455969-164161771.jpg",
    description: "An immersive installation that brings together organic materials and digital projections to create a dialogue between nature and technology.",
    medium: "Mixed Media Installation, Natural Materials",
    dimensions: "300cm x 400cm",
    exhibition: "Organic Digital",
    location: "Installation Hall"
  },
];
