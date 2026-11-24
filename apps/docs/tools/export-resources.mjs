import { copyFileSync, mkdirSync } from 'node:fs'

const root = new URL('../../../', import.meta.url)
const downloads = new URL('apps/docs/public/downloads/', root)
mkdirSync(downloads, { recursive: true })
const sources = {
  'design.md': 'docs/design.md',
  'design.en.md': 'docs/design.en.md',
  'tokens.md': 'docs/tokens.md',
  'tokens.en.md': 'docs/tokens.en.md',
  'tokens.json': 'packages/ui/src/styles/tokens/tokens.json',
  'styles.css': 'packages/ui/dist/styles.css',
  'ai-integration.md': 'apps/docs/content/resources/ai-integration.md',
  'ai-integration.en.md': 'apps/docs/content/resources/ai-integration.en.md',
}
for (const [name, source] of Object.entries(sources)) {
  copyFileSync(new URL(source, root), new URL(name, downloads))
}
