'use client'

import { useState, useEffect, Suspense } from 'react'
import { Search, Map, Grid, List } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic imports to completely bypass SSR
const Header = dynamic(() => import('@/components/layout/header').then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b animate-pulse"></div>
})

const Footer = dynamic(() => import('@/components/layout/footer').then(mod => ({ default: mod.Footer })), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-900 animate-pulse"></div>
})

const PropertyCard = dynamic(() => import('@/components/property/property-card').then(mod => ({ default: mod.PropertyCard })), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
})

const SearchFilters = dynamic(() => import('@/components/search/search-filters').then(mod => ({ default: mod.SearchFilters })), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 rounded-lg animate-pulse"></div>
})

const Button = dynamic(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })), {
  ssr: false,
  loading: () => <div className="bg-gray-100 rounded-lg animate-pulse"></div>
})

// Mock data for demonstration
const mockProperties = [
  {
    id: '1',
    title: 'Modern 3-Bedroom House in Borrowdale',
    location: 'Borrowdale, Harare',
    rent_amount: 1200,
    house_type: 'House',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Beautiful modern house with garden, secure complex, close to schools and shopping centers.',
    images: ['/api/placeholder/400/300'],
    created_at: '2024-01-15',
    landlord: {
      name: 'John Smith',
      phone: '+263712345678'
    }
  },
  {
    id: '2',
    title: 'Cozy 2-Bedroom Apartment in Avondale',
    location: 'Avondale, Harare',
    rent_amount: 800,
    house_type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    description: 'Well-maintained apartment with parking, 24/7 security, walking distance to amenities.',
    images: ['/api/placeholder/400/300'],
    created_at: '2024-01-10',
    landlord: {
      name: 'Sarah Johnson',
      phone: '+263713456789'
    }
  },
  {
    id: '3',
    title: 'Spacious 4-Bedroom Family Home',
    location: 'Greystone, Harare',
    rent_amount: 1500,
    house_type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    description: 'Large family home with swimming pool, staff quarters, and beautiful garden.',
    images: ['/api/placeholder/400/300'],
    created_at: '2024-01-08',
    landlord: {
      name: 'Michael Brown',
      phone: '+263714567890'
    }
  },
]

// Dynamic imports to prevent hydration
const DynamicHeader = dynamic(() => import('@/components/layout/header').then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b animate-pulse"></div>
})

const DynamicSearchFilters = dynamic(() => import('@/components/search/search-filters').then(mod => ({ default: mod.SearchFilters })), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 rounded-lg animate-pulse"></div>
})

// Static header for initial render
import { HeaderStatic } from '@/components/layout/header-static'

export default function HomePage() {
  const [properties, setProperties] = useState(mockProperties)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({})

  const handleContact = (propertyId: string) => {
    console.log('Contact property:', propertyId)
    // TODO: Implement contact functionality
  }

  const handleBookViewing = (propertyId: string) => {
    console.log('Book viewing:', propertyId)
    // TODO: Implement booking functionality
  }

  const handleToggleFavorite = (propertyId: string) => {
    console.log('Toggle favorite:', propertyId)
    // TODO: Implement favorite functionality
  }

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    // TODO: Filter properties based on new filters
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="h-16 bg-white border-b animate-pulse"></div>}>
        <Header />
      </Suspense>
      
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search location, property type, or features..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Map className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Suspense fallback={<div className="w-full h-96 bg-gray-100 rounded-lg animate-pulse"></div>}>
              <SearchFilters
                onFiltersChange={handleFiltersChange}
                onClose={() => setShowFilters(false)}
              />
            </Suspense>
          </div>

          {/* Property Listings */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {properties.length} Properties Found
              </h2>
              <select className="px-3 py-2 border rounded-lg text-sm">
                <option>Sort by: Newest</option>
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
                <option>Sort by: Location</option>
              </select>
            </div>

            {/* Property Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onContact={handleContact}
                  onBookViewing={handleBookViewing}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
