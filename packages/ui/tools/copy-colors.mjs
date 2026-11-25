import { copyFileSync } from 'node:fs'
copyFileSync(new URL('../src/styles/figma-colors.json', import.meta.url), new URL('../dist/figma-colors.json', import.meta.url))
copyFileSync(
  new URL('../../../apps/docs/public/font-awesome-license.txt', import.meta.url),
  new URL('../dist/font-awesome-license.txt', import.meta.url),
)
