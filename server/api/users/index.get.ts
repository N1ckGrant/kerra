import { db } from '../../database/connection'
import { users } from '../../database/schema'

export default defineEventHandler(async event => {
  try {
    // Якщо немає бази даних (dev режим), повертаємо mock дані
    if (!db) {
      const mockUsers = [
        {
          id: 1,
          name: 'Олександр',
          email: 'alex@example.com',
          role: 'user',
          isActive: true,
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Марія',
          email: 'maria@example.com',
          role: 'user',
          isActive: true,
          createdAt: new Date(),
        },
        {
          id: 3,
          name: 'Іван',
          email: 'ivan@example.com',
          role: 'admin',
          isActive: true,
          createdAt: new Date(),
        },
      ]

      return {
        success: true,
        data: mockUsers,
        total: mockUsers.length,
      }
    }

    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)

    return {
      success: true,
      data: allUsers,
      total: allUsers.length,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users',
    })
  }
})
