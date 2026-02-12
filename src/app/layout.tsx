import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import AuthSessionProvider from '@/lib/session-provider';
import { QueryProvider } from '@/lib/query-provider';
import { FlyoutProvider } from '@/components/shared/FlyoutProvider';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'] });

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
    <html lang="en" className={nunito.className}>
      <body>
        <StyledComponentsRegistry>
          <AuthSessionProvider>
            <QueryProvider><FlyoutProvider>{children}</FlyoutProvider></QueryProvider>
          </AuthSessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
