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
│   ├── components/              # Auto-imported (flat names, pathPrefix: false)
│   ├── i18n/
│   │   ├── i18n.config.ts       # i18n runtime config
│   │   └── locales/             # en.json, vi.json
│   └── pages/                   # File-based routing
├── test/                        # Test suites (see Testing)
│   ├── unit/                    # Vitest, node environment
│   ├── nuxt/                    # Vitest, Nuxt environment
│   └── e2e/                     # Playwright
├── public/                      # Static assets
├── nuxt.config.ts               # Nuxt configuration
├── vitest.config.ts             # Vitest projects (unit + nuxt)
├── playwright.config.ts         # Playwright E2E config (shared prod server)
├── eslint.config.mjs            # ESLint flat config
├── .prettierrc                  # Prettier config
├── .prettierignore              # Prettier ignore rules
├── .editorconfig                # Editor config
├── .nuxtrc                      # Nuxt tooling state (test-utils setup version)
├── tsconfig.json                # TypeScript config (references .nuxt/)
├── pnpm-workspace.yaml          # pnpm workspace settings
├── renovate.json                # Renovate auto-update config
├── AGENTS.md                    # LLM agent instructions
└── .vscode/settings.json        # i18n-ally locale paths
```

The `test/` directories are the locations referenced by `vitest.config.ts` and
`playwright.config.ts` — create them as suites are added.

## Modules

| Module | Purpose |
|---|---|
| `@nuxt/eslint` | ESLint integration with flat config |
| `@nuxt/ui` | UI components + Tailwind CSS v4 |
| `@nuxt/image` | Image optimization |
| `@vueuse/nuxt` | VueUse composables (auto-imported) |
| `@pinia/nuxt` | Pinia state management |
| `@nuxtjs/i18n` | Internationalization (en/vi, `no_prefix` strategy, files in `app/i18n/`) |
| `@nuxt/test-utils/module` | Test utilities (Vitest projects + Playwright Nuxt integration) |

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run `nuxt typecheck` (vue-tsc) |
| `pnpm postinstall` | Run `nuxt prepare` (auto-runs after install) |

## Testing

Testing is built on [`@nuxt/test-utils`](https://nuxt.com/docs/getting-started/testing)
plus `vitest` (unit/component) and `@playwright/test` (E2E). There are no test
scripts in `package.json`; run the runners directly:

```bash
pnpm exec vitest run                     # both projects (unit + nuxt)
pnpm exec vitest run --project unit      # test/unit/** only
pnpm exec vitest run --project nuxt      # test/nuxt/** only
pnpm exec playwright install chromium    # once, first time only
pnpm exec playwright test                # test/e2e/** (builds prod server first)
```

### Vitest (`vitest.config.ts`)

Two projects share one config:

- **`unit`** — `test/unit/**/*.{test,spec}.ts`, `node` environment. Plain
  TypeScript tests (utilities, server logic) with no DOM or Nuxt runtime.
- **`nuxt`** — `test/nuxt/**/*.{test,spec}.ts`, `nuxt` environment (via
  `defineVitestProject` from `@nuxt/test-utils/config`). Runs inside the Nuxt
  runtime: auto-imports, `useNuxtApp`, module mocks, etc.

`@vue/test-utils` and `happy-dom` are available for component-level tests.

### Playwright (`playwright.config.ts`)

- `testDir` is `test/e2e/` with a single `chromium` project.
- `webServer` builds **once** with `nuxt build --envName=e2e` into `.nuxt/e2e`
  (see `$env.e2e` in `nuxt.config.ts` — never the dev server's `.nuxt/`), then
  starts the Nitro output with `NUXT_API_MODE=mock` so the suite is
  self-contained. Port is `E2E_PORT` (default `3210`).
- All workers share that one production server (`use.nuxt.host`) instead of
  `@nuxt/test-utils`' default of building/booting a Nuxt server per worker
  (which can OOM the machine).
- `.env` is loaded if present (`--env-file-if-exists`) to supply runtime
  secrets such as `NUXT_SESSION_PASSWORD`.
- CI (`process.env.CI`): `forbidOnly`, 2 retries, 1 worker, `github` reporter.
  Locally: `list` reporter, no retries.

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
    "nuxt": "^4.6.0",
    "pinia": "^3.0.4",
    "tailwindcss": "^4.2.2",
    "vue": "^3.5.31"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@nuxt/eslint": "^1.17.0",
    "@nuxt/test-utils": "^4.3.3",
    "@playwright/test": "^1.63.0",
    "@types/node": "^26.6.4",
    "@vue/test-utils": "^2.5.1",
    "eslint": "^10.11.0",
    "eslint-plugin-prettier": "^5.5.6",
    "happy-dom": "^20.14.5",
    "prettier": "3.9.9",
    "prettier-plugin-tailwindcss": "^0.8.1",
    "typescript": "^6.0.3",
    "typescript-eslint": "^8.71.0",
    "vitest": "^5.0.3",
    "vue-tsc": "^3.3.11"
  },
  "packageManager": "pnpm@10.33.0"
}
```

- **`"type": "module"`** — enables ES module syntax (`import/export`) in all `.ts`/`.js` files
- **`"private": true`** — prevents accidental publishing to npm
- **`"packageManager": "pnpm@10.33.0"`** — enforces pnpm via Corepack
- **`postinstall`** — runs `nuxt prepare` automatically after `pnpm install` to generate `.nuxt/` types
- **Runtime deps**: Nuxt 4.6, Vue 3, Nuxt UI v4, Tailwind v4, Pinia, VueUse, i18n, Image, Iconify icon sets
- **Dev deps**: ESLint + Prettier + TypeScript tooling, and the test stack
  (`@nuxt/test-utils`, `vitest`, `@playwright/test`, `@vue/test-utils`, `happy-dom`)

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
```

- **`modules`** — registers 7 Nuxt modules. Each auto-registers its own components, composables, and config
- **`$env.e2e`** — env-specific overrides applied with `--envName=e2e` (used by the Playwright `webServer`): E2E builds write to `.nuxt/e2e/` so they never clobber the dev server's `.nuxt/` or the production output
- **`devtools.enabled`** — enables Nuxt DevTools in browser
- **`css`** — global CSS loaded on every page (`~/` resolves to `app/`)
- **`compatibilityDate`** — pins Nuxt behavior for reproducibility
- **`eslint.config.stylistic`** — stylistic rules for `@nuxt/eslint`'s generated config (no trailing commas, `1tbs` braces)
- **`i18n`** — `restructureDir` points `@nuxtjs/i18n` at `app/i18n/` (where `i18n.config.ts` and `locales/` live), then locales, default locale (`en`), URL strategy (`no_prefix` = no `/en/` prefix)
- **`components`** — auto-imports `~/components` with flat names (`pathPrefix: false`): `components/ui/AppDataTable.vue` becomes `<AppDataTable>`

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
- The module finds this file because `i18n.restructureDir` in `nuxt.config.ts` points at `app/i18n/`

---

### 6. `app/app.vue`

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

### 7. `eslint.config.mjs`

```js
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt([
  {
    ignores: ['node_modules', 'dist', 'public', '.nuxt', '.kilo'],
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      // SFC block order: template -> script -> style.
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      // Prettier owns formatting; stylistic ESLint rules stay off.
      'comma-dangle': ['off'],
      semi: ['off'],
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'vue/no-deprecated-slot-attribute': [
        'error',
        {
          ignore: ['my-component'],
        },
      ],
    },
  },
]);
```

- **`withNuxt(...)`** — wraps config with Nuxt-specific rules (generated by `@nuxt/eslint` into `.nuxt/`)
- **`eslintPluginPrettierRecommended`** — routes formatting through Prettier; stylistic ESLint rules stay off so Prettier owns formatting
- **`vue/block-order`** — enforces SFC block order: `template` → `script` → `style`
- **Custom rule overrides** — disables `no-explicit-any`, `multi-word-component-names`, `attribute-hyphenation`, `ban-ts-comment` for flexibility
- **`ignores`** — skips `node_modules`, `dist`, `public`, `.nuxt`, `.kilo`

---

### 8. `.prettierrc`

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "jsxSingleQuote": true,
  "quoteProps": "as-needed",
  "proseWrap": "preserve",
  "vueIndentScriptAndStyle": true,
  "embeddedLanguageFormatting": "auto",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- **`printWidth: 100`** / **`tabWidth: 2`** — 100-column lines, 2-space indentation
- **`semi: true`**, **`trailingComma: "es5"`** — semicolons on, ES5 trailing commas
- **`singleQuote: true`** — single quotes over double (JSX too via `jsxSingleQuote`)
- **`vueIndentScriptAndStyle: true`** — indent `<script>`/`<style>` contents in SFCs
- **`plugins: ["prettier-plugin-tailwindcss"]`** — auto-sorts Tailwind CSS classes in templates
- **`endOfLine: "lf"`** — enforce Unix line endings

---

### 9. `.prettierignore`

```
# Ignore build output directories
.nuxt/
dist/

# Ignore node modules
node_modules/

# Ignore specific configuration files
# *.config.js

# Ignore environment variables files
.env
.env.*

# Ignore lock files
yarn.lock
package-lock.json
pnpm-lock.yaml

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

- Excludes build outputs, node_modules, env files, lock files (incl. `pnpm-lock.yaml`), images, and compiled assets from Prettier formatting

---

### 10. `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
    ],
  },
});
```

- **`projects`** — two Vitest projects in one run
- **`unit`** — plain tests in `test/unit/` with the `node` environment
- **`nuxt`** — tests in `test/nuxt/` inside the Nuxt runtime environment (auto-imports, Nuxt context, module mocks), built with `defineVitestProject` from `@nuxt/test-utils/config`
- Select one with `pnpm exec vitest run --project unit|nuxt`

---

### 11. `playwright.config.ts`

```ts
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';

const isCI = !!process.env.CI;

const e2ePort = process.env.E2E_PORT ?? '3210';
const e2eBaseURL = `http://127.0.0.1:${e2ePort}`;

export default defineConfig<ConfigOptions>({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? 'github' : 'list',
  use: {
    trace: 'on-first-retry',
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      // Shared server owned by `webServer` below — never built per worker.
      host: e2eBaseURL,
    },
  },
  webServer: {
    // One production build into `.nuxt/e2e` (`$env.e2e` in nuxt.config.ts),
    // then the Nitro server with the in-memory mock backend (`server/mocks/*`),
    // so the suite is self-contained.
    command:
      'nuxt build --envName=e2e && node --env-file-if-exists=.env .nuxt/e2e/output/server/index.mjs',
    url: e2eBaseURL,
    timeout: 240_000,
    reuseExistingServer: false,
    env: { NUXT_API_MODE: 'mock', PORT: e2ePort, HOST: '127.0.0.1' },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
```

- **`testDir` / `projects`** — E2E specs in `test/e2e/`, one `chromium` project (Desktop Chrome)
- **`webServer`** — builds once with `nuxt build --envName=e2e` into `.nuxt/e2e` and serves `.nuxt/e2e/output/server/index.mjs` with `NUXT_API_MODE=mock`, so the suite never needs an external API. `--env-file-if-exists=.env` supplies runtime secrets without overriding `webServer.env`
- **`use.nuxt.host`** — points `@nuxt/test-utils` at the shared server so it skips building/booting a Nuxt server per worker (one cold production build per worker can OOM the machine)
- **CI vs local** — CI: `forbidOnly`, 2 retries, 1 worker, `github` reporter. Local: `list` reporter, full parallelism
- **`trace: 'on-first-retry'`** — captures Playwright traces on the first retry for debugging

---

### 12. `tsconfig.json`

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "files": [],
  "references": [
    { "path": "./.nuxt/tsconfig.app.json" },
    { "path": "./.nuxt/tsconfig.server.json" },
    { "path": "./.nuxt/tsconfig.shared.json" },
    { "path": "./.nuxt/tsconfig.node.json" }
  ]
}
```

- Project-references the TypeScript configs generated by `nuxt prepare` into `.nuxt/` (app, server, shared, node). No source files are included directly — Nuxt generates the type graph

---

### 13. `.editorconfig`

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

### 14. `.gitignore`

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

### 15. `.nuxtrc`

```
setups.@nuxt/test-utils="4.3.3"
```

- Version record written automatically by `@nuxt/kit`: when a module exposes `onInstall`/`onUpgrade` hooks (here `@nuxt/test-utils`), the kit records the installed version in `.nuxtrc` and runs the hooks only on install/upgrade
- Managed state — do not edit by hand

---

### 16. `pnpm-workspace.yaml`

```yaml
ignoredBuiltDependencies:
  - '@parcel/watcher'
  - '@tailwindcss/oxide'
  - esbuild
  - unrs-resolver
  - vue-demi
```

- pnpm 10 does not run dependency build scripts unless approved; this list marks these native/optional packages as intentionally skipped (and stops pnpm from warning about them)

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

[Renovate](https://github.com/apps/renovate) is configured via `renovate.json`: it extends the official `github>nuxt/renovate-config-nuxt` preset, enables lock file maintenance, disables updates for `resolutions` entries, and runs `pnpmDedupe` after each update.
