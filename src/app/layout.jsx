
import './globals.css';
import { AppThemeProvider } from '@/components/providers/AppThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { ClientLayout } from '@/components/layout/ClientLayout';
import Footer from '@/components/layout/Footer';


export const metadata = {
  title: 'Hindipicturefilm.com - Your Bollywood & Beyond Movie Hub',
  description: 'Discover and explore a vast catalog of Hindi and international movies and TV shows. SSR-powered for optimal SEO and performance.',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-body antialiased bg-background text-foreground scrollbar-thin flex flex-col min-h-screen">
        <AppThemeProvider>
          <div className="flex-grow">
            <ClientLayout>
              {children}
            </ClientLayout>
          </div>
          <Toaster />
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}

