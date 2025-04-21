import type { Metadata } from 'next'

import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { getMetadata } from '@/constants/metadata'
import TanstackQueryProvider from '@/providers/tanstackQueryProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID} />
        <TanstackQueryProvider>
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
            <div>{children}</div>
            <Toaster
              position="top-center"
              richColors
            />
          </div>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
