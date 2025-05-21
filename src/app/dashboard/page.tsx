'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Movie } from '@/lib/tmdb'
import { MovieCard } from '@/components/ui/movie-card'
import { useMovieStore } from '@/store/movie-store'
import { getMovieDetails } from '@/lib/tmdb'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Dashboard() {
  const { data: session } = useSession()
  const { favorites, watchlist } = useMovieStore()
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const [favMovies, watchMovies] = await Promise.all([
          Promise.all(favorites.map(id => getMovieDetails(id))),
          Promise.all(watchlist.map(id => getMovieDetails(id)))
        ])
        setFavoriteMovies(favMovies)
        setWatchlistMovies(watchMovies)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [favorites, watchlist])

  if (!session) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
        <p className="text-muted-foreground">
          You need to be signed in to view your dashboard
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {session.user?.name}</h1>
        <p className="text-muted-foreground">
          Manage your favorite movies and watchlist
        </p>
      </div>

      {/* Favorites Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Favorite Movies</h2>
        {loading ? (
          <div className="text-center py-12">
            <p>Loading favorites...</p>
          </div>
        ) : favoriteMovies.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {favoriteMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No favorite movies yet</p>
          </div>
        )}
      </section>

      {/* Watchlist Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Watchlist</h2>
        {loading ? (
          <div className="text-center py-12">
            <p>Loading watchlist...</p>
          </div>
        ) : watchlistMovies.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {watchlistMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your watchlist is empty</p>
          </div>
        )}
      </section>
    </div>
  )
} 