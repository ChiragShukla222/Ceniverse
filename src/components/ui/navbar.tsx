'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from './theme-toggle'
import { SearchBar } from './search-bar'
import {
  UserCircleIcon,
  BookmarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Dashboard', path: '/dashboard' },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">CNiverse</span>
        </Link>

        <div className="flex-1 max-w-xl mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="relative text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
              {pathname === item.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[1.5px] left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <ThemeToggle />

          {session ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-sm font-medium"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span>{session.user?.name}</span>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md bg-card shadow-lg border border-border"
                  >
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                      >
                        <BookmarkIcon className="h-5 w-5 mr-2" />
                        My Watchlist
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm font-medium hover:text-primary"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 