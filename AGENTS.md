# nuxt-app — Agent Instructions

## Docs — never guess Nuxt APIs

- Index: <https://nuxt.com/llms.txt>; full text: <https://nuxt.com/llms-full.txt>. Any page
  is Markdown: append `.md` (e.g. `…/docs/4.x/guide/concepts/auto-imports.md`).
- Prefer the Nuxt MCP when connected (`nuxt_get-*` / `nuxt_list-*`, endpoint
  <https://nuxt.com/mcp>) and the Nuxt UI MCP (`nuxt-ui_*`) over raw web fetches; otherwise
  fetch the llms.txt URLs. Unsure about a composable, config key, directory, or behavior →
  look it up first, don't guess. Vue, Vite, Nitro, i18n, Pinia, Nuxt UI specifics → that
  project's own docs.
