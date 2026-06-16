// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-15',

  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'vi', name: 'Vietnamese' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix'
  },
})
