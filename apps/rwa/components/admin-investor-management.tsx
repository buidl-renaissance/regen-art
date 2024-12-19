"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { CheckCircle, XCircle, Search } from 'lucide-react'
import { Investor } from "../app/types/investor"
import { removeInvestor, verifyInvestor } from '@gods.work/web3';

// const mockInvestors: Investor[] = [
//   { id: 1, name: "John Doe", email: "john@example.com", isVerified: false, registrationDate: "2023-06-01" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", isVerified: true, registrationDate: "2023-05-15" },
//   { id: 3, name: "Bob Johnson", email: "bob@example.com", isVerified: false, registrationDate: "2023-06-10" },
// ]

export function AdminInvestorManagement({ verifiers, investors }: { verifiers: string[], investors: Investor[] }) {

  const [investorList, setInvestorList] = useState<Investor[]>(investors ?? [])
  const [searchTerm, setSearchTerm] = useState("")

  const handleVerify = async (address: string) => {
    await verifyInvestor({
      investorAddress: address,
    });
    setInvestorList(investorList.map(investor => 
      investor.investor === address ? { ...investor, isVerified: true } : investor
    ))
  }

  const handleUnverify = async (address: string) => {
    await removeInvestor({
      investorAddress: address,
    });
    setInvestorList(investorList.map(investor => 
      investor.investor === address ? { ...investor, isVerified: false } : investor
    ))
  }

  const filteredInvestors = investorList.filter(investor => 
    searchTerm.length === 0 || investor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  console.log('filteredInvestors: ', investorList, filteredInvestors);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search investors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {/* <TableHead>Email</TableHead> */}
            <TableHead>Registration Date</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investorList.map((investor) => {
            console.log('investor: ', investor);
            return (
              <TableRow key={investor.investor}>
                <TableCell>{investor.name}</TableCell>
              <TableCell>{investor.registrationDate}</TableCell>
              <TableCell>
                {investor.isVerified ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {investor.isVerified ? (
                  <Button variant="outline" size="sm" onClick={() => handleUnverify(investor.investor)}>
                    Unverify
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleVerify(investor.investor)}>
                    Verify
                  </Button>
                )}
              </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

