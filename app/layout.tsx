import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'MenuOS Admin Dashboard',
  description: 'MenuOS admin dashboard for managing restaurant menus, orders, staff, and tables.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'MenuOS Admin Dashboard',
    description: 'Modern admin dashboard for restaurant operations.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}

