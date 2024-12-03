import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddProperty() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Property</h2>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Label htmlFor="name">Property Name</Label>
              <Input id="name" placeholder="Enter property name" />
            </div>
            <div className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter property address" />
            </div>
            <div className="mb-4">
              <Label htmlFor="type">Property Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="units">Number of Units</Label>
              <Input id="units" type="number" placeholder="Enter number of units" />
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit">Add Property</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

