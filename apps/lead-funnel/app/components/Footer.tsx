export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">Renaissance City Community Fund</h3>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold mb-2">Contact</h4>
            <p className="text-sm">Email: john@dpop.tech</p>
            <p className="text-sm">Phone: (419) 346-4592</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Renaissance City Community Fund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

