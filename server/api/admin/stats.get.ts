export default defineEventHandler(async event => {
  // Цей ендпоінт буде захищений middleware/auth.ts

  return {
    success: true,
    data: {
      totalUsers: 150,
      activeUsers: 89,
      newUsersToday: 12,
      revenue: 25000,
      orders: 45,
      uptime: '99.9%',
      lastUpdated: new Date().toISOString(),
    },
  }
})
