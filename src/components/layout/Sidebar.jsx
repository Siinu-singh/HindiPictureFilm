
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Clapperboard, Tv, MonitorPlay, ListChecks, Heart, Settings, UserCircle } from 'lucide-react';
import { useSidebarStore } from '@/store/sidebarStore';
import { Separator } from '@/components/ui/separator';
import GenresDropdown from '@/components/sidebar/GenresDropdown';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';

const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.05 },
  },
  closed: {
    x: '-100%',
    transition: { type: 'spring', stiffness: 300, damping: 30, when: "afterChildren" },
  },
};

const backdropVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const menuItemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -20 },
};

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/movies', icon: Clapperboard, label: 'Movies' },
  { href: '/tvshows', icon: Tv, label: 'TV Shows' },
  { href: '/livetv', icon: MonitorPlay, label: 'Live TV' },
  { href: '/favorites', icon: Heart, label: 'Favorites' },
];


export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarStore();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, closeSidebar]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            aria-hidden="true"
          />
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full w-72 bg-background/80 backdrop-blur-lg shadow-2xl z-50 flex flex-col p-6 border-r border-border"
            aria-label="Main navigation"
            role="navigation"
          >
            <motion.div variants={menuItemVariants} className="mb-8">
              <Link href="/" className="flex items-center gap-3 group" onClick={closeSidebar}>
                <span 
                  className="text-2xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text group-hover:opacity-80 transition-opacity duration-300"
                >
                  <span className="font-pacifico">Hindi</span><span className="font-headline tracking-wider">picturefilm</span>
                </span>
              </Link>
            </motion.div>

            <nav className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent pr-2">
              <ul>
                {navItems.map((item) => (
                  <motion.li key={item.label} variants={menuItemVariants} className="mb-1">
                    <Link
                      href={item.href}
                      onClick={closeSidebar}
                      className="flex items-center gap-3 p-3 rounded-lg text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                    >
                      <item.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
                 <motion.li variants={menuItemVariants} className="mb-1">
                   <GenresDropdown />
                 </motion.li>
                 <motion.li variants={menuItemVariants} className="mb-1">
                    <Link
                      href="/genres"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 p-3 rounded-lg text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                    >
                      <ListChecks className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">All Genres</span>
                    </Link>
                  </motion.li>
              </ul>
            </nav>

            <Separator className="my-4 bg-border/50" />
            
            <motion.div variants={menuItemVariants} className="mb-2">
               <Link
                href="/settings"
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg text-foreground/80 hover:bg-secondary/80 hover:text-foreground transition-colors duration-200 group w-full"
              >
                <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </motion.div>

            <motion.div variants={menuItemVariants} className="flex items-center justify-between">
               <Link
                href="#" 
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg text-foreground/80 hover:bg-secondary/80 hover:text-foreground transition-colors duration-200 group"
              >
                <UserCircle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">User Profile</span>
              </Link>
              <ThemeToggleButton />
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

