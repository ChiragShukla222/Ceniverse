// // lib/auth.ts
// import { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { compare } from 'bcryptjs'
// import { connectToDatabase } from '@/lib/mongodb'

// if (!process.env.NEXTAUTH_SECRET) {
//   throw new Error('Missing NEXTAUTH_SECRET environment variable')
// }

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string
//       name?: string | null
//       email?: string | null
//       image?: string | null
//     }
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid credentials')
//         }

//         const { db } = await connectToDatabase()
//         const user = await db.collection('users').findOne({ email: credentials.email })

//         if (!user || !user.password) {
//           throw new Error('Invalid credentials')
//         }

//         const isPasswordValid = await compare(credentials.password, user.password)

//         if (!isPasswordValid) {
//           throw new Error('Invalid credentials')
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin',
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string
//       }
//       return session
//     },
//   },
// }
