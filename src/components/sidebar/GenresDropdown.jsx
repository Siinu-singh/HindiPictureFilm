
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, List } from 'lucide-react';
import { useSidebarStore } from '@/store/sidebarStore';
import { getGenres } from '@/lib/data'; // Import function to fetch genres
import { Skeleton } from '@/components/ui/skeleton';

const dropdownVariants = {
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const listItemVariants = {
  open: { opacity: 1, x: 0, transition: { staggerChildren: 0.05 } },
  closed: { opacity: 0, x: -10 },
};

export default function GenresDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { closeSidebar } = useSidebarStore();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const genresData = await getGenres();
        // Map to the structure expected by the component if necessary, or use directly
        setCategories(genresData.map(g => ({ name: g.name, href: `/movies?genre=${encodeURIComponent(g.name.toLowerCase())}` })));
      } catch (error) {
        console.error("Failed to fetch genres for dropdown:", error);
        setCategories([]); // Set to empty array on error
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full gap-3 p-3 rounded-lg text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
        aria-expanded={isOpen}
        aria-controls="genres-category-list"
      >
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium">Genres</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary/70 group-hover:text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="genres-category-list"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden ml-4 pl-4 border-l border-primary/20"
          >
            {loading ? (
              [...Array(5)].map((_, i) => (
                <motion.li key={`skel-${i}`} variants={listItemVariants} className="py-1">
                   <Skeleton className="h-7 w-3/4 rounded-md" />
                </motion.li>
              ))
            ) : categories.length === 0 ? (
                 <motion.li variants={listItemVariants} className="py-1">
                    <p className="p-2 text-sm text-muted-foreground">No genres found.</p>
                 </motion.li>
            ) : (
              categories.map((category) => (
                <motion.li key={category.name} variants={listItemVariants} className="py-1">
                  <Link
                    href={category.href}
                    onClick={() => {
                      closeSidebar();
                    }}
                    className="block p-2 rounded-md text-sm text-foreground/70 hover:bg-primary/5 hover:text-primary transition-colors duration-150"
                  >
                    {category.name}
                  </Link>
                </motion.li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
