
import { getTVShows, getGenres } from '@/lib/data';
import GenreFilter from '@/components/home/GenreFilter';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';
import TVShowCard from '@/components/movies/TVShowCard';

export default async function TVShowsPage({ searchParams }) {
  const genreNameFromUrl = searchParams.genre;

  const [allTVShows, allGenres] = await Promise.all([
    getTVShows(),
    getGenres()
  ]);

  // Filter genres to only include those that are actually present in the TV shows list
  const relevantGenres = allGenres.filter(g => 
    allTVShows.some(s => s.genres.includes(g.name))
  );

  const selectedGenreObject = genreNameFromUrl
    ? relevantGenres.find(g => g.name.toLowerCase() === genreNameFromUrl.toLowerCase())
    : null;

  const filteredTVShows = selectedGenreObject
    ? allTVShows.filter(show => show.genres.includes(selectedGenreObject.name))
    : allTVShows;

  const currentGenreName = selectedGenreObject ? selectedGenreObject.name : "All TV Shows";

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-6 md:mb-8">TV Shows</h1>
        
        <GenreFilter
          genres={relevantGenres}
          selectedGenre={selectedGenreObject ? selectedGenreObject.id : null}
          basePath="/tvshows"
        />
        
        <section className="py-8" aria-labelledby="tvshow-list-title">
          <h2 id="tvshow-list-title" className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-6">
            {currentGenreName}
          </h2>
          {filteredTVShows.length === 0 ? (
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
