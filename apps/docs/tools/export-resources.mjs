import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'

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

// Publish actual document files, preserving repository paths for both languages.
for (const folder of ['docs','apps/docs/content']) {
  for (const file of readdirSync(new URL(folder+'/',root),{recursive:true}).filter(name=>name.endsWith('.md'))) {
    const source=folder+'/'+file
    const target=new URL('pages/'+source,downloads)
    mkdirSync(new URL('./',target),{recursive:true})
    copyFileSync(new URL(source,root),target)
  }
}
const colorPath='packages/ui/src/styles/figma-colors.json'
const colorTarget=new URL('pages/'+colorPath,downloads)
mkdirSync(new URL('./',colorTarget),{recursive:true})
copyFileSync(new URL(colorPath,root),colorTarget)
