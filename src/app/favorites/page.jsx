
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import { Heart } from 'lucide-react';

export default async function FavoritesPage() {
  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-primary mb-4 sm:mb-6" />
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-3 sm:mb-4">Your Favorites</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-sm sm:max-w-md">
          This is where your favorited movies and TV shows will appear. Feature coming soon!
        </p>
      </main>
    </div>
  );
}
