import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RealtyApp',
  description: 'Real Estate Social Media - Buy, Sell, Rent & Connect',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
