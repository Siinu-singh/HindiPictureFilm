
"use client";

import Link from 'next/link';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import { Film } from 'lucide-react';

// This Navbar is part of the OLD design.
// The new homepage design uses VerticalNavbar.jsx and SearchBar.jsx.
// Keeping this file for now in case it's needed for other, non-homepage routes,
// but it's not used by the new src/app/page.jsx.
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-lg border-b border-border/30 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Hindipicturefilm.com Home">
          <Film className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[15deg]" />
          <h1 className="text-2xl font-headline font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            Hindipicturefilm
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
