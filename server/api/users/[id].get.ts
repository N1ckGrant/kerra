export default defineEventHandler(async event => {
  const userId = getRouterParam(event, 'id')

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  // Тимчасові дані для тестування
  const users = [
    { id: 1, name: 'Олександр', email: 'alex@example.com', role: 'admin' },
    { id: 2, name: 'Марія', email: 'maria@example.com', role: 'user' },
    { id: 3, name: 'Іван', email: 'ivan@example.com', role: 'user' },
  ]

  const user = users.find(u => u.id === parseInt(userId))

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  return {
    success: true,
    data: user,
  }
})
