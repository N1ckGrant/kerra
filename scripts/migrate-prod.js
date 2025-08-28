#!/usr/bin/env node

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import * as schema from '../server/database/schema.js'

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL не знайдено')
    process.exit(1)
  }

  console.log('🔄 Підключення до бази даних...')

  const client = postgres(databaseUrl, { max: 1 })
  const db = drizzle(client, { schema })

  try {
    console.log('🚀 Запуск міграцій...')
    await migrate(db, { migrationsFolder: './server/database/migrations' })
    console.log('✅ Міграції виконано успішно!')
  } catch (error) {
    console.error('❌ Помилка міграції:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

runMigrations()
