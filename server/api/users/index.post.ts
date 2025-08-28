import { createUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Валідація
  if (!body.name || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email and password are required',
    })
  }

  // Перевірка email формату
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format',
    })
  }

  try {
    const newUser = await createUser(
      body.name,
      body.email,
      body.password,
      body.role || 'user'
    )

    return {
      success: true,
      message: 'User created successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    }
  } catch (error: any) {
    // Перевірка на дублікат email
    if (error.code === '23505') {
      throw createError({
        statusCode: 409,
        statusMessage: 'User with this email already exists',
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user',
    })
  }
})
