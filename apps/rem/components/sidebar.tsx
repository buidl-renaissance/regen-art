import Link from 'next/link'
import { Home, Building, PlusCircle, Settings, ShoppingCart, Briefcase, Users, UserPlus } from 'lucide-react'

// In a real application, you would check if the current user is an admin
const isAdmin = true

export function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link href="/properties" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Building className="inline-block mr-2" size={20} />
          Properties
        </Link>
        <Link href="/add-property" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <PlusCircle className="inline-block mr-2" size={20} />
          Add Property
        </Link>
        <Link href="/marketplace" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <ShoppingCart className="inline-block mr-2" size={20} />
          Marketplace
        </Link>
        <Link href="/portfolio" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Briefcase className="inline-block mr-2" size={20} />
          Portfolio
        </Link>
        <Link href="/register" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <UserPlus className="inline-block mr-2" size={20} />
          Register
        </Link>
        {isAdmin && (
          <Link href="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <Users className="inline-block mr-2" size={20} />
            Admin
          </Link>
        )}
        <Link href="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Settings className="inline-block mr-2" size={20} />
          Settings
        </Link>
      </nav>
    </div>
  )
}

