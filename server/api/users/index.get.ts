import { db } from '../../database/connection'
import { users } from '../../database/schema'

export default defineEventHandler(async event => {
  try {
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
