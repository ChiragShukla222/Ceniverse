'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, router])
  console.log(query,"failed")

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? '0 0 0 2px rgba(var(--primary), 0.2)'
            : '0 0 0 0px rgba(var(--primary), 0)',
        }}
        className="relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search movies..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </motion.div>

      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-2 bg-card rounded-lg border border-border shadow-lg"
          >
            <p className="text-sm text-muted-foreground">
              Press Enter to search for "{query}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 