
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Film } from 'lucide-react';

export default function HeroSection({ movie }) {
  if (!movie) return null;

  return (
    <div className="relative h-[calc(100vh-160px)] md:h-[calc(100vh-200px)] min-h-[500px] flex items-center justify-start text-white overflow-hidden">
      <Image
        src={movie.backgroundImageUrl}
        alt={`Background for ${movie.title}`}
        fill
        priority
        className="object-cover z-0"
        data-ai-hint={movie.dataAiHint}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
      
      <motion.div 
        className="relative z-20 px-8 md:px-16 lg:px-24 max-w-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.p 
          className="text-sm md:text-base text-gray-300 mb-2 uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {movie.releaseInfo} {movie.genres.join(', ')}
        </motion.p>
        <motion.h1 
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {movie.title}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {movie.subtitle}
        </motion.p>
        
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-3 shadow-lg transition-transform duration-200 hover:scale-105"
            onClick={() => window.location.href = movie.watchUrl}
            aria-label={`Watch ${movie.title} now`}
          >
            <PlayCircle className="mr-2 h-5 w-5" /> Watch now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10 rounded-full px-8 py-3 shadow-lg transition-transform duration-200 hover:scale-105"
            onClick={() => window.location.href = movie.trailerUrl}
            aria-label={`Watch ${movie.title} trailer`}
          >
            <Film className="mr-2 h-5 w-5" /> Trailer
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
