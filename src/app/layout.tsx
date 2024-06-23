import type { Metadata } from 'next';
import LayoutProvider from './layout-provider';

export const metadata: Metadata = {
  title: 'Wheel Friend Connection',
  description: 'Find and connect with friends',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LayoutProvider>{children}</LayoutProvider>
    </html>
  );
}
