import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, ArrowLeft, CheckCircle } from 'lucide-react'
import { validateZimbabwePhone, formatPhoneNumber } from '@/lib/utils'

interface PhoneAuthProps {
  onAuthSuccess?: (user: any) => void
  onBack?: () => void
}

export function PhoneAuth({ onAuthSuccess, onBack }: PhoneAuthProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateZimbabwePhone(phoneNumber)) {
      setError('Please enter a valid Zimbabwe phone number')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call to AWS Cognito
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsOtpSent(true)
    } catch (err) {
      setError('Failed to send verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (otp.length !== 6) {
      setError('Please enter a 6-digit verification code')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful authentication
      const mockUser = {
        id: '1',
        phone: formatPhoneNumber(phoneNumber),
        name: 'John Doe',
        role: 'tenant'
      }
      
      onAuthSuccess?.(mockUser)
    } catch (err) {
      setError('Invalid verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setPhoneNumber(value)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
            <Phone className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">
            {isOtpSent ? 'Enter Verification Code' : 'Sign In with Phone'}
          </CardTitle>
          <CardDescription>
            {isOtpSent 
              ? `We've sent a 6-digit code to ${formatPhoneNumber(phoneNumber)}`
              : 'Enter your Zimbabwe phone number to continue'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <Input
                  type="tel"
                  placeholder="07XX XXX XXX or +263 7XX XXX XXX"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="text-center text-lg"
                  maxLength={12}
                />
                {phoneNumber && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {formatPhoneNumber(phoneNumber)}
                  </p>
                )}
              </div>
              
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !phoneNumber}
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('')
                      newOtp[index] = e.target.value
                      setOtp(newOtp.join(''))
                      // Focus next input
                      if (e.target.value && index < 5) {
                        const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement
                        nextInput?.focus()
                      }
                    }}
                    className="w-12 h-12 text-center text-lg"
                  />
                ))}
              </div>
              
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              
              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsOtpSent(false)
                    setOtp('')
                    setError('')
                  }}
                >
                  Change Phone Number
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>By continuing, you agree to our</p>
            <div className="flex justify-center space-x-2">
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              <span>&</span>
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
