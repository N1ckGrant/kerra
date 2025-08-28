export default defineEventHandler(async event => {
  // Налаштування CORS
  setHeader(event, 'Access-Control-Allow-Origin', '*')
  setHeader(
    event,
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  setHeader(
    event,
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )

  // Обробка preflight запитів
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 200
    return ''
  }
})
