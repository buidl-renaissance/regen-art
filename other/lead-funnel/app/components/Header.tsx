import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-blue-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-300 transition-colors">
          RCCF
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#how-it-works" className="hover:text-blue-300 transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#join" className="hover:text-blue-300 transition-colors">
                Join
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

