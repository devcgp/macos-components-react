import { useLocale } from '../app/locale'
import { tahoeContexts, tahoeIcons, tahoeMaterials, tahoeSizeOrder, tahoeSizes } from '../app/token-data'
import { ScopePreview, TypographyPreview, tahoeTokenSections } from './TahoeTokensPage'

const sizeTokens = Object.keys(tahoeSizes.medium) as (keyof typeof tahoeSizes.medium)[]
const spacingTokens = sizeTokens.filter(token => /padding|spacing|inset|margins/.test(token))
const geometryTokens = sizeTokens.filter(token => !spacingTokens.includes(token))

const values = {
  'foundations/dark-mode': {
    title: 'Appearance scope', titleZh: '外观作用域',
    rows: { 'data-appearance': 'light | dark' },
  },
  'foundations/layout': { title: 'Context tokens', titleZh: '布局上下文', rows: tahoeContexts },
  'foundations/materials': {
    title: 'Material variants', titleZh: '材质变体',
    rows: { 'data-material': 'solid | vibrant | glass-regular | glass-clear' },
  },
  'foundations/liquid-glass': {
    title: 'Glass tokens', titleZh: '玻璃材质 Tokens',
    rows: { ...tahoeMaterials.webBlur, ...tahoeMaterials.source },
  },
  'foundations/motion': {
    title: 'Motion token', titleZh: '动效 Token',
    rows: { '--tahoe-motion': '120ms', 'prefers-reduced-motion: reduce': '0ms' },
  },
  'foundations/icons': {
    title: 'Icon sizing tokens', titleZh: '图标尺寸 Tokens',
    rows: Object.fromEntries(sizeTokens.filter(token => /glyph|symbol|chevron|checkmark/.test(token))
      .map(token => [token, tahoeSizes.medium[token]])),
  },
  'foundations/sf-symbols-guidance': {
    title: 'Source symbol identifiers', titleZh: '源符号标识',
    rows: Object.fromEntries(Object.entries(tahoeIcons.sourceUnicode)
      .map(([name, glyph]) => [name, 'U+' + glyph.codePointAt(0)?.toString(16).toUpperCase()])),
  },
}

const sizeTable = { id: 'foundation-size-tokens', title: 'Size tokens', titleZh: '尺寸 Tokens' }
const valueTable = 'foundation-tokens'

export function foundationTokenSections(id: string) {
  if (id === 'foundations/typography') return [tahoeTokenSections[2]]
  if (id === 'foundations/control-geometry') return [tahoeTokenSections[1], sizeTable]
  if (id === 'foundations/spacing') return [sizeTable]
  const entry = values[id as keyof typeof values]
  return entry ? [{ id: valueTable, title: entry.title, titleZh: entry.titleZh }] : []
}

function SizeTable({ tokens }: { tokens: typeof sizeTokens }) {
  const { tr } = useLocale()
  return <section id={sizeTable.id} className="doc-section">
    <h2>{tr(sizeTable.titleZh, sizeTable.title)}</h2>
    <div className="tahoe-type-table" role="region" aria-label={tr(sizeTable.titleZh, sizeTable.title)} tabIndex={0}>
      <table>
        <thead><tr><th scope="col">Token</th>{tahoeSizeOrder.map(size => <th key={size} scope="col">{size}</th>)}</tr></thead>
        <tbody>{tokens.map(token => <tr key={token}><th scope="row"><code>{token}</code></th>
          {tahoeSizeOrder.map(size => <td key={size}>{tahoeSizes[size][token]}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
  </section>
}

export function FoundationTokens({ id }: { id: string }) {
  const { tr } = useLocale()
  if (id === 'foundations/typography') return <TypographyPreview/>
  if (id === 'foundations/control-geometry') return <><ScopePreview/><SizeTable tokens={geometryTokens}/></>
  if (id === 'foundations/spacing') return <SizeTable tokens={spacingTokens}/>
  const entry = values[id as keyof typeof values]
  if (!entry) return null
  return <section id={valueTable} className="doc-section">
    <h2>{tr(entry.titleZh, entry.title)}</h2>
    <div className="tahoe-type-table" role="region" aria-label={tr(entry.titleZh, entry.title)} tabIndex={0}>
      <table>
        <thead><tr><th scope="col">{tr('Token 或属性', 'Token or attribute')}</th><th scope="col">{tr('值', 'Value')}</th></tr></thead>
        <tbody>{Object.entries(entry.rows).map(([key, value]) =>
          <tr key={key}><th scope="row"><code>{key}</code></th><td><code>{value}</code></td></tr>,
        )}</tbody>
      </table>
    </div>
  </section>
}
