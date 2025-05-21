'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { getMovieDetails, getBackdropUrl, Movie } from '@/lib/tmdb'
import { useMovieStore } from '@/store/movie-store'

export default function MoviePage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieStore()

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(parseInt(params.id))
      setMovie(data)
    }
    fetchMovie()
  }, [params.id])

  if (!movie) {
    return <div>Loading...</div>
  }

  const isFav = isFavorite(movie.id)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <Image
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <div className="flex items-end gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-48 h-72 rounded-lg overflow-hidden"
              >
                <Image
                  src={getBackdropUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {movie.overview}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isFav ? removeFromFavorites(movie.id) : addToFavorites(movie.id)}
                  className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground"
                >
                  {isFav ? (
                    <HeartIcon className="h-5 w-5" />
                  ) : (
                    <HeartOutlineIcon className="h-5 w-5" />
                  )}
                  {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 