// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Environment-specific configuration
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: process.env.API_SECRET,

    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000',
      environment: process.env.NODE_ENV || 'development',
      appName: 'Kerra',
    },
  },

  // Environment-specific settings
  app: {
    head: {
      title:
        process.env.NODE_ENV === 'production'
          ? 'Kerra'
          : `Kerra (${process.env.NODE_ENV})`,
    },
  },

  // Build configuration
  nitro: {
    preset:
      process.env.NODE_ENV === 'production' ? 'node-server' : 'node-server',
  },

  // Development tools
  typescript: {
    strict: true,
    typeCheck: false,
  },

  // CSS and styling
  css: ['~/assets/css/main.css'],

  // Modules
  modules: [
    // Add modules here
  ],

  // Build optimization
  build: {
    transpile: [],
  },

  // Development server
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
})
