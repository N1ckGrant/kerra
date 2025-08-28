export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

  // Симуляція перевірки користувача
  const validCredentials = {
    email: 'admin@kerra.com',
    password: 'password123',
  }

  if (body.email !== validCredentials.email || body.password !== validCredentials.password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  // Симуляція створення JWT токена
  const token = 'valid-admin-token'
  
  return {
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: 1,
        email: body.email,
        name: 'Admin User',
        role: 'admin',
      },
    },
  }
})
