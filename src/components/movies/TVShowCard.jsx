
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Tv, CalendarDays, BarChart3 } from 'lucide-react'; 
import { Badge } from '@/components/ui/badge';

export default function TVShowCard({ show }) {
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
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-7, 7]), springConfig);
  const scale = useSpring(1, springConfig);
  const glowOpacity = useTransform(mouseX, [-100, 100], [0, 0.25]);

  const detailPageUrl = `/tvshows#${show.id}`; 

  return (
    <Link href={detailPageUrl} passHref>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onHoverStart={() => scale.set(1.03)}
        onHoverEnd={() => scale.set(1)}
        style={{
          rotateX,
          rotateY,
          scale,
          perspective: '1200px',
        }}
        className="relative group rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card h-full flex flex-col"
        aria-label={`View details for ${show.title}`}
      >
        <motion.div 
          className="absolute inset-0 rounded-lg sm:rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            opacity: glowOpacity,
            boxShadow: `0 0 20px 5px hsla(var(--accent-rgb), var(--tw-bg-opacity, 0.3)), 0 0 5px 1px hsla(var(--accent-rgb), var(--tw-bg-opacity, 0.5))`, 
          }}
        />
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={show.posterUrl}
            alt={`Poster for ${show.title}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 18vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={show.dataAiHintPoster || "tv show poster"}
            priority={show.id <= 'tv2'} 
          />
           <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold rounded-sm sm:rounded">
            TV Show
          </div>
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-base sm:text-lg font-headline font-semibold text-foreground truncate group-hover:text-accent transition-colors duration-300" title={show.title}>
            {show.title}
          </h3>
          <div className="mt-1.5 sm:mt-2 flex flex-wrap gap-1 sm:gap-1.5">
            {show.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5">{genre}</Badge>
            ))}
          </div>
          <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              <span>{show.releaseYear}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="w-3 h-3" /> 
              <span>{show.seasons} Season{show.seasons > 1 ? 's' : ''}</span>
            </div>
            {show.rating && (
              <div className="flex items-center gap-1">
                <Tv className="w-3 h-3 text-yellow-400" />
                <span>{show.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
