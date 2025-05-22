// import { MongoClient } from 'mongodb'

// const MONGODB_URI = process.env.MONGODB_URI
// // const MONGODB_DB = process.env.MONGODB_DB

// if (!MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }
// // if (!MONGODB_DB) {
// //   throw new Error('Invalid/Missing environment variable: "MONGODB_DB"')
// // }

// console.log('[MongoDB] URI:', MONGODB_URI)
// // console.log('[MongoDB] DB Name:', MONGODB_DB)

// const uri = MONGODB_URI
// const options = {}

// let client: MongoClient
// let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === 'development') {
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>
//   }

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     globalWithMongo._mongoClientPromise = client.connect()
//   }
//   clientPromise = globalWithMongo._mongoClientPromise!
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export default clientPromise

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise
//     if (!client) {
//       console.error('[MongoDB] Client is undefined after connection')
//       throw new Error('MongoDB client is undefined')
//     }
//     // const db = client.db(MONGODB_DB)
//     // if (!db) {
//     //   console.error('[MongoDB] Failed to get DB instance:', MONGODB_DB)
//     //   throw new Error(`Failed to get DB instance: ${MONGODB_DB}`)
//     // }
//     // console.log('[MongoDB] Successfully connected to DB:', MONGODB_DB)
//     return { client, db: client.db() }
//   } catch (error) {
//     console.error('[MongoDB] Error connecting to database:', error)
//     throw error
//   }
// }