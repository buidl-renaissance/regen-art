import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Share2, Eye } from 'lucide-react'
import { Property } from "../types/property"
import Link from 'next/link'

const properties: Property[] = [
  { 
    id: 1, 
    name: "Sunset Apartments", 
    address: "123 Sunset Blvd, Los Angeles, CA 90001", 
    type: "Apartment", 
    units: 24, 
    totalShares: 1000, 
    availableShares: 250, 
    pricePerShare: 100,
    shareholders: []
  },
  { 
    id: 2, 
    name: "Downtown Lofts", 
    address: "456 Main St, New York, NY 10001", 
    type: "Loft", 
    units: 12, 
    totalShares: 500, 
    availableShares: 100, 
    pricePerShare: 200,
    shareholders: []
  },
  { 
    id: 3, 
    name: "Green Valley Homes", 
    address: "789 Oak Rd, Chicago, IL 60601", 
    type: "House", 
    units: 8, 
    totalShares: 800, 
    availableShares: 400, 
    pricePerShare: 150,
    shareholders: []
  },
]

export function PropertyList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Units</TableHead>
          <TableHead>Available Shares</TableHead>
          <TableHead>Price per Share</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.name}</TableCell>
            <TableCell>{property.address}</TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>{property.units}</TableCell>
            <TableCell>{property.availableShares} / {property.totalShares}</TableCell>
            <TableCell>${property.pricePerShare}</TableCell>
            <TableCell>
              <Link href={`/properties/${property.id}`}>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View property details</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit property</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete property</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share property</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

