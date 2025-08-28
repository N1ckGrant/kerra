import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Підключення до бази даних
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

// Створюємо підключення
const client = postgres(connectionString)
export const db = drizzle(client, { schema })

// Функція для перевірки підключення
export async function testConnection() {
  try {
    const result = await client`SELECT version()`
    console.log('✅ Database connected:', result[0].version)
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}
