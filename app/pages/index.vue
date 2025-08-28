<template>
  <div class="home-page">
    <h1>Ласкаво просимо до Kerra!</h1>
    <p>Це головна сторінка вашого додатку з API бекендом</p>
    
    <div class="navigation">
      <NuxtLink to="/content" class="nav-link">Контент</NuxtLink>
      <NuxtLink to="/api-demo" class="nav-link">API Демо</NuxtLink>
    </div>
    
    <div class="info">
      <h2>Доступні API ендпоінти:</h2>
      <ul>
        <li><code>GET /api/health</code> - перевірка здоров'я</li>
        <li><code>GET /api/users</code> - список користувачів</li>
        <li><code>POST /api/users</code> - створити користувача</li>
        <li><code>GET /api/users/:id</code> - отримати користувача</li>
        <li><code>POST /api/auth/login</code> - авторизація</li>
        <li><code>GET /api/admin/stats</code> - статистика (потребує авторизації)</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Головна',
})
</script>

<style scoped>
.home-page {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.navigation {
  margin: 2rem 0;
}

.nav-link {
  display: inline-block;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: #0056b3;
}

.info {
  margin-top: 2rem;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.info ul {
  list-style: none;
  padding: 0;
}

.info li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.info code {
  background: #e9ecef;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}
</style>
