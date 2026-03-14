/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'ZimRentals',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Zimbabwe Rental Marketplace',
  },
}

module.exports = nextConfig
