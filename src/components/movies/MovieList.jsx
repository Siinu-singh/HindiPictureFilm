
import MovieCard from './MovieCard'; // Default card
// Import other card types if you want to pass them as props for different lists
// import TVShowCard from './TVShowCard';
// import LiveTVCard from './LiveTVCard';

export default function MovieList({ movies, title = "Discover", CardComponent = MovieCard }) {
  if (!movies || movies.length === 0) {
    return (
      <section className="py-8" aria-labelledby={title ? title.toLowerCase().replace(/\s+/g, '-') + "-title" : "movie-list-title"}>
        {title && <h2 id={title.toLowerCase().replace(/\s+/g, '-') + "-title"} className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-6">{title}</h2>}
        <div className="text-center py-10">
          <p className="text-lg sm:text-xl text-muted-foreground">No items found for this section.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8" aria-labelledby={title ? title.toLowerCase().replace(/\s+/g, '-') + "-title" : "movie-list-title"}>
      {title && <h2 id={title.toLowerCase().replace(/\s+/g, '-') + "-title"} className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-6">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => ( 
          // Using MovieCard as default, can be made more generic if needed
          // by passing the item type and specific card component
          <CardComponent key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

