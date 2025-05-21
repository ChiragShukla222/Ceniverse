'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Movie } from '@/lib/tmdb'
import { searchMovies } from '@/lib/tmdb'
import { MovieCard } from '@/components/ui/movie-card'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return
      setLoading(true)
      try {
        const results = await searchMovies(query)
        setMovies(results)
      } catch (error) {
        console.error('Error searching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [query])

  if (!query) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
        <p className="text-muted-foreground">Enter a search term to find movies</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Searching for "{query}"...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          Found {movies.length} results for "{query}"
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </motion.div>

      {movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No movies found for "{query}"</p>
        </div>
      )}
    </div>
  )
} 