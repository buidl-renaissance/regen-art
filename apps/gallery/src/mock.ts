import { Artwork } from "./types";

export const getArtwork = (id: number): Artwork | undefined => {
  return artworks.find((artwork) => artwork.id === id);
};

export const artworks = [
  {
    id: 1,
    title: "Journey of the Heart",
    artist: "Daniel Geanes | ECNTRC, Andrea Burg, Munera Ziad Kaakouch",
    year: "2024",
    image:
      "https://nyc3.digitaloceanspaces.com/dpop/images/1740711833455-618073127.jpg",
    description:
      "This surreal landscape depicts a lone traveler standing atop the curves of a woman's body, seamlessly blending with the earth’s contours. The figure proudly waves a flag adorned with a heart, symbolizing a journey of love and self-discovery. Set against a backdrop of lush greens and dreamy cloud formations, the scene exudes a sense of hope and exploration. Ethereal golden swirls dance among the clouds, symbolizing the unseen energies guiding the traveler's journey. The flowing, fluid strokes evoke movement and emotion, as vibrant yellows and blues melt into one another. This painting beautifully captures the essence of adventure, love, and the pursuit of purpose, inviting viewers to reflect on the interconnectedness of humanity and nature. It celebrates the divine feminine form as a powerful symbol of creation, growth, and emotional exploration.",
    medium: "Acrylic on Canvas",
    dimensions: "24\" x 36\"",
    exhibition: "Art Night Detroit 2024",
    location: "SPOTLITE, DETROIT, MI",
  },
  {
    id: 2,
    title: "Visions of the Divine",
    artist: "Daniel Geanes | ECNTRC, WiredInSamurai, Nathan Karinen, Andrea Burg, Munera Ziad Kaakouch, Escada 'DARKLORD' Gordon",
    year: "2025",
    image:
      "https://nyc3.digitaloceanspaces.com/dpop/images/1740711844597-428880793.jpg",
    description:
      "This vibrant piece captures the mystical presence of a spiritual guardian, adorned with a crown of blooming flowers and a third eye symbolizing heightened perception and wisdom. Painted with fluid, organic strokes and a lush palette of greens, blues, and oranges, the figure emerges from a dreamlike landscape where nature and consciousness intertwine. Radiating lines and celestial symbols weave through the background, creating a dynamic flow of energy and emotion. A playful smiley face subtly contrasts the profound gaze of the guardian, inviting viewers to reflect on the balance between the whimsical and the divine. This artwork beautifully embodies a journey of self-discovery and cosmic connection.",
    medium: "Acrylic on Canvas",
    dimensions: "36\" x 48\"",
    exhibition: "Art Night Detroit 2025",
    location: "Lincoln Factory – DETROIT, MI",
  },
  {
    id: 3,
    title: "Collective Dreams",
    artist: "An Unknown Collective",
    year: "2025",
    image:
      "https://nyc3.digitaloceanspaces.com/dpop/images/1740711455969-164161771.jpg",
    description:
      "This vibrant, eclectic piece is a kaleidoscope of imagination, born from the collaborative energy of Art Night. Bursting with color and playful symbolism, it weaves together a tapestry of hearts, clouds, eyes, and smiley faces, all interconnected by bold lines and patterns. The joyous sun radiates beams of positivity, while whimsical clouds dance with expressive faces, capturing a spectrum of emotions. Layers of geometric shapes and flowing ribbons create a dynamic sense of movement, inviting viewers to explore the many stories within. This artwork beautifully embodies the spirit of community and creativity, celebrating the unity of diverse voices coming together to express their visions in harmony.",
    medium: "Mixed Media on Paper",
    dimensions: "18\" x 24\"",
    exhibition: "Art Night Detroit 2025 - Starting a Revolution at Stu 202",
    location: "Russell Industrial Center – DETROIT, MI",
  },
  {
    id: 4,
    title: "Buidlers Unite IRL at ETH DENVER",
    artist: "A Collective of Regens",
    year: "2025",
    image: "https://nyc3.digitaloceanspaces.com/dpop/images/1740843201612-904402412.jpg",
    description:
      "A collaborative artwork created at ETH Denver, capturing the intersection of art, blockchain, and community. The canvas is filled with colorful sketches, decentralized tech references, and expressions of creativity, symbolizing the shared ethos of building, innovation, and artistic empowerment. Featuring Ethereum-inspired imagery, phrases like 'BUIDL' and 'Hack on Brother!', and nods to the Detroit creative scene (313), this piece embodies the fusion of Web3 culture and grassroots artistic collaboration.",
    medium: "Marker on Paper",
    dimensions: "18\" x 24\"",
    exhibition: "Art Night Denver 2025 - ETH DENVER",
    location: "WESTERN NATIONAL CONVENTION CENTER – DENVER, CO",
  },
  {
    id: 5,
    title: "Wings of Hope: LA Relief & Resilience",
    artist: "Munera Ziad Kaakouch",
    description:
      "Created for a fundraiser supporting victims of the LA fires, this powerful painting by Munera Ziad symbolizes resilience, hope, and unity. The bold 'LA' is uplifted by golden wings, representing the strength of a community rising above hardship. Set against a cool blue mosaic background, the piece conveys both the fragility and endurance of those affected, echoing the spirit of collective support and renewal. This artwork stands as a tribute to those rebuilding their lives, embodying the message that through solidarity, we can all help each other rise.",
    medium: "Acrylic, Gold Leaf on Canvas",
    dimensions: "24\" x 36\"",
    exhibition: "LA Fundraiser at Playground Detroit",
    location: "DETROIT, MI",
    year: "2025",
    image: "https://nyc3.digitaloceanspaces.com/dpop/images/1740843201612-904402412.jpg",
  },
];

export const getArtist = (id: number) => {
  return artists.find((artist) => artist.id === id);
};

export const artists = [
  {
    id: 1,
    name: "Daniel Geanes | ECNTRC",
    slug: "ecentrc",
    profile_picture: "https://dpop.nyc3.digitaloceanspaces.com/eccentricdanny.jpg",
    bio: "Hi, I am Danny 🔴 Grind 4 Everything\nArtist | Marketing Strategist | Writer\nCOMMUNITY\nMATTHEW 5:16",
    image: "https://dpop.nyc3.digitaloceanspaces.com/eccentricdanny.jpg",
    description: "Daniel Geanes, known professionally as ECNTRC, is a multidisciplinary artist and marketing strategist based in Detroit. His work spans digital art, brand development, and community building initiatives.",
    specialties: ["Digital Art", "Brand Strategy", "Community Building"],
    education: "Bachelor's in Marketing and Digital Media, Wayne State University",
    notableWorks: [
      "Detroit Community Art Project 2022",
      "Digital Brand Evolution Series",
      "Urban Storytelling Initiative"
    ],
    contact: "daniel.geanes@ecntrc.com"
  },
  {
    id: 2,
    name: "WiredInSamurai",
    slug: "wiredinsamurai",
    profile_picture: "https://dpop.nyc3.digitaloceanspaces.com/wiredinsamurai.jpg",
    bio: '"Technology Artist"',
    image: "https://dpop.nyc3.digitaloceanspaces.com/wiredinsamurai.jpg",
    description: "WiredInSamurai is a pioneering technology artist who combines digital innovation with traditional artistic techniques. Their work explores the intersection of technology and human experience.",
    specialties: ["Digital Art", "Technology Integration", "Interactive Installations"],
    education: "Self-taught Digital Artist",
    notableWorks: [
      "Cyber Fusion Series",
      "Digital Meditation Space",
      "Tech-Nature Harmony Project"
    ],
    contact: "contact@wiredinsamurai.art"
  },
  {
    id: 3,
    name: "Nathan Karinen",
    slug: "nathankarinen",
    profile_picture: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739515780249-172114132.jpg",
    bio: "Artist & Graphic Designer | DJ and Producer | Detroit MI. Creator of @artnightdetroit Follow my business page @nk_artist_and_designer",
    image: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739515780249-172114132.jpg",
    description: "Nathan Karinen is a multifaceted artist from Detroit, combining visual arts with music production. His work bridges the gap between graphic design and sonic experiences.",
    specialties: ["Graphic Design", "Music Production", "Event Curation"],
    education: "BFA in Graphic Design, College for Creative Studies",
    notableWorks: [
      "Art Night Detroit Series",
      "Sound & Vision Exhibition",
      "Detroit Beat Collection"
    ],
    contact: "nathan@nkartistdesigner.com"
  },
  {
    id: 4,
    name: "Andrea 🐊 Burg",
    slug: "burgink",
    profile_picture: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739516638587-546917813.jpg",
    bio: "Illustrative artist~ inspired by life and 🌍",
    image: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739516638587-546917813.jpg",
    description: "Andrea Burg is an illustrative artist whose work is deeply influenced by nature and global cultures. Her pieces often feature vibrant colors and intricate details that celebrate life's diversity.",
    specialties: ["Illustration", "Nature Art", "Mixed Media"],
    education: "MFA in Illustration, Savannah College of Art and Design",
    notableWorks: [
      "Global Wildlife Series",
      "Urban Nature Collection",
      "Earth Stories Exhibition"
    ],
    contact: "andrea@burgink.com"
  },
  {
    id: 5,
    name: "Munera Ziad Kaakouch",
    slug: "mzkpaints",
    profile_picture: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739516692862-532593150.jpg",
    bio: "Detroit Artist",
    image: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739516692862-532593150.jpg",
    description: "Munera Ziad Kaakouch is a contemporary artist based in Detroit, known for her bold artistic expressions that reflect urban life and cultural identity.",
    specialties: ["Painting", "Urban Art", "Contemporary"],
    education: "BFA in Studio Art, University of Michigan",
    notableWorks: [
      "Detroit Streets Series",
      "Cultural Identity Collection",
      "Modern Heritage Exhibition"
    ],
    contact: "munera@mzkpaints.com"
  },
  {
    id: 6,
    name: 'Escada " DARKLORD " Gordon',
    slug: "darklord-escada",
    profile_picture: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739521868478-620596123.jpg",
    bio: "•designer • cartoonist • comedy writer\n•musician • film\nContact: Darklordflowershop@gmail.com\n·\n.\n#ESCADAGORDON",
    image: "https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739521868478-620596123.jpg",
    description: "Escada 'DARKLORD' Gordon is a versatile creative force, working across multiple mediums including design, cartoons, comedy writing, and music. Their work often combines humor with sharp social commentary.",
    specialties: ["Cartoon Art", "Comedy Writing", "Music Production", "Film"],
    education: "Film and Animation, Detroit Institute of Arts",
    notableWorks: [
      "Dark Comedy Cartoon Series",
      "Underground Music Collection",
      "Multimedia Social Commentary Project"
    ],
    contact: "Darklordflowershop@gmail.com"
  }
];
