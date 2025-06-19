
import moviesData from '@/data/movies.json';
import tvShowsData from '@/data/tvshows.json';
import liveTVData from '@/data/livetv.json';
import genresData from '@/data/genres.json';
import bannersData from '@/data/banners.json'; // Assuming banners.json exists or will be created

// Simulate API delay
const API_DELAY = 50;

export async function getMovies(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMovies = moviesData;
      if (filters.genre) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.genres.map(g => g.toLowerCase()).includes(filters.genre.toLowerCase())
        );
      }
      if (filters.title && filters.title.trim() !== '') {
        const searchTerm = filters.title.toLowerCase().trim();
        filteredMovies = filteredMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchTerm)
        );
      }
      if (filters.limit) {
        filteredMovies = filteredMovies.slice(0, filters.limit);
      }
      resolve(filteredMovies);
    }, API_DELAY);
  });
}

export async function getMovieById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(moviesData.find(movie => movie.id === id));
    }, API_DELAY);
  });
}

export async function getTVShows(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTVShows = tvShowsData;
      if (filters.genre) {
        filteredTVShows = filteredTVShows.filter(show => 
          show.genres.map(g => g.toLowerCase()).includes(filters.genre.toLowerCase())
        );
      }
      if (filters.limit) {
        filteredTVShows = filteredTVShows.slice(0, filters.limit);
      }
      resolve(filteredTVShows);
    }, API_DELAY);
  });
}

export async function getTVShowById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tvShowsData.find(show => show.id === id));
    }, API_DELAY);
  });
}

export async function getLiveTVChannels(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
        let filteredLiveTV = liveTVData;
        if (filters.genre) {
            filteredLiveTV = filteredLiveTV.filter(channel => 
              channel.genre.toLowerCase() === filters.genre.toLowerCase()
            );
        }
        if (filters.limit) {
            filteredLiveTV = filteredLiveTV.slice(0, filters.limit);
        }
        resolve(filteredLiveTV);
    }, API_DELAY);
  });
}

export async function getLiveTVChannelById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(liveTVData.find(channel => channel.id === id));
    }, API_DELAY);
  });
}

export async function getGenres() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(genresData);
    }, API_DELAY);
  });
}

export async function getGenreById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(genresData.find(genre => genre.id === id));
    }, API_DELAY);
  });
}


export async function getBanners() {
  return new Promise((resolve) => {
    // If bannersData is directly imported and not too large, you might not need a promise
    // For consistency with other data fetching methods:
    setTimeout(() => resolve(bannersData), API_DELAY);
  });
}

// This function was in the original file structure, keeping it for now.
// However, getMovies with genre filter is preferred.
export async function getMoviesByGenre(genreName) {
  return new Promise((resolve) => setTimeout(() => resolve(moviesData.filter(movie => movie.genres.includes(genreName))), 50));
}
