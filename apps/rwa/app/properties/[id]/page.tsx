import { Sidebar } from '../../../components/sidebar'
import { Header } from '../../../components/header'
import { PropertyDetails } from '../../../components/property-details'
import { Property } from '../../types/property'

// This is a mock function to simulate fetching property data
// In a real application, this would be an API call or database query
function getPropertyById(id: string): Property {
  return {
    id: 1,
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90001",
    type: "Apartment",
    units: 24,
    totalShares: 1000,
    availableShares: 250,
    pricePerShare: 100,
    shareholders: [
      { id: 1, name: "John Doe", sharesOwned: 100 },
      { id: 2, name: "Jane Smith", sharesOwned: 150 },
      { id: 3, name: "Acme Investments", sharesOwned: 500 },
    ]
  }
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Details</h2>
          <PropertyDetails property={property} />
        </main>
      </div>
    </div>
  )
}

