import type { Metadata } from 'next'
import './globals.css'
import RootLayoutClient from './RootLayoutClient'

export const metadata: Metadata = {
  title: 'Abiola Adeyeye — Brand & Visual Designer',
  description: 'Brand and creative designer with over 8 years of experience crafting clear, impactful visual identities and digital design solutions.',
  metadataBase: new URL('https://abioladeyeye.com'),
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Abiola Adeyeye — Brand & Visual Designer',
    description: 'Brand and creative designer with over 8 years of experience crafting clear, impactful visual identities and digital design solutions.',
    url: 'https://abioladeyeye.com',
    siteName: 'Abiola Adeyeye',
    images: [
      {
        url: 'https://framerusercontent.com/images/pYTUyNQdLsvydRLSiS2tOjZ6V2U.png',
        width: 1200,
        height: 630,
        alt: 'Abiola Adeyeye — Brand & Visual Designer',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
