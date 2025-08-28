<template>
  <div class="api-demo-page">
    <h1>API Демонстрація</h1>
    <p>Тестування API ендпоінтів</p>

    <ApiTest />

    <div class="back-link">
      <NuxtLink to="/">← Повернутись на головну</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'API Демо',
})
</script>

<style scoped>
.api-demo-page {
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

p {
  text-align: center;
  margin-bottom: 2rem;
}

.back-link {
  text-align: center;
  margin-top: 2rem;
}

.back-link a {
  color: #007bff;
  text-decoration: none;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>
