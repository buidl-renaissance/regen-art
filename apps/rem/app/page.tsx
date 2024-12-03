import { Sidebar } from '../components/sidebar'
import { Header } from '../components/header'
import { Dashboard } from '../components/dashboard'

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

