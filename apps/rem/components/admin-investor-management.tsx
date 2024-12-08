"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Search } from 'lucide-react'
import { Investor } from "../types/investor"

const mockInvestors: Investor[] = [
  { id: 1, name: "John Doe", email: "john@example.com", isVerified: false, registrationDate: "2023-06-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", isVerified: true, registrationDate: "2023-05-15" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", isVerified: false, registrationDate: "2023-06-10" },
]

export function AdminInvestorManagement() {
  const [investors, setInvestors] = useState<Investor[]>(mockInvestors)
  const [searchTerm, setSearchTerm] = useState("")

  const handleVerify = (id: number) => {
    setInvestors(investors.map(investor => 
      investor.id === id ? { ...investor, isVerified: true } : investor
    ))
  }

  const handleUnverify = (id: number) => {
    setInvestors(investors.map(investor => 
      investor.id === id ? { ...investor, isVerified: false } : investor
    ))
  }

  const filteredInvestors = investors.filter(investor => 
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <TableHead>Email</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvestors.map((investor) => (
            <TableRow key={investor.id}>
              <TableCell>{investor.name}</TableCell>
              <TableCell>{investor.email}</TableCell>
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
                  <Button variant="outline" size="sm" onClick={() => handleUnverify(investor.id)}>
                    Unverify
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleVerify(investor.id)}>
                    Verify
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

