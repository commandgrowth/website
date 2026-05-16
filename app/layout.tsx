// NOTE: No 'use client' here — layout.tsx is a Server Component.
// Metadata export only works in Server Components; 'use client' would break it.
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CommandGrowth — See Cine',
  description:
    'Ultra-premium digital growth agency. Local SEO, Performance Marketing, and Content Strategy for ambitious brands.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect must come before the stylesheet link for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-navy-900 text-white antialiased"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="relative min-h-screen">
          {/* Global ambient background — decorative only, pointer-events disabled */}
          <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06]"
              style={{
                background:
                  'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-[600px] h-[300px] rounded-full opacity-[0.04]"
              style={{
                background:
                  'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)',
              }}
            />
          </div>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
