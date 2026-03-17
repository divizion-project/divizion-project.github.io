import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Divizion Launcher - Coming Soon',
  description: 'Divizion Launcher - A new era of productivity awaits. Coming soon.',
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
