<template>
  <div class="api-test">
    <h2>API Тестування</h2>

    <div class="test-section">
      <h3>Health Check</h3>
      <button @click="testHealth" :disabled="loading">
        {{ loading ? 'Завантаження...' : 'Перевірити Health' }}
      </button>
      <pre v-if="healthResult">{{ JSON.stringify(healthResult, null, 2) }}</pre>
    </div>

    <div class="test-section">
      <h3>Користувачі</h3>
      <button @click="getUsers" :disabled="loading">
        {{ loading ? 'Завантаження...' : 'Отримати користувачів' }}
      </button>
      <pre v-if="usersResult">{{ JSON.stringify(usersResult, null, 2) }}</pre>
    </div>

    <div class="test-section">
      <h3>Створити користувача</h3>
      <input v-model="newUser.name" placeholder="Ім'я" />
      <input v-model="newUser.email" placeholder="Email" />
      <button @click="createUser" :disabled="loading">
        {{ loading ? 'Завантаження...' : 'Створити' }}
      </button>
      <pre v-if="createResult">{{ JSON.stringify(createResult, null, 2) }}</pre>
    </div>

    <div class="test-section">
      <h3>Авторизація</h3>
      <input v-model="credentials.email" placeholder="Email" />
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Пароль"
      />
      <button @click="login" :disabled="loading">
        {{ loading ? 'Завантаження...' : 'Увійти' }}
      </button>
      <pre v-if="loginResult">{{ JSON.stringify(loginResult, null, 2) }}</pre>
    </div>

    <div v-if="error" class="error">
      <h4>Помилка:</h4>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref<string | null>(null)
const healthResult = ref(null)
const usersResult = ref(null)
const createResult = ref(null)
const loginResult = ref(null)

const newUser = ref({
  name: '',
  email: '',
})

const credentials = ref({
  email: 'admin@kerra.com',
  password: 'password123',
})

async function makeRequest(url: string, options: any = {}) {
  loading.value = true
  error.value = null

  try {
    const response = await $fetch(url, options)
    return response
  } catch (err: any) {
    error.value = err.message || 'Невідома помилка'
    throw err
  } finally {
    loading.value = false
  }
}

async function testHealth() {
  try {
    healthResult.value = await makeRequest('/api/health')
  } catch (err) {
    console.error('Health check помилка:', err)
  }
}

async function getUsers() {
  try {
    usersResult.value = await makeRequest('/api/users')
  } catch (err) {
    console.error('Users помилка:', err)
  }
}

async function createUser() {
  if (!newUser.value.name || !newUser.value.email) {
    error.value = 'Заповніть всі поля'
    return
  }

  try {
    createResult.value = await makeRequest('/api/users', {
      method: 'POST',
      body: newUser.value,
    })

    // Очистити форму
    newUser.value = { name: '', email: '' }
  } catch (err) {
    console.error('Create user помилка:', err)
  }
}

async function login() {
  if (!credentials.value.email || !credentials.value.password) {
    error.value = 'Заповніть всі поля'
    return
  }

  try {
    loginResult.value = await makeRequest('/api/auth/login', {
      method: 'POST',
      body: credentials.value,
    })
  } catch (err) {
    console.error('Login помилка:', err)
  }
}
</script>

<style scoped>
.api-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.test-section h3 {
  margin-top: 0;
  color: #333;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
}

pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

.error {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
