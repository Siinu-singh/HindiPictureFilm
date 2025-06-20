
import { getMovies, getGenres } from '@/lib/data';
import MovieList from '@/components/movies/MovieList';
import GenreFilter from '@/components/home/GenreFilter';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';

export default async function MoviesPage({ searchParams }) {
  const genreNameFromUrl = searchParams.genre;

  const [allMovies, allGenres] = await Promise.all([
    getMovies(),
    getGenres()
  ]);

  const selectedGenreObject = genreNameFromUrl
    ? allGenres.find(g => g.name.toLowerCase() === genreNameFromUrl.toLowerCase())
    : null;

  const filteredMovies = selectedGenreObject
    ? allMovies.filter(movie => movie.genres.includes(selectedGenreObject.name))
    : allMovies;

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col">
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-center mb-8 md:mb-10
                     bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text"
        >
          All Movies
        </h1>
        <GenreFilter
          genres={allGenres}
          selectedGenre={selectedGenreObject ? selectedGenreObject.id : null}
          basePath="/movies"
        />
        <MovieList movies={filteredMovies} title={selectedGenreObject ? selectedGenreObject.name : ""} />
      </main>
    </div>
  );
}
