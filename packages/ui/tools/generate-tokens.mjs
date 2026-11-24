import { readFileSync, writeFileSync } from 'node:fs'

const styles = new URL('../src/styles/', import.meta.url)
const read = (path) => readFileSync(new URL(path, styles), 'utf8')
const { colors } = JSON.parse(read('tokens/tokens.json'))
const swatches = JSON.parse(read('figma-colors.json'))
const checkOnly = process.argv.includes('--check')

// The same scopes in theme.tokens.css set color-scheme and --tahoe-appearance.
const scopes = {
  light: [
    ':root',
    '[data-appearance="light"]:where(:root, [data-theme="tahoe"], [data-theme="tahoe"] *)',
  ],
  dark: [
    ':root.dark:not([data-appearance="light"])',
    '.dark [data-theme="tahoe"]:not([data-appearance], [data-appearance] *)',
    '[data-appearance="dark"]:where(:root, [data-theme="tahoe"], [data-theme="tahoe"] *)',
  ],
}

function normalizeColor(value) {
  const translucent = /^(black|white)\s*\/\s*(\d+)%$/.exec(value)
  if (translucent) {
    const channel = translucent[1] === 'black' ? 0 : 255
    return `rgba(${channel},${channel},${channel},${Number(translucent[2]) / 100})`
  }
  return value.toLowerCase().replace(/^#([a-f0-9])([a-f0-9])([a-f0-9])$/, '#$1$1$2$2$3$3').replace(/\s/g, '')
}

const appearances = Object.keys(scopes)
const names = Object.keys(colors.light)
if (Object.keys(colors.dark).length !== names.length || names.some((name) => !(name in colors.dark))) {
  throw new Error('Tahoe Light and Dark palettes must define the same keys.')
}

for (const group of swatches) {
  for (const swatch of group.colors) {
    const name = `--tahoe-${group.id}-${swatch.name.toLowerCase()}`
    for (const appearance of appearances) {
      const entry = swatch[appearance]
      const value = typeof entry === 'string' ? entry : entry.value
      const expected = colors[appearance][name]
      if (!expected || normalizeColor(value) !== normalizeColor(expected)) {
        throw new Error(`figma-colors.json: ${name} (${appearance}) is ${value}, expected ${expected}`)
      }
    }
  }
}

const isSemantic = (name) => name.startsWith('--tahoe-miscellaneous-') || name === '--tahoe-window-background-figma'
for (const [file, keys] of [
  ['palette.tokens.css', names.filter((name) => !isSemantic(name))],
  ['semantic.tokens.css', names.filter(isSemantic)],
]) {
  const rules = appearances.map((appearance) => {
    const declarations = keys.map((key) => `  ${key}: ${colors[appearance][key]};`)
    return `${scopes[appearance].join(',\n')} {\n${declarations.join('\n')}\n}`
  })
  const path = `tokens/${file}`
  const css = `/* Generated from tokens.json. Run pnpm tokens. */\n${rules.join('\n\n')}\n`

  if (checkOnly) {
    if (read(path) !== css) throw new Error(`${path} is stale. Run pnpm tokens.`)
  } else {
    writeFileSync(new URL(path, styles), css)
  }
}
