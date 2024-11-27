import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { getProperty, Property } from '@gods.work/web3';
import { TransferShares } from '@gods.work/ui';
import { transferShares } from '@gods.work/web3';
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

          <div>
            <h2 className="text-xl font-semibold mb-2">Shares Breakdown</h2>
            <div className="text-gray-600">
              <p>Total Shares: {property.totalShares}</p>
              {/* <p>Available Shares: {property.availableShares}</p>
              <p>Sold Shares: {property.totalShares - property.availableShares}</p> */}
              {property.stakeholders && property.stakeholders.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Shareholders:</p>
                  <ul className="list-disc pl-5">
                    {property.stakeholders.map((stakeholder, index) => (
                      <li key={index}>
                        {stakeholder}: {property.shares[index]} shares
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <TransferShares
            propertyId={property.propertyId}
            shareholders={property.stakeholders}
            shares={property.shares}
          />
        </div>
      </div>
    </div>
  );
}
