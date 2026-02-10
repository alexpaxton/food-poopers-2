import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import AuthSessionProvider from '@/lib/session-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Food Poopers',
  description: 'A Next.js application',
};

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <StyledComponentsRegistry>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
