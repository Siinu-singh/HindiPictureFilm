
"use client";

import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null during server rendering and initial client mount
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-9 h-9 rounded-full text-muted-foreground" /* Adjusted size for sidebar */
        disabled
      >
        <Sun className="h-5 w-5" /> {/* Adjusted icon size */}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="w-9 h-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background" /* Adjusted size and styling */
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" /> /* Adjusted icon size */
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" /> /* Adjusted icon size */
      )}
    </Button>
  );
}
