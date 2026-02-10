import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import AuthSessionProvider from '@/lib/session-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'food-poopers-2',
  description: 'A Next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
