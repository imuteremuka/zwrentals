import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateStaticParams() {
  // Generate common placeholder sizes
  const sizes = [
    ['400', '300'],
    ['800', '600'],
    ['1200', '900'],
    ['200', '200'],
    ['100', '100']
  ]
  
  return sizes.map(([width, height]) => ({
    params: [width, height]
  }))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const resolvedParams = await params
  const [width, height] = resolvedParams.params || [400, 300]
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af">
        Property Image
      </text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Content-Security-Policy': "default-src 'none'; script-src 'none';",
    },
  })
}
