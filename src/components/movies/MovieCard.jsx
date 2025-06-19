
"use client";

import React from 'react'; 
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, CalendarDays, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


export default function MovieCard({ movie }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRef = React.useRef(null);

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [7, -7]), springConfig); // Reduced rotation
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-7, 7]), springConfig); // Reduced rotation
  const scale = useSpring(1, springConfig);
  const glowOpacity = useTransform(mouseX, [-100, 100], [0, 0.25]); // Reduced glow opacity

  return (
    <Link href={`/movies/${movie.id}`} passHref>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onHoverStart={() => scale.set(1.03)} // Reduced scale on hover
        onHoverEnd={() => scale.set(1)}
        style={{
          rotateX,
          rotateY,
          scale,
          perspective: '1200px', // Adjusted perspective
        }}
        className="relative group rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card h-full flex flex-col" // Ensure full height for flex
        aria-label={`View details for ${movie.title}`}
      >
        <motion.div 
          className="absolute inset-0 rounded-lg sm:rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            opacity: glowOpacity,
            boxShadow: `0 0 20px 5px hsla(var(--primary-rgb), var(--tw-bg-opacity, 0.3)), 0 0 5px 1px hsla(var(--primary-rgb), var(--tw-bg-opacity, 0.5))`, // Adjusted glow
          }}
        />
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 18vw" // Responsive sizes
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={movie.dataAiHintPoster || "movie poster"}
            priority={movie.id <= '3'} 
          />
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow"> {/* Flex grow for content */}
          <h3 className="text-base sm:text-lg font-headline font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300" title={movie.title}>
            {movie.title}
          </h3>
          <div className="mt-1.5 sm:mt-2 flex flex-wrap gap-1 sm:gap-1.5">
            {movie.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5">{genre}</Badge>
            ))}
          </div>
          <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between text-xs text-muted-foreground"> {/* mt-auto to push to bottom */}
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              <span>{movie.releaseYear}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
