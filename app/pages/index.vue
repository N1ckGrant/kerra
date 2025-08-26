<template>
  <div class="home-page">
    <h1>Ласкаво просимо до Nuxt 4!</h1>
    <p>Це головна сторінка вашого додатку</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Головна'
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
</style>
