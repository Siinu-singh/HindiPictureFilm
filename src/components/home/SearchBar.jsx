
"use client";

import { Search, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getMovies } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef(null);

  const debouncedSearch = useCallback(async (searchQuery) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      setIsPopupOpen(searchQuery.trim().length > 0); 
      return;
    }
    setIsLoading(true);
    setIsPopupOpen(true); // Ensure popup stays open during loading

    // Simulate a 30-second loading delay
    await new Promise(resolve => setTimeout(resolve, 30000));

    try {
      const movies = await getMovies({ title: searchQuery, limit: 5 });
      setResults(movies);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsPopupOpen(false);
      setIsLoading(false);
      return;
    }
    
    if (query.trim().length < 2) {
      setResults([]); 
      setIsLoading(false);
      setIsPopupOpen(true); 
      return;
    }

    const handler = setTimeout(() => {
      debouncedSearch(query);
    }, 500); // Standard debounce time before initiating the 30s load

    return () => {
      clearTimeout(handler);
    };
  }, [query, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    if (query.trim().length > 0) { 
      setIsPopupOpen(true);
    }
  };
  
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim().length > 0) {
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(false);
    }
  };

  return (
    <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" ref={searchContainerRef}>
      <div className="relative flex items-center">
        <Input
          type="search"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="w-full pl-10 pr-10 py-2 rounded-full bg-card/80 backdrop-blur-md text-sm placeholder:text-xs md:placeholder:text-sm placeholder:text-muted-foreground border border-border/30 group-focus-within:border-primary/50 transition-all focus:ring-2 focus:ring-primary/30"
          aria-label="Search for movies"
          autoComplete="off"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
         {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsPopupOpen(false);
            }}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="absolute inset-0 rounded-full pointer-events-none 
                      group-focus-within:shadow-[0_0_15px_2px_hsla(var(--primary-rgb),0.2)] 
                      transition-shadow duration-300"></div>

      {isPopupOpen && (
        <div className="absolute top-full mt-2 w-[min(80vw,400px)] right-0 sm:left-0 sm:right-auto sm:w-full rounded-md bg-card shadow-xl border border-border/50 z-50 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
          {isLoading && (
            <div className="p-4 flex items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Searching...
            </div>
          )}
          {!isLoading && query.trim().length > 0 && query.trim().length < 2 && (
            <p className="p-4 text-sm text-muted-foreground text-center">Type at least 2 characters to search.</p>
          )}
          {!isLoading && results.length === 0 && query.trim().length >= 2 && (
            <p className="p-4 text-sm text-muted-foreground text-center">No movies found for "{query}".</p>
          )}
          {!isLoading && results.length > 0 && (
            <ul>
              {results.map((movie) => (
                <li key={movie.id}>
                  <Link
                    href={`/movies/${movie.id}`}
                    className="flex items-center p-2 sm:p-3 hover:bg-accent/10 transition-colors duration-150 rounded-md mx-1 my-0.5"
                    onClick={() => {
                      setIsPopupOpen(false); 
                      setQuery(''); 
                    }}
                  >
                    <Image
                      src={movie.posterUrl}
                      alt={movie.title}
                      width={36} 
                      height={54}
                      className="w-9 h-[54px] mr-2 sm:w-10 sm:h-[60px] sm:mr-3 object-cover rounded-sm shrink-0"
                      data-ai-hint={movie.dataAiHintPoster || "movie poster"}
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-sm text-foreground truncate">{movie.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {movie.releaseYear} &bull; {movie.genres.slice(0,2).join(', ')}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
           {!isLoading && query.trim().length > 0 && results.length > 0 && (
             <div className="p-2 text-center border-t border-border/30 mt-1">
                <Link 
                    href={`/movies?title=${encodeURIComponent(query)}`}
                    className="text-xs sm:text-sm text-primary hover:underline"
                    onClick={() => setIsPopupOpen(false)}
                >
                    See all results for "{query}"
                </Link>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
