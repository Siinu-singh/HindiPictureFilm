"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, Tv } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function LiveTVCard({ channel }) {
  return (
    <Link
      href={channel.streamUrl || '#'}
      target={channel.streamUrl && channel.streamUrl !== '#' ? '_blank' : '_self'}
      rel={channel.streamUrl && channel.streamUrl !== '#' ? 'noopener noreferrer' : ''}
      aria-label={`Watch ${channel.channelName}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg sm:rounded-xl h-full"
    >
      <motion.div
        className="relative group rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-card border border-transparent group-focus-within:ring-2 group-focus-within:ring-primary group-focus-within:border-primary/70 h-full flex flex-col"
        variants={cardVariants}
        whileHover={{
          scale: 1.03,
          y: -3,
          boxShadow: "0px 8px 15px hsla(var(--primary-rgb), 0.25), 0px 0px 10px hsla(var(--primary-rgb), 0.15)",
          borderColor: "hsla(var(--primary-rgb), 0.4)"
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative w-full h-40 sm:h-48 md:h-56 bg-muted/50 flex items-center justify-center overflow-hidden">
          {channel.logoUrl ? (
            <Image
              src={channel.logoUrl}
              alt={`${channel.channelName} logo`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={channel.dataAiHintLogo || "channel logo"}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <Tv className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayCircle className="w-12 h-12 sm:w-14 sm:w-14 text-white/80 group-hover:text-white" />
          </div>
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-sm sm:text-base md:text-md font-headline font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300" title={channel.channelName}>
            {channel.channelName}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 h-8" title={channel.description}>
            {channel.description}
          </p>
          <div className="mt-auto pt-2 sm:pt-3 flex justify-between items-center">
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2">{channel.genre}</Badge>
            <span className="text-xs font-semibold text-green-500 flex items-center">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 mr-1 sm:mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
              </span>
              LIVE
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
