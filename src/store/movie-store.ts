import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MovieState {
  favorites: number[]
  watchlist: number[]
  isFavorite: (id: number) => boolean
  isInWatchlist: (id: number) => boolean
  addToFavorites: (id: number) => void
  removeFromFavorites: (id: number) => void
  addToWatchlist: (id: number) => void
  removeFromWatchlist: (id: number) => void
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      isFavorite: (id: number) => get().favorites.includes(id),
      isInWatchlist: (id: number) => get().watchlist.includes(id),
      addToFavorites: (id: number) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),
      removeFromFavorites: (id: number) =>
        set((state) => ({
          favorites: state.favorites.filter((movieId) => movieId !== id),
        })),
      addToWatchlist: (id: number) =>
        set((state) => ({
          watchlist: [...state.watchlist, id],
        })),
      removeFromWatchlist: (id: number) =>
        set((state) => ({
          watchlist: state.watchlist.filter((movieId) => movieId !== id),
        })),
    }),
    {
      name: 'movie-storage',
    }
  )
) 