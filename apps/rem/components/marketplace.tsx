import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Property } from "../types/property"

const properties: Property[] = [
  { id: 1, name: "Sunset Apartments", address: "123 Sunset Blvd, Los Angeles, CA 90001", type: "Apartment", units: 24, totalShares: 1000, availableShares: 250, pricePerShare: 100 },
  { id: 2, name: "Downtown Lofts", address: "456 Main St, New York, NY 10001", type: "Loft", units: 12, totalShares: 500, availableShares: 100, pricePerShare: 200 },
  { id: 3, name: "Green Valley Homes", address: "789 Oak Rd, Chicago, IL 60601", type: "House", units: 8, totalShares: 800, availableShares: 400, pricePerShare: 150 },
]

export function Marketplace() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Available Shares</TableHead>
          <TableHead>Price per Share</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.name}</TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>{property.availableShares} / {property.totalShares}</TableCell>
            <TableCell>${property.pricePerShare}</TableCell>
            <TableCell>
              <Button variant="outline">Buy Shares</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

