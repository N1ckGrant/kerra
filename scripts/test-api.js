#!/usr/bin/env node

const http = require('http')

const BASE_URL = process.env.API_BASE || 'http://localhost:3000'

// Функція для HTTP запитів
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let data = ''
      res.on('data', chunk => {
        data += chunk
      })
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data)
          resolve({ status: res.statusCode, data: jsonData })
        } catch (e) {
          resolve({ status: res.statusCode, data: data })
        }
      })
    })

    req.on('error', reject)

    if (postData) {
      req.write(JSON.stringify(postData))
    }

    req.end()
  })
}

// Тести API
async function runTests() {
  console.log('🧪 Запуск тестів API...\n')

  try {
    // Тест health endpoint
    console.log('1. Тестування /api/health')
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/health',
      method: 'GET',
    })

    if (healthResponse.status === 200 && healthResponse.data.status === 'ok') {
      console.log('✅ Health check пройшов')
    } else {
      console.log('❌ Health check не вдався')
      console.log(healthResponse)
    }

    // Тест users endpoint
    console.log('\n2. Тестування /api/users')
    const usersResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
      method: 'GET',
    })

    if (usersResponse.status === 200 && usersResponse.data.success) {
      console.log('✅ Users endpoint працює')
      console.log(`   Знайдено ${usersResponse.data.total} користувачів`)
    } else {
      console.log('❌ Users endpoint не працює')
    }

    // Тест створення користувача
    console.log('\n3. Тестування створення користувача')
    const newUserResponse = await makeRequest(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        name: 'Тестовий Користувач',
        email: 'test@example.com',
      }
    )

    if (newUserResponse.status === 200 && newUserResponse.data.success) {
      console.log('✅ Створення користувача працює')
    } else {
      console.log('❌ Створення користувача не працює')
    }

    console.log('\n🎉 Всі тести завершені!')
  } catch (error) {
    console.error('❌ Помилка під час тестування:', error.message)
    process.exit(1)
  }
}

runTests()
