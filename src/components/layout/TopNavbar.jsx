
"use client";

import Link from 'next/link';
import SearchBar from '@/components/home/SearchBar';
import { motion } from 'framer-motion';
import HamburgerButton from './HamburgerButton';
import { Projector, UserCircle } from 'lucide-react'; // Changed Clapperboard to Projector


export default function TopNavbar() {

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 w-full h-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/30 flex items-center justify-between px-4"
      initial={{ opacity: 0, y: -64 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Left section: Hamburger and Logo (all screens) */}
      <div className="flex items-center gap-1 sm:gap-2">
        <HamburgerButton />
        <Link href="/" className="group flex items-center gap-1 sm:gap-2">
          <Projector className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:scale-110 transition-transform duration-300" /> {/* Changed Camera to Projector */}
          <span className="font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text group-hover:opacity-80 transition-opacity duration-300">
            <span className="font-pacifico text-xl sm:text-2xl">Hindi</span>
            <span className="font-headline tracking-wider text-sm sm:text-lg">picturefilm</span>
          </span>
        </Link>
      </div>

      {/* Center/Right section: SearchBar and User Icon */}
      <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0 justify-end">
        <div className="flex-1 flex justify-center sm:justify-center min-w-0 px-1 sm:px-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto sm:mx-0">
           <SearchBar />
        </div>
        {/* Desktop User Icon (hidden on mobile) */}
        <div className="hidden sm:flex items-center ml-2"> {/* Added ml-2 for spacing from searchbar */}
          <Link href="/settings" aria-label="User Profile / Settings">
            <UserCircle className="h-7 w-7 text-foreground/70 hover:text-primary transition-colors cursor-pointer" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

