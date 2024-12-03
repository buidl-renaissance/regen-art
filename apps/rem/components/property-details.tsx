import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Property } from "../types/property"

type PropertyDetailsProps = {
  property: Property;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const totalSharesOwned = property.shareholders.reduce((total, shareholder) => total + shareholder.sharesOwned, 0);
  const percentageOwned = (totalSharesOwned / property.totalShares) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{property.name}</CardTitle>
          <CardDescription>{property.address}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Property Type</p>
              <p>{property.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Number of Units</p>
              <p>{property.units}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Shares</p>
              <p>{property.totalShares}</p>
            </div>
            <div>
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shareholders</CardTitle>
          <CardDescription>List of all stakeholders in this property</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Shares Owned</TableHead>
                <TableHead>Percentage Owned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {property.shareholders.map((shareholder) => (
                <TableRow key={shareholder.id}>
                  <TableCell>{shareholder.name}</TableCell>
                  <TableCell>{shareholder.sharesOwned}</TableCell>
                  <TableCell>{((shareholder.sharesOwned / property.totalShares) * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

