import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, Phone } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import Image from 'next/image'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    location: string
    rent_amount: number
    house_type: string
    bedrooms: number
    bathrooms: number
    description: string
    images: string[]
    created_at: string
    landlord: {
      name: string
      phone: string
    }
  }
  onContact?: (propertyId: string) => void
  onBookViewing?: (propertyId: string) => void
  onToggleFavorite?: (propertyId: string) => void
  isFavorite?: boolean
}

export function PropertyCard({ 
  property, 
  onContact, 
  onBookViewing, 
  onToggleFavorite,
  isFavorite = false 
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Gallery */}
      <div className="relative h-48 md:h-56">
        <div className="relative w-full h-full">
          {property.images.length > 0 ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <p>No Image Available</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Image Count Badge */}
        {property.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
            +{property.images.length - 1} photos
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 left-2 flex space-x-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white bg-opacity-90 hover:bg-opacity-100"
            onClick={() => onToggleFavorite?.(property.id)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white bg-opacity-90 hover:bg-opacity-100"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.house_type}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {property.description}
        </p>

        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-3">
          {formatCurrency(property.rent_amount)}
          <span className="text-sm text-gray-600 font-normal">/month</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            className="flex-1"
            onClick={() => onBookViewing?.(property.id)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Viewing
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onContact?.(property.id)}
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>

        {/* Listing Date */}
        <div className="mt-3 text-xs text-gray-500">
          Listed {formatDate(property.created_at)}
        </div>
      </CardContent>
    </Card>
  )
}
