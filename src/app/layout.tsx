import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { QueryProvider } from '@/lib/query-provider'
import StyledComponentsRegistry from '@/lib/registry'

import { FlyoutProvider } from '@/components/shared/FlyoutProvider'
import { ToastProvider } from '@/components/shared/ToastProvider'

import '@/app/globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Food Poopers',
  description: 'A Next.js application',
}

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <StyledComponentsRegistry>
          <SessionProvider>
            <QueryProvider>
              <ToastProvider>
                <FlyoutProvider>{children}</FlyoutProvider>
              </ToastProvider>
            </QueryProvider>
          </SessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
