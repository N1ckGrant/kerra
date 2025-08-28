export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Базова валідація
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required',
    })
  }

  // Симуляція створення користувача
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    email: body.email,
    role: body.role || 'user',
    createdAt: new Date().toISOString(),
  }

  return {
    success: true,
    message: 'User created successfully',
    data: newUser,
  }
})
