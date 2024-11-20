import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { getPropertyDetailsClient, Property } from '@gods.work/web3';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        (async () => {
            const property = await getPropertyDetailsClient('0xB15d7fba336BC916EE14864F04FafC9295926577', id as unknown as number);
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
          <p className="text-2xl font-semibold text-green-600">
            ${property.price.toLocaleString()}
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{property.description}</p>
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
