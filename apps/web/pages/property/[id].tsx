import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { getProperty, Property } from '@gods.work/web3';
import { TransferShares } from '@gods.work/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import { Box } from '@mui/material';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        const property = await getProperty(
          '0xc36d046616Ae801F1caaEBBb87f1Ca370A2485aa',
          id as unknown as number
        );
        console.log('property: ', property);
        setProperty(property);
        setLoading(false);
      })();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Property not found
      </div>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
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
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h2" color="text.primary">
                  {property.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.description}
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    <p className="text-sm font-medium">Property Type</p>
                    <p>{property.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Number of Units</p>
                    <p>{property.units}</p>
                  </div> */}
                  <div>
                    <Typography variant="h6" color="text.secondary">
                      Owner
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      maxWidth="120px"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {property.owner}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" color="text.secondary">
                      IPFS Hash
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.ipfsHash?.length > 0
                        ? property.ipfsHash
                        : '(not set)'}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" color="text.secondary">
                      Available Shares
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Number(
                        property.shares[
                          property.stakeholders.indexOf(property.owner)
                        ]
                      )}{' '}
                      of {property.totalShares}
                    </Typography>
                  </div>

                  {/* <div>
                    <p className="text-sm font-medium">Available Shares</p>
                    <p>{property.availableShares}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Price per Share</p>
                    <p>${property.pricePerShare}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Percentage Owned</p>
                    <p>{percentageOwned.toFixed(2)}%</p>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="text-gray-600">
                {property.stakeholders && property.stakeholders.length > 0 && (
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5">Shareholders</Typography>
                      <Typography variant="body2" color="text.secondary">
                        The following table shows the shareholders of the
                        property and their respective shares.
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Shareholder</TableCell>
                            <TableCell>Shares</TableCell>
                            <TableCell>Percentage</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {property.stakeholders.map((stakeholder, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Typography
                                  maxWidth="120px"
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                >
                                  {stakeholder === property.owner
                                    ? ' [property owner]'
                                    : stakeholder}
                                </Typography>
                              </TableCell>
                              <TableCell>{property.shares[index]}</TableCell>
                              <TableCell>
                                {(Number(property.shares[index]) /
                                  Number(property.totalShares)) *
                                  100}
                                %
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
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
    </Box>
  );
}
