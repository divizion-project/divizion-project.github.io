import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Divizion Launcher',
  description: 'Perfect for content creators, mod developers, and players who just want to play without hassle.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
