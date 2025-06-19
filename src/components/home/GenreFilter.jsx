"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <section className="mb-12" aria-labelledby="genre-filter-title">
      <div className="flex items-center mb-4">
        <ListFilter className="w-6 h-6 mr-2 text-primary" />
        <h2 id="genre-filter-title" className="text-2xl font-headline font-semibold text-foreground">
          Filter by Genre
        </h2>
      </div>
      <motion.div
        className="flex flex-wrap gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Button
            variant={selectedGenre === null ? 'default' : 'outline'}
            onClick={() => onSelectGenre(null)}
            className="rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
            aria-pressed={selectedGenre === null}
          >
            All Genres
          </Button>
        </motion.div>
        {genres.map((genre) => (
          <motion.div key={genre.id} variants={itemVariants}>
            <Button
              variant={selectedGenre === genre.id ? 'default' : 'outline'}
              onClick={() => onSelectGenre(genre.id)}
              className="rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
              aria-pressed={selectedGenre === genre.id}
            >
              {genre.name}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
