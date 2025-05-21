'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon, BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline'
import { useMovieStore } from '@/store/movie-store'

interface MovieCardProps {
  id: number
  title: string
  posterPath: string
  rating: number
}

export function MovieCard({ id, title, posterPath, rating }: MovieCardProps) {
  const { isFavorite, isInWatchlist, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = useMovieStore()

  const isFav = isFavorite(id)
  const isWatch = isInWatchlist(id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFav) {
      removeFromFavorites(id)
    } else {
      addToFavorites(id)
    }
  }

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWatch) {
      removeFromWatchlist(id)
    } else {
      addToWatchlist(id)
    }
  }

  return (
    <Link href={`/movie/${id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative overflow-hidden rounded-lg bg-card"
      >
        <div className="aspect-[2/3] relative">
          <Image
            src={posterPath}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Rating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1"
          >
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </motion.div>

          {/* Action Buttons */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20 transition-colors"
            >
              {isFav ? (
                <HeartIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartOutlineIcon className="h-5 w-5" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWatchlist}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20 transition-colors"
            >
              {isWatch ? (
                <BookmarkIcon className="h-5 w-5 text-primary" />
              ) : (
                <BookmarkOutlineIcon className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="text-white font-medium"
            >
              View Details
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Link>
  )
} 