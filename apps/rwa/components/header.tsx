import { Bell, User } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Real Estate Management</h1>
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-200 mr-2">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

