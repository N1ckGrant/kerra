export default defineEventHandler(async event => {
  // Пропускаємо публічні роути
  const publicRoutes = ['/api/health', '/api/auth/login']

  if (publicRoutes.some(route => event.node.req.url?.startsWith(route))) {
    return
  }

  // Перевіряємо авторизацію для захищених роутів
  if (event.node.req.url?.startsWith('/api/admin')) {
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Missing or invalid token',
      })
    }

    // Тут би була перевірка JWT токена
    // const token = authHeader.replace('Bearer ', '')
    // const isValid = await verifyToken(token)

    // Поки що симулюємо валідний токен
    const token = authHeader.replace('Bearer ', '')
    if (token !== 'valid-admin-token') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Invalid token',
      })
    }
  }
})
