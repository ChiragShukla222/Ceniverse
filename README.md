# CNiverse - Movie Recommendation System

A modern movie recommendation system built with Next.js 14, Tailwind CSS, and TMDB API.

## Features

- 🎬 Browse trending movies and discover new releases
- 🔍 Real-time search with instant results
- 💫 Beautiful animations and transitions
- 🌓 Dark/Light mode support
- ❤️ Save favorite movies
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast and optimized performance

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- TMDB API
- Zustand (State Management)
- MongoDB (Optional)
- NextAuth.js (Optional)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cniverse.git
   cd cniverse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```env
   # TMDB API Configuration
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

   # MongoDB Configuration (Optional)
   MONGODB_URI=mongodb://localhost:27017/

   # NextAuth Configuration (Optional)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

4. Get your TMDB API key:
   - Go to [TMDB](https://www.themoviedb.org/)
   - Create an account
   - Go to Settings > API
   - Request an API key
   - Copy the API key to your `.env.local` file

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # App router pages
│   ├── movie/          # Movie detail pages
│   ├── dashboard/      # User dashboard
│   └── auth/           # Authentication pages
├── components/         # React components
│   ├── ui/            # UI components
│   └── animations/    # Animation components
├── lib/               # Utility functions and API clients
├── store/             # Zustand store
├── styles/            # Global styles
└── utils/             # Helper functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library 