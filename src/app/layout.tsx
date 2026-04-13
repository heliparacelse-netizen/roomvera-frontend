import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OnboardingModal } from '@/components/OnboardingModal';

export const metadata: Metadata = { 
  title: 'Roomvera — Design d\'Intérieur IA', 
  description: 'Transformez vos espaces avec l\'IA.',
  verification: {
    google: 'Wr24t-oRGXKG_JoQs7xda9fGC2B-5UKOhblcQKodfw0',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="transition-colors duration-300">
        <Providers>
          <OnboardingModal />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
