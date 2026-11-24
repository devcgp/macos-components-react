import { copyFileSync } from 'node:fs'
copyFileSync(new URL('../src/styles/figma-colors.json', import.meta.url), new URL('../dist/figma-colors.json', import.meta.url))
