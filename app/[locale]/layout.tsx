import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://svastiproduction.com'),
  title: {
    default: 'Svasti Production | Wedding Photography & Videography',
    template: '%s | Svasti Production',
  },
  description:
    'Capturing precious moments and turning them into unforgettable memories. Premium wedding photography and videography services.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://svastiproduction.com',
    siteName: 'Svasti Production',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}