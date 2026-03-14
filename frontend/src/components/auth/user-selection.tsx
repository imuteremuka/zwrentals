import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Users, ArrowLeft } from 'lucide-react'

interface UserSelectionProps {
  onRoleSelect: (role: 'tenant' | 'landlord') => void
  onBack?: () => void
}

export function UserSelection({ onRoleSelect, onBack }: UserSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Join RentZW</CardTitle>
          <CardDescription>
            How would you like to use our platform?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-24 flex flex-col items-center justify-center space-y-2 p-6"
            onClick={() => onRoleSelect('tenant')}
          >
            <Home className="h-8 w-8 text-primary" />
            <div className="text-center">
              <h3 className="font-semibold">I&apos;m looking for a place to rent</h3>
              <p className="text-sm text-gray-600">Browse properties and connect with landlords</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-24 flex flex-col items-center justify-center space-y-2 p-6"
            onClick={() => onRoleSelect('landlord')}
          >
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div className="text-center">
              <h3 className="font-semibold">I want to list my property</h3>
              <p className="text-sm text-gray-600">Find tenants and manage your listings</p>
            </div>
          </Button>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Already have an account?</p>
            <Button variant="link" className="text-primary">
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
