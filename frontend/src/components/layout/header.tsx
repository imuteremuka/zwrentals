import { Search, Menu, User, Home, PlusCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">ZimRentals</span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-primary">
              Browse Properties
            </a>
            <a href="#" className="text-gray-700 hover:text-primary">
              List Property
            </a>
            <a href="#" className="text-gray-700 hover:text-primary">
              About
            </a>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              List Property
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search location, property type..."
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isClient && isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-primary py-2">
                Browse Properties
              </a>
              <a href="#" className="text-gray-700 hover:text-primary py-2">
                List Property
              </a>
              <a href="#" className="text-gray-700 hover:text-primary py-2">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="outline" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button className="justify-start">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  List Property
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
