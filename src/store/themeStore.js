import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const THEME_STORAGE_KEY = 'hindipicturefilm-theme';

export const useThemeStore = create()(
  persist(
    (set, get) => ({
      theme: 'dark', 
      initializeTheme: () => {
        if (typeof window !== 'undefined') {
          const storedState = localStorage.getItem(THEME_STORAGE_KEY);
          let initialTheme = 'dark'; 

          if (storedState) {
            try {
              initialTheme = JSON.parse(storedState).state.theme;
            } catch (e) {
              console.error("Failed to parse theme from localStorage", e);
              const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              initialTheme = systemPrefersDark ? 'dark' : 'light';
            }
          } else { 
            const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            initialTheme = systemPrefersDark ? 'dark' : 'light';
          }
          
          set({ theme: initialTheme });
          document.documentElement.className = initialTheme;
        }
      },
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') {
            document.documentElement.className = newTheme;
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        if (typeof window !== 'undefined') {
          document.documentElement.className = theme;
        }
        set({ theme });
      },
    }),
    {
      name: THEME_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          document.documentElement.className = state.theme;
        }
      }
    }
  )
);
