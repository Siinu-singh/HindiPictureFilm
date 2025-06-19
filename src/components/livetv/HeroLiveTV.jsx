
"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef } from 'react';

export default function HeroLiveTV({ banner }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']); 
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  if (!banner) {
    return (
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-muted flex items-center justify-center text-muted-foreground">
        Loading hero banner...
      </div>
    );
  }

  return (
    <motion.section 
      ref={targetRef} 
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden mb-8 md:mb-12" // Added bottom margin
      style={{ opacity }}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={banner.imageUrl}
          alt={banner.title || "Live TV Hero Banner"}
          fill
          priority
          className="object-cover"
          data-ai-hint={banner.dataAiHint || "live tv hero"}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 lg:p-16 z-10 flex flex-col justify-end h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-primary mb-3 sm:mb-4 drop-shadow-lg"
        >
          {banner.title}
        </motion.h1>
        {banner.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8 max-w-md sm:max-w-lg md:max-w-2xl drop-shadow-md"
          >
            {banner.description}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <Button asChild size="sm" className="sm:size-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:scale-105 transition-transform text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2.5 sm:py-3 md:py-6">
            <Link href="#live-channels-grid">
              <PlayCircle className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> Explore Channels
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
