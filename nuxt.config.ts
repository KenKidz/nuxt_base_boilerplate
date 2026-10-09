// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
  ],

  $env: {
    e2e: {
      buildDir: '.nuxt/e2e',
      nitro: { output: { dir: '.nuxt/e2e/output' } },
    },
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  i18n: {
    restructureDir: 'app/i18n',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'vi', name: 'Vietnamese' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },

  components: [
    {
      path: '~/components',
      // Flat names: `components/ui/AppDataTable.vue` -> <AppDataTable>.
      pathPrefix: false,
    },
  ],
});
