import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import LoadingScreen from './components/LoadingScreen'
import { LanguageProvider } from './i18n/LanguageContext'
import DocumentTitle from './i18n/DocumentTitle'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const siteUrl = 'https://divizion.fr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Divizion Launcher — Le launcher Minecraft ultime',
    template: '%s | Divizion Launcher',
  },
  description: 'Divizion Launcher est le launcher Minecraft gratuit et sans compromis. Installez vos modpacks facilement, gérez vos instances et lancez Minecraft en un clic.',
  keywords: ['Minecraft', 'launcher', 'Minecraft launcher', 'Divizion', 'Divizion Launcher', 'modpack', 'modpacks', 'gratuit', 'free', 'MultiMC', 'Prism Launcher', 'CurseForge', 'Modrinth'],
  authors: [{ name: 'Divizion Project' }],
  creator: 'Divizion Project',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'Divizion Launcher',
    title: 'Divizion Launcher — Le launcher Minecraft ultime',
    description: 'Divizion Launcher est le launcher Minecraft gratuit et sans compromis. Installez vos modpacks facilement, gérez vos instances et lancez Minecraft en un clic.',
    images: [
      {
        url: '/divizion-logo.webp',
        width: 512,
        height: 512,
        alt: 'Divizion Launcher Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Divizion Launcher — Le launcher Minecraft ultime',
    description: 'Le launcher Minecraft gratuit et sans compromis.',
    images: ['/divizion-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
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
          <DocumentTitle />
          <LoadingScreen />
          <div className="page-wrapper">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
