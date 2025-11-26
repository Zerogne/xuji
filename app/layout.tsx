import type { Metadata } from 'next'
import { Geist, Geist_Mono, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _dancingScript = Dancing_Script({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: 'Xuji',
  description: 'A minimal, cinematic personal portfolio',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
