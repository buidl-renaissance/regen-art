import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Button } from '@mui/base';
import { Edit, Trash2, Share2 } from 'lucide-react';

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  units: number;
  totalShares: number;
  availableShares: number;
  pricePerShare: number;
}

const properties: Property[] = [
  {
    id: 1,
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd, Los Angeles, CA 90001',
    type: 'Apartment',
    units: 24,
    totalShares: 1000,
    availableShares: 250,
    pricePerShare: 100,
  },
  {
    id: 2,
    name: 'Downtown Lofts',
    address: '456 Main St, New York, NY 10001',
    type: 'Loft',
    units: 12,
    totalShares: 500,
    availableShares: 100,
    pricePerShare: 200,
  },
  {
    id: 3,
    name: 'Green Valley Homes',
    address: '789 Oak Rd, Chicago, IL 60601',
    type: 'House',
    units: 8,
    totalShares: 800,
    availableShares: 400,
    pricePerShare: 150,
  },
];

export function PropertyList() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Units</TableCell>
          <TableCell>Available Shares</TableCell>
          <TableCell>Price per Share</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.name}</TableCell>
            <TableCell>{property.address}</TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>{property.units}</TableCell>
            <TableCell>
              {property.availableShares} / {property.totalShares}
            </TableCell>
            <TableCell>${property.pricePerShare}</TableCell>
            <TableCell>
              <Button>
                <Edit className="h-4 w-4" />
              </Button>
              <Button>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button>
                <Share2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
