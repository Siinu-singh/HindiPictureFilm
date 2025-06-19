
import { getMovieById, getMovies } from '@/lib/data';
import Image from 'next/image';
import { Star, CalendarDays, Clock, PlayCircle, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import TopNavbar from '@/components/layout/TopNavbar';
import Sidebar from '@/components/layout/Sidebar';


export async function generateMetadata(
  { params },
  parent
) {
  const { movieId } = params; 
  const movie = await getMovieById(movieId);
  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }
  return {
    title: `${movie.title} - Hindipicturefilm.com`,
    description: movie.description.substring(0, 160),
    openGraph: {
      title: movie.title,
      description: movie.description.substring(0, 160),
      images: [
        {
          url: movie.posterUrl,
          width: 300,
          height: 450,
          alt: movie.title,
        },
        ...(movie.bannerUrl ? [{
          url: movie.bannerUrl,
          width: 1200,
          height: 500,
          alt: `${movie.title} banner`,
        }] : []),
      ],
    },
  };
}

export async function generateStaticParams() {
  const movies = await getMovies();
  return movies.map((movie) => ({
    movieId: movie.id,
  }));
}

export default async function MovieDetailPage({ params }) {
  const { movieId } = params; 
  const movie = await getMovieById(movieId);

  if (!movie) {
    return (
      <div className="flex-1 flex flex-col bg-background text-foreground">
        <Sidebar />
        <TopNavbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center mt-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-muted-foreground mb-8 text-base sm:text-lg">Sorry, we couldn't find the movie you're looking for.</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      <Sidebar />
      <TopNavbar />
      <main className="flex-1 flex flex-col mt-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8">
        <article className="w-full">
          <div className="mb-6 md:mb-8">
            <Button variant="outline" asChild>
              <Link href="/movies">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Movies
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={movie.posterUrl}
                  alt={`Poster for ${movie.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" 
                  className="object-cover"
                  data-ai-hint={movie.dataAiHintPoster || "movie poster detail"}
                  priority
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-3 sm:mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>{movie.releaseYear}</span>
                </div>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{movie.rating.toFixed(1)}/10</span>
                </div>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="mr-1.5 mb-1.5 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1">{genre}</Badge>
                ))}
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-4 sm:mb-6">{movie.description}</p>

              {movie.director && <p className="text-sm sm:text-md mb-1 sm:mb-2"><strong className="font-semibold text-foreground">Director:</strong> {movie.director}</p>}
              {movie.cast && movie.cast.length > 0 && <p className="text-sm sm:text-md mb-4 sm:mb-6"><strong className="font-semibold text-foreground">Cast:</strong> {movie.cast.join(', ')}</p>}
              
              {movie.trailerUrl && (
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base">
                  <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
                    <PlayCircle className="mr-2 h-5 w-5" /> Watch Trailer
                  </a>
                </Button>
              )}
            </div>
          </div>

          {movie.bannerUrl && (
             <div className="mt-8 md:mt-12 relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={movie.bannerUrl}
                    alt={`${movie.title} banner image`}
                    fill
                    className="object-cover"
                    data-ai-hint={movie.dataAiHintBanner || "movie scene"}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
