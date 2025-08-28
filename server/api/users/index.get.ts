export default defineEventHandler(async (event) => {
  // Тимчасові дані для тестування
  const users = [
    { id: 1, name: 'Олександр', email: 'alex@example.com' },
    { id: 2, name: 'Марія', email: 'maria@example.com' },
    { id: 3, name: 'Іван', email: 'ivan@example.com' },
  ]

  return {
    success: true,
    data: users,
    total: users.length,
  }
})
