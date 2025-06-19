
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTVShows, getGenres } from '@/lib/data';
import GenreFilter from '@/components/home/GenreFilter';
import { Skeleton } from '@/components/ui/skeleton';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import TVShowCard from '@/components/movies/TVShowCard';

const TVShowsPageSkeleton = () => (
  <div className="flex-1 flex flex-col bg-background text-foreground"> {/* Adjusted for ClientLayout */}
    <div className="flex-1 flex flex-col"> {/* This div takes padding from ClientLayout */}
      <Skeleton className="h-7 sm:h-8 w-36 sm:w-40 mb-6 md:mb-8" /> {/* Title Skeleton */}
      <div className="mb-8 md:mb-12"> {/* Genre Filter Skeleton */}
        <div className="flex items-center mb-4">
          <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 mr-2 rounded-md" />
          <Skeleton className="h-5 sm:h-6 w-28 sm:w-32 rounded-md" />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-9 sm:h-10 w-20 sm:w-24 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 md:gap-6">
        {[...Array(12)].map((_, i) => ( 
          <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-card">
            <Skeleton className="w-full aspect-[2/3]" />
            <div className="p-3 md:p-4">
              <Skeleton className="h-4 md:h-5 w-3/4 mb-2" />
              <Skeleton className="h-3 md:h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

function TVShowsPageContent() {
  const searchParams = useSearchParams();
  const genreNameFromUrl = searchParams.get('genre');

  const [tvShows, setTvShows] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Stores genre ID
  const [loading, setLoading] = useState(true);
  const [filteredTVShows, setFilteredTVShows] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [showsData, genresResult] = await Promise.all([
          getTVShows(),
          getGenres()
        ]);
        setTvShows(showsData);
        setFilteredTVShows(showsData);
        setGenresData(genresResult);

        if (genreNameFromUrl && genresResult.length > 0) {
          const initialGenre = genresResult.find(g => g.name.toLowerCase() === genreNameFromUrl.toLowerCase());
          if (initialGenre) {
            setSelectedGenre(initialGenre.id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch TV shows or genres:", error);
      }
      setLoading(false);
    };
    fetchInitialData();
  }, [genreNameFromUrl]);

  useEffect(() => {
    if (loading) return;

    if (selectedGenre === null) {
      setFilteredTVShows(tvShows);
    } else {
      const genre = genresData.find(g => g.id === selectedGenre);
      if (genre) {
        setFilteredTVShows(tvShows.filter(show => show.genres.includes(genre.name)));
      } else {
        setFilteredTVShows(tvShows);
      }
    }
  }, [selectedGenre, tvShows, genresData, loading]);

  const handleSelectGenre = (genreId) => {
    setSelectedGenre(genreId);
  };
  
  if (loading && tvShows.length === 0) {
    return <TVShowsPageSkeleton />;
  }
  
  const currentGenreName = selectedGenre && genresData.length > 0 ? genresData.find(g => g.id === selectedGenre)?.name : "All TV Shows";

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground"> {/* mt-20 and px removed */}
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col"> {/* No padding here */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-6 md:mb-8">TV Shows</h1>
        {genresData.length > 0 && (
          <GenreFilter
            genres={genresData.filter(g => tvShows.some(s => s.genres.includes(g.name)))} // Only show genres relevant to TV shows
            selectedGenre={selectedGenre}
            onSelectGenre={handleSelectGenre}
          />
        )}
        
        <section className="py-8" aria-labelledby="tvshow-list-title">
          <h2 id="tvshow-list-title" className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-6">
            {currentGenreName}
          </h2>
          {filteredTVShows.length === 0 && !loading ? (
            <p className="text-muted-foreground text-lg">No TV shows found for this genre.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 md:gap-6">
              {filteredTVShows.map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function TVShowsPage() {
  return (
    <Suspense fallback={<TVShowsPageSkeleton />}>
      <TVShowsPageContent />
    </Suspense>
  );
}

