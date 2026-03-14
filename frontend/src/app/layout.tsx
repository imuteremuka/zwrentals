import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZimRentals - Zimbabwe Rental Marketplace 2026',
  description: 'Find your perfect home or list your property in Zimbabwe\'s trusted rental marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Aggressively remove all browser extension attributes before React loads
              (function() {
                var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName) {
                      var attr = mutation.attributeName;
                      if (attr.includes('foxified') || attr.includes('crosspilot') || 
                          attr.includes('data-gr-') || attr.includes('data-new-gr-')) {
                        document.documentElement.removeAttribute(attr);
                      }
                    }
                  });
                });
                
                observer.observe(document.documentElement, {
                  attributes: true,
                  attributeFilter: ['foxified', 'crosspilot', 'data-gr-ext-installed', 'data-new-gr-c-check-loaded']
                });
                
                // Initial cleanup
                var attrs = ['foxified', 'crosspilot', 'data-gr-ext-installed', 'data-new-gr-c-check-loaded'];
                attrs.forEach(function(attr) {
                  if (document.documentElement.hasAttribute(attr)) {
                    document.documentElement.removeAttribute(attr);
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}
