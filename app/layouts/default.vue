<template>
  <div class="layout">
    <header class="header">
      <nav>
        <NuxtLink to="/">Головна</NuxtLink>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>&copy; 2024 Nuxt 4 App</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

.header nav {
  max-width: 1200px;
  margin: 0 auto;
}

.header a {
  color: white;
  text-decoration: none;
}

.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background: #34495e;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
