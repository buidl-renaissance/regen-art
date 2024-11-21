import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { getProperty, Property } from '@gods.work/web3';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        (async () => {
            const property = await getProperty('0x06a3D2Fe63BB7197E96B9C5173E8a740AAC16F58', id as unknown as number);
            console.log('property: ', property);
            setProperty(property);
            setLoading(false);
        })();
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Property not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <div className="relative h-[400px]">
          {property.images[0] && (
            <Image
              src={property.images[0]}
              alt={property.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
        </div> */}
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{property.location}</h1>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">IPFS Hash</h2>
            <p className="text-gray-600">{property.ipfsHash}</p>
          </div>

          <button 
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {/* Add contact functionality */}}
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
}
