
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => (
  <Link href={`/movies/${movie.id}`} passHref>
    <motion.div
      className="relative w-32 h-48 sm:w-36 sm:h-52 md:w-40 md:h-60 rounded-md sm:rounded-lg overflow-hidden shadow-lg cursor-pointer group" // Responsive sizing
      whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px hsla(var(--primary-rgb), 0.2)" }}
      transition={{ type: "spring", stiffness: 300 }}
      aria-label={`View details for ${movie.title}`}
    >
      <Image
        src={movie.posterUrl}
        alt={movie.title}
        fill
        className="object-cover"
        data-ai-hint={movie.dataAiHint}
        sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px" // Responsive sizes
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {movie.title}
      </div>
    </motion.div>
  </Link>
);

export default function MovieCarousel({ movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative w-full py-6 md:py-8 bg-background/50 backdrop-blur-sm"> {/* px removed */}
      <motion.div
        className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 scrollbar-none" // Responsive spacing
        drag="x"
        dragConstraints={{ left: -(movies.length * (160 + 16) - (typeof window !== 'undefined' ? window.innerWidth*0.8 : 300)), right: 0 }} 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
    </div>
  );
}
