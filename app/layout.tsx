import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '@fontsource-variable/doto'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xuji',
  description: 'A minimal, cinematic personal portfolio',
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
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
