import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { AdminInvestorManagement } from '@/components/admin-investor-management'

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Panel</h2>
          <AdminInvestorManagement />
        </main>
      </div>
    </div>
  )
}

