import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"

type InvestorShare = {
  propertyId: number;
  propertyName: string;
  sharesOwned: number;
  currentSharePrice: number;
}

const investorShares: InvestorShare[] = [
  { propertyId: 1, propertyName: "Sunset Apartments", sharesOwned: 50, currentSharePrice: 110 },
  { propertyId: 2, propertyName: "Downtown Lofts", sharesOwned: 25, currentSharePrice: 220 },
  { propertyId: 3, propertyName: "Green Valley Homes", sharesOwned: 100, currentSharePrice: 160 },
]

export function InvestorPortfolio() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Shares Owned</TableHead>
          <TableHead>Current Share Price</TableHead>
          <TableHead>Total Value</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investorShares.map((share) => (
          <TableRow key={share.propertyId}>
            <TableCell>{share.propertyName}</TableCell>
            <TableCell>{share.sharesOwned}</TableCell>
            <TableCell>${share.currentSharePrice}</TableCell>
            <TableCell>${share.sharesOwned * share.currentSharePrice}</TableCell>
            <TableCell>
              <Button variant="outline" className="mr-2">Sell</Button>
              <Button variant="outline">Transfer</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

