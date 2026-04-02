import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import LoadingScreen from './components/LoadingScreen'
import { LanguageProvider } from './i18n/LanguageContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Divizion Launcher',
  description: 'Le launcher Minecraft ultime. Gratuit et sans compromis.',
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
      <body className={poppins.className}>
        <LanguageProvider>
          <LoadingScreen />
          <div className="page-wrapper">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
