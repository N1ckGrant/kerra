import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { db } from '../database/connection'
import { users, sessions, type User } from '../database/schema'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const SALT_ROUNDS = 12

// Хешування паролю
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

// Перевірка паролю
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Створення JWT токена
export function createJWT(payload: { userId: number, email: string, role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Перевірка JWT токена
export function verifyJWT(token: string): { userId: number, email: string, role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number, email: string, role: string }
  } catch {
    return null
  }
}

// Створення користувача
export async function createUser(name: string, email: string, password: string, role = 'user') {
  const hashedPassword = await hashPassword(password)
  
  const [user] = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    role,
  }).returning()
  
  return user
}

// Аутентифікація користувача
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  
  if (!user) return null
  
  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) return null
  
  return user
}

// Отримання користувача по ID
export async function getUserById(id: number): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)
  return user || null
}

// Створення сесії
export async function createSession(userId: number): Promise<string> {
  const token = createJWT({ 
    userId, 
    email: '', // Заповнимо пізніше
    role: '' 
  })
  
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 днів
  
  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  })
  
  return token
}

// Видалення сесії (logout)
export async function deleteSession(token: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.token, token))
}
