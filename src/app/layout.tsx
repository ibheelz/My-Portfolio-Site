import type { Metadata } from 'next'
import './globals.css'
import RootLayoutClient from './RootLayoutClient'

export const metadata: Metadata = {
  title: 'Abiola Adeyeye — Brand & Visual Designer',
  description: 'Brand and visual designer with 5+ years of experience in brand identity, AI-augmented workflows, and iGaming design.',
  metadataBase: new URL('https://abioladeyeye.com'),
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
