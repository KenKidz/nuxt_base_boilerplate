# Nuxt Base Project Setup

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.x
- [pnpm](https://pnpm.io/) >= 10.x (packageManager: `pnpm@10.33.0`)

## Installation

```bash
pnpm install
```

## Development

Start the dev server at `http://localhost:3000`:

```bash
pnpm dev
```

## Project Structure

```
nuxt-base/
├── app/
│   ├── app.vue                  # Root component (UApp + NuxtLayout)
│   ├── app.config.ts            # Nuxt UI theme config (colors)
│   ├── assets/css/main.css      # Tailwind + Nuxt UI + custom theme
│   ├── components/              # Auto-imported Vue components
│   ├── i18n/
│   │   ├── i18n.config.ts       # i18n runtime config
│   │   └── locales/             # en.json, vi.json
│   └── pages/                   # File-based routing
├── public/                      # Static assets
├── nuxt.config.ts               # Nuxt configuration
├── eslint.config.mjs            # ESLint flat config
├── .prettierrc                  # Prettier config
├── .editorconfig                # Editor config
├── tsconfig.json                # TypeScript config (references .nuxt/)
├── pnpm-workspace.yaml          # pnpm workspace settings
└── renovate.json                # Renovate auto-update config
```

## Modules

| Module | Purpose |
|---|---|
| `@nuxt/eslint` | ESLint integration with flat config |
| `@nuxt/ui` | UI components + Tailwind CSS v4 |
| `@nuxt/image` | Image optimization |
| `@vueuse/nuxt` | VueUse composables (auto-imported) |
| `@pinia/nuxt` | Pinia state management |
| `@nuxtjs/i18n` | Internationalization (en/vi, `no_prefix` strategy) |

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run vue-tsc type checking |
| `pnpm postinstall` | Run `nuxt prepare` (auto-runs after install) |

---

## Package Configuration Details

### 1. `package.json`

```json
{
  "name": "nuxt-base",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "lint": "eslint .",
    "typecheck": "nuxt typecheck"
  },
  "dependencies": {
    "@iconify-json/lucide": "^1.2.102",
    "@iconify-json/simple-icons": "^1.2.78",
    "@nuxt/image": "^2.0.0",
    "@nuxt/ui": "^4.6.1",
    "@nuxtjs/i18n": "10.4.0",
    "@pinia/nuxt": "0.11.3",
    "@vueuse/nuxt": "14.3.0",
    "nuxt": "^4.4.2",
    "pinia": "^3.0.4",
    "tailwindcss": "^4.2.2",
    "vue": "^3.5.31"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@nuxt/eslint": "^1.15.2",
    "eslint": "^10.2.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-vue": "^10.9.2",
    "globals": "^17.6.0",
    "prettier": "^3.8.4",
    "prettier-plugin-tailwindcss": "^0.8.0",
    "typescript": "^6.0.2",
    "typescript-eslint": "^8.61.1",
    "vue-tsc": "^3.2.6"
  },
  "packageManager": "pnpm@10.33.0"
}
```

- **`"type": "module"`** — enables ES module syntax (`import/export`) in all `.ts`/`.js` files
- **`"private": true`** — prevents accidental publishing to npm
- **`"packageManager": "pnpm@10.33.0"`** — enforces pnpm via Corepack
- **`postinstall`** — runs `nuxt prepare` automatically after `pnpm install` to generate `.nuxt/` types
- **Runtime deps**: Nuxt 4, Vue 3, Nuxt UI v4, Tailwind v4, Pinia, VueUse, i18n, Image, Iconify icon sets
- **Dev deps**: ESLint + Prettier + TypeScript tooling

---

### 2. `nuxt.config.ts`

```ts
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
```

- **`modules`** — registers 6 Nuxt modules. Each auto-registers its own components, composables, and config
- **`devtools.enabled`** — enables Nuxt DevTools in browser
- **`css`** — global CSS loaded on every page (`~/` resolves to `app/`)
- **`compatibilityDate`** — pins Nuxt behavior for reproducibility
- **`i18n`** — locales, default locale (`en`), URL strategy (`no_prefix` = no `/en/` prefix)

---

### 3. `app/app.config.ts`

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  }
})
```

- **`primary: 'green'`** — maps to the green palette defined in `main.css` `@theme static` block
- **`neutral: 'slate'`** — base gray scale for backgrounds, borders, text
- This is runtime-configurable (no rebuild needed). Change color names here to switch palettes

---

### 4. `app/assets/css/main.css`

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: 'Public Sans', sans-serif;

  --color-green-50: #EFFDF5;
  --color-green-100: #D9FBE8;
  --color-green-200: #B3F5D1;
  --color-green-300: #75EDAE;
  --color-green-400: #00DC82;
  --color-green-500: #00C16A;
  --color-green-600: #00A155;
  --color-green-700: #007F45;
  --color-green-800: #016538;
  --color-green-900: #0A5331;
  --color-green-950: #052E16;
}
```

- **`@import "tailwindcss"`** — loads Tailwind CSS v4
- **`@import "@nuxt/ui"`** — loads Nuxt UI component styles
- **`@theme static { ... }`** — defines custom CSS variables for Tailwind. The `green-*` scale is what `primary: 'green'` references in `app.config.ts`. The `--font-sans` variable sets the global font to Public Sans
- To add a custom palette, define `--color-brand-50` through `--color-brand-950` here, then set `primary: 'brand'` in `app.config.ts`

---

### 5. `app/i18n/i18n.config.ts`

```ts
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
```

- **`legacy: false`** — uses Vue I18n v9 Composition API mode (use `useI18n()` composable)
- **`locale: 'en'`** — default runtime locale
- **`fallbackLocale: 'en'`** — fallback when a translation key is missing
- **`messages`** — imports locale JSON files from `app/i18n/locales/`

---

### 6. `eslint.config.mjs`

```js
import withNuxt from "./.nuxt/eslint.config.mjs";
import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default withNuxt([
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: ["node_modules", "dist", "public", ".nuxt"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {
      // Enforce trailing commas where possible
      "comma-dangle": ["off"],
      semi: ["off"],
      "@typescript-eslint/no-explicit-any": "off",
      "vue/multi-word-component-names": "off",
      "vue/attribute-hyphenation": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "vue/no-deprecated-slot-attribute": [
        "error",
        {
          ignore: ["my-component"],
        },
      ],
    },
  },
]);
```

- **`withNuxt(...)`** — wraps config with Nuxt-specific rules (generated by `@nuxt/eslint` into `.nuxt/`)
- **Config layers** (in order): core JS rules (`@eslint/js`), TypeScript rules (`typescript-eslint`), Vue 3 rules (`eslint-plugin-vue`), Prettier compat (`eslint-plugin-prettier`)
- **Vue SFC parsing** — `tseslint.parser` is used for `<script>` blocks in `.vue` files
- **Custom rule overrides** — disables `no-explicit-any`, `multi-word-component-names`, `attribute-hyphenation`, `ban-ts-comment` for flexibility
- **`ignores`** — skips `node_modules`, `dist`, `public`, `.nuxt`

---

### 7. `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "plugins": ["prettier-plugin-tailwindcss"],
  "printWidth": 80,
  "singleAttributePerLine": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "lf"
}
```

- **`semi: false`** — no semicolons
- **`singleQuote: true`** — single quotes over double
- **`trailingComma: "none"`** — no trailing commas
- **`plugins: ["prettier-plugin-tailwindcss"]`** — auto-sorts Tailwind CSS classes in templates
- **`singleAttributePerLine: true`** — one HTML attribute per line
- **`htmlWhitespaceSensitivity: "ignore"`** — consistent whitespace handling in HTML/Vue templates
- **`endOfLine: "lf"`** — enforce Unix line endings

---

### 8. `.prettierignore`

```
# Ignore build output directories
.nuxt/
dist/

# Ignore node modules
node_modules/

# Ignore environment variables files
.env
.env.*

# Ignore lock files
yarn.lock
package-lock.json

# Ignore logs
*.log

# Ignore compiled files
*.min.js
*.min.css

# Ignore specific file types
*.png
*.jpg
*.jpeg
*.gif
*.svg

# Ignore other generated files
coverage/
```

- Excludes build outputs, node_modules, env files, lock files, images, and compiled assets from Prettier formatting

---

### 11. `.editorconfig`

```ini
# editorconfig.org
root = true

[*]
indent_size = 2
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

- Enforces consistent editor settings: 2-space indentation, LF line endings, UTF-8, trailing whitespace trimming
- Markdown files preserve trailing whitespace (significant in `.md` syntax)

---

### 13. `.gitignore`

```gitignore
# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example
```

- Excludes Nuxt build artifacts (`.output`, `.nuxt`, `.nitro`, `dist`), node_modules, logs, IDE files, and local env files
- `!.env.example` — keeps example env file tracked in git

---

### 14. `app/app.vue`

```vue
<template>
  <UApp
    :toaster="{
      position: 'top-right'
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

- **`<UApp>`** — Nuxt UI root wrapper providing toast notifications (positioned top-right)
- **`<NuxtLayout>`** — enables layout system (default or named layouts)
- **`<NuxtPage>`** — renders file-based routes from `app/pages/`

---

## Adding i18n Locales

1. Create a new JSON file in `app/i18n/locales/` (e.g., `ja.json`)
2. Add the locale to `nuxt.config.ts` under `i18n.locales`:
   ```ts
   i18n: {
     locales: [
       { code: 'en', name: 'English' },
       { code: 'vi', name: 'Vietnamese' },
       { code: 'ja', name: 'Japanese' }
     ]
   }
   ```
3. Import and add the messages in `app/i18n/i18n.config.ts`

## Customizing Theme

Edit `app/assets/css/main.css` to modify the color palette. The `@theme static` block defines CSS custom properties used by Tailwind and Nuxt UI. Update `app/app.config.ts` to change the primary/neutral color names.

## Deployment

See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for platform-specific instructions. The project includes a Vercel deploy button in the README.

## Renovate

[Renovate](https://github.com/apps/renovate) is configured via `renovate.json` to auto-update dependencies with lock file maintenance enabled.
