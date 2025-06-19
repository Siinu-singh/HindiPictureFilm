
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getMovies, getGenres } from '@/lib/data';
import MovieList from '@/components/movies/MovieList';
import GenreFilter from '@/components/home/GenreFilter';
import { Skeleton } from '@/components/ui/skeleton';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';

const MoviesPageSkeleton = () => (
  <div className="flex-1 flex flex-col bg-background text-foreground"> {/* Adjusted for ClientLayout */}
    {/* Navbar and Sidebar skeletons are part of the main layout structure */}
    <div className="flex-1 flex flex-col"> {/* This div takes padding from ClientLayout */}
      <div className="text-center mb-8 md:mb-10">
        <Skeleton className="h-10 sm:h-12 w-60 sm:w-72 mx-auto rounded-md" /> {/* Title Skeleton */}
      </div>
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
      {/* Movie List Skeleton */}
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

function MoviesPageContent() {
  const searchParams = useSearchParams();
  const genreNameFromUrl = searchParams.get('genre');

  const [movies, setMovies] = useState([]);
  const [genres, setGenresData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Stores genre ID
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [moviesData, genresResult] = await Promise.all([
          getMovies(),
          getGenres()
        ]);
        setMovies(moviesData);
        setFilteredMovies(moviesData);
        setGenresData(genresResult);

        if (genreNameFromUrl && genresResult.length > 0) {
          const initialGenre = genresResult.find(g => g.name.toLowerCase() === genreNameFromUrl.toLowerCase());
          if (initialGenre) {
            setSelectedGenre(initialGenre.id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch movies or genres:", error);
      }
      setLoading(false);
    };
    fetchInitialData();
  }, [genreNameFromUrl]); // Re-run if genreNameFromUrl changes (though typically it's initial)

  useEffect(() => {
    if (loading) return; // Don't filter while initial data is loading or genres aren't set

    if (selectedGenre === null) {
      setFilteredMovies(movies);
    } else {
      const genre = genres.find(g => g.id === selectedGenre);
      if (genre) {
        setFilteredMovies(movies.filter(movie => movie.genres.includes(genre.name)));
      } else {
         setFilteredMovies(movies); // Fallback if genre ID not found
      }
    }
  }, [selectedGenre, movies, genres, loading]);

  const handleSelectGenre = (genreId) => {
    setSelectedGenre(genreId);
  };
  
  if (loading && movies.length === 0) { // Show skeleton only if truly no data yet
    return <MoviesPageSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground"> {/* mt-20 and px removed */}
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col"> {/* No padding here */}
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-center mb-8 md:mb-10
                     bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text"
        >
          All Movies
        </h1>
        {genres.length > 0 && (
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={handleSelectGenre}
          />
        )}
        <MovieList movies={filteredMovies} title={selectedGenre && genres.length > 0 ? genres.find(g=>g.id === selectedGenre)?.name : ""} />
      </main>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<MoviesPageSkeleton />}>
      <MoviesPageContent />
    </Suspense>
  );
}


