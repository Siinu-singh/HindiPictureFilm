
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Tv, Film } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroCarousel({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 7000); 

    return () => clearInterval(timer);
  }, [banners]); 

  if (!banners || banners.length === 0) {
    return (
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden rounded-lg sm:rounded-xl shadow-xl mb-8 md:mb-12 group bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No featured content available.</p>
        </div>
    );
  }

  const currentBanner = banners[currentIndex];
  const linkHref = currentBanner.movieId 
    ? `/movies/${currentBanner.movieId}` 
    : currentBanner.tvShowId 
    ? `/tvshows#${currentBanner.tvShowId}` 
    : '#';
  
  const linkIcon = currentBanner.movieId ? <Film className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : currentBanner.tvShowId ? <Tv className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />;
  const buttonText = currentBanner.movieId ? "View Movie" : currentBanner.tvShowId ? "View Show" : "Learn More";


  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden rounded-lg sm:rounded-xl shadow-xl mb-8 md:mb-12 group" aria-roledescription="carousel" aria-label="Featured content">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentBanner.id}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Image
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            fill
            priority={currentIndex === 0} 
            className="object-cover"
            data-ai-hint={currentBanner.dataAiHint || "featured content banner"}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 lg:p-12 text-white z-10">
        <motion.h2 
          key={`title-${currentBanner.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-headline font-bold mb-2 sm:mb-3 drop-shadow-lg"
        >
          {currentBanner.title}
        </motion.h2>
        {currentBanner.description && (
          <motion.p 
            key={`desc-${currentBanner.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm sm:text-md md:text-lg mb-3 sm:mb-4 md:mb-6 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl drop-shadow-md line-clamp-2 sm:line-clamp-3"
          >
            {currentBanner.description}
          </motion.p>
        )}
        {(currentBanner.movieId || currentBanner.tvShowId) && (
          <motion.div
            key={`button-${currentBanner.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button asChild size="sm" className="sm:size-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg group-hover:scale-105 transition-transform text-xs sm:text-sm">
              <Link href={linkHref}>
                {linkIcon} {buttonText}
              </Link>
            </Button>
          </motion.div>
        )}
      </div>

      {banners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2">
          {banners.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
