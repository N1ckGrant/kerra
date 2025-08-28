import { authenticateUser, createJWT } from '../../utils/auth'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

  try {
    const user = await authenticateUser(body.email, body.password)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      })
    }

    if (!user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Account is disabled',
      })
    }

    const token = createJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Authentication failed',
    })
  }
})
