// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxthub/core'
  ],
  css: ['~/assets/css/main.css'],
  hub: { db: 'sqlite' },
  icon: {
    clientBundle: {
      icons: [
        'lucide:book-open-text',
        'lucide:building-2',
        'lucide:log-in',
        'lucide:hard-drive',
        'lucide:home',
        'lucide:trash-2',
        'lucide:pencil',
        'lucide:list-todo',
        'material-symbols:storage',
        'material-symbols:switch'
      ]
    }
  }
})