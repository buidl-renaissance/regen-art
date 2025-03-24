import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAllNFTArtwork } from "../libs/web3/api";

export const metadata: Metadata = {
  title: "A Regenerative Art Collective",
  description: "A Community Gallery & Creative Agency showcasing collaborative works and providing art curation, creative consulting, and project management services.",
  openGraph: {
    title: "A Regenerative Art Collective",
    description: "A Community Gallery & Creative Agency showcasing collaborative works and providing art curation, creative consulting, and project management services.",
    images: [
      {
        url: "/digital-renaissance-hands.jpeg",
        width: 1200,
        height: 630,
        alt: "Regenerative Art Collective",
      },
    ],
  },
};

export default async function Home() {
  const artworks = await getAllNFTArtwork();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/digital-renaissance-hands.jpeg" 
            alt="Collaborative Art Piece"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
            A Regenerative Art Collective
          </h1>
          <p className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-200 mb-8">
            Community Gallery & Creative Agency
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#gallery" className="px-8 py-3 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 rounded-full hover:opacity-90 transition">
              View Gallery
            </a>
            <a href="#services" className="px-8 py-3 border-2 border-neutral-900 dark:border-neutral-50 text-neutral-900 dark:text-neutral-50 rounded-full hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-50">
          Collaborative Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {artworks.map((item) => (
            <Link 
              key={item.id} 
              href={`/artwork/${item.id}`}
              className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/artwork/create" className="px-8 py-3 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 rounded-full hover:opacity-90 transition">
            Submit A Collaboration
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-50">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-neutral-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Art Curation</h3>
              <p className="text-neutral-700 dark:text-neutral-200">Expert curation services for galleries, corporate spaces, and private collections.</p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Creative Consulting</h3>
              <p className="text-neutral-700 dark:text-neutral-200">Strategic creative direction and project management for artistic ventures.</p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Collaborative Projects</h3>
              <p className="text-neutral-700 dark:text-neutral-200">Facilitating artistic collaborations and community-driven creative initiatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-50">
            Let&apos;s Create Together
          </h2>
          <p className="text-lg mb-8 text-neutral-700 dark:text-neutral-200">
            Join our collective or collaborate with us on your next creative project.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 rounded-full hover:opacity-90 transition">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
