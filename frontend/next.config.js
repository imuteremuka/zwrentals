/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Amplify hosting
  output: 'export',
  trailingSlash: true,
  outputFileTracingRoot: __dirname, // ensures Next.js sees correct project root
  distDir: 'out', // Explicitly set output directory
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