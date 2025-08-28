import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Підключення до бази даних
const connectionString = process.env.DATABASE_URL

// Експорти для dev режиму без бази даних
let db: any = null
let testConnection: () => Promise<boolean>

if (!connectionString) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️  DATABASE_URL not found. Running in development mode without database.')
    
    // Mock для dev режиму
    db = null
    testConnection = async () => {
      console.log('⚠️  Running without database in development mode')
      return false
    }
  } else {
    throw new Error('DATABASE_URL environment variable is required')
  }
} else {
  // Створюємо підключення до реальної бази
  const client = postgres(connectionString)
  db = drizzle(client, { schema })

  // Функція для перевірки підключення
  testConnection = async () => {
    try {
      const result = await client`SELECT version()`
      console.log('✅ Database connected:', result[0].version)
      return true
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      return false
    }
  }
}

export { db, testConnection }