import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';

const isCI = !!process.env.CI;

/**
 * All workers share one production server, built and started once per run by
 * the `webServer` below.
 *
 * By default `@nuxt/test-utils` builds and boots a full Nuxt server **per
 * worker** — that is one cold production build (~4.5 GB peak) per running
 * test file, which can OOM the machine. Pointing `use.nuxt.host` at an
 * externally started server makes the integration skip building and booting
 * entirely, so workers only run browsers.
 */
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
    // One production build into `.nuxt/e2e` (`$env.e2e` in nuxt.config.ts —
    // never the dev server's `.nuxt/`), then the Nitro server with the
    // in-memory mock backend (`server/mocks/*`), so the suite is self-contained
    // and never requires `apps/api` to be running. `--env-file-if-exists`
    // supplies runtime secrets (NUXT_SESSION_PASSWORD) from `.env` without
    // overriding the env set below.
    command:
      'nuxt build --envName=e2e && node --env-file-if-exists=.env .nuxt/e2e/output/server/index.mjs',
    url: e2eBaseURL,
    timeout: 240_000,
    reuseExistingServer: false,
    env: { NUXT_API_MODE: 'mock', PORT: e2ePort, HOST: '127.0.0.1' },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
