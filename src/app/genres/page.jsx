
import Link from 'next/link';
import { getGenres } from '@/lib/data';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Tag, Film, Sword, Smile, Drama as DramaIcon, Heart, AlertTriangle, Rocket, Users, 
  MountainSnow, Search, Sparkles, Coffee, Scroll, Shield, Tv, Palette
} from 'lucide-react';

const genreIcons = {
  "Action": Sword,
  "Comedy": Smile,
  "Drama": DramaIcon,
  "Romance": Heart,
  "Thriller": AlertTriangle,
  "Sci-Fi": Rocket,
  "Family": Users,
  "Adventure": MountainSnow,
  "Mystery": Search,
  "Bollywood": Sparkles,
  "Slice of Life": Coffee,
  "Historical": Scroll,
  "War": Shield,
  "Sitcom": Tv,
  "Default": Palette, // Fallback icon
};

const genreColorSchemes = [
  "from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600",
  "from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600",
  "from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600",
  "from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600",
  "from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
  "from-lime-500 to-yellow-500 hover:from-lime-600 hover:to-yellow-600",
  "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
  "from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600",
  "from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600",
];

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-6 md:mb-8">Explore Genres</h1>
        {genres.length === 0 ? (
          <p className="text-muted-foreground text-lg">No genres available at the moment.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4">
            {genres.map((genre, index) => {
              const IconComponent = genreIcons[genre.name] || genreIcons.Default;
              const colorScheme = genreColorSchemes[index % genreColorSchemes.length];
              return (
                <Link 
                  href={`/movies?genre=${encodeURIComponent(genre.name.toLowerCase())}`} 
                  key={genre.id}
                  className={`group flex flex-col items-center justify-center p-3 sm:p-4 h-28 sm:h-32 bg-gradient-to-br ${colorScheme} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 mb-2 text-white/90 group-hover:text-white transition-colors" />
                  <span className="text-sm sm:text-base font-semibold text-center text-white group-hover:text-white/90 transition-colors line-clamp-1">{genre.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
