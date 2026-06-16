import en from './locales/en.json'
import vi from './locales/vi.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    vi
  }
}))
