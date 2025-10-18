// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    preset: 'node-server',
    serveStatic: true,
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3003
  },

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})
