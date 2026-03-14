import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, X, ChevronDown, MapPin, DollarSign, Home, Calendar } from 'lucide-react'

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
  onClose?: () => void
}

const PROPERTY_TYPES = [
  'House',
  'Apartment',
  'Flat',
  'Cottage',
  'Townhouse',
  'Duplex',
  'Studio'
]

const ZIMBABWE_CITIES = [
  'Harare',
  'Bulawayo',
  'Mutare',
  'Gweru',
  'Kwekwe',
  'Kadoma',
  'Masvingo',
  'Chinhoyi',
  'Marondera',
  'Kariba'
]

export function SearchFilters({ onFiltersChange, onClose }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    availableFrom: ''
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      availableFrom: ''
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Search Filters
          </CardTitle>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Location
          </label>
          <Input
            placeholder="Enter city or area..."
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {ZIMBABWE_CITIES.map(city => (
              <Button
                key={city}
                variant={filters.location === city ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('location', city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Home className="h-4 w-4 mr-1" />
            Property Type
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          >
            <option value="">All Types</option>
            {PROPERTY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Price Range (USD/month)
          </label>
          <div className="flex space-x-2">
            <Input
              placeholder="Min"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Expandable Section */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>More Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>

          {isClient && isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Bedrooms */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bedrooms</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bathrooms</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.bathrooms}
                  onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>

              {/* Available From */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Available From
                </label>
                <Input
                  type="date"
                  value={filters.availableFrom}
                  onChange={(e) => handleFilterChange('availableFrom', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
