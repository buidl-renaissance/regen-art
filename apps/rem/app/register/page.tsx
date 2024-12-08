import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { InvestorRegistrationForm } from '@/components/investor-registration-form'

export default function RegisterPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Investor Registration</h2>
            <InvestorRegistrationForm />
          </div>
        </main>
      </div>
    </div>
  )
}

