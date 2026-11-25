import { documentHref } from '../app/document-urls'
import { useState } from 'react'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import tokensZh from '../../../../docs/tokens.md?raw'
import tokensEn from '../../../../docs/tokens.en.md?raw'
import { useLocale } from '../app/locale'
import { desktopSizeOrder, desktopSizes, desktopTypography, type DesktopSize } from '../app/token-data'

export const desktopTokenSections = [
  { id: 'desktop-token-usage', title: 'Usage and sources', titleZh: '接入与来源' },
  { id: 'desktop-token-scopes', title: 'Scope preview', titleZh: '作用域预览' },
  { id: 'desktop-token-typography', title: 'Typography', titleZh: '字体排印' },
] as const

const sizes: Record<DesktopSize, string> = { mini: 'Mini', small: 'Small', medium: 'Medium', large: 'Large', xl: 'XL' }
const metrics = [
  ['--desktop-global-height', '控件高度', 'Control height'],
  ['--desktop-global-radius', '通用圆角', 'Base radius'],
  ['--desktop-button-padding-horizontal', '按钮横向内边距', 'Button inline padding'],
  ['--desktop-toggle-switch-track-width', '开关轨道宽度', 'Switch track width'],
] as const

export function ScopePreview() {
  const { tr } = useLocale()
  const [size, setSize] = useState<DesktopSize>('medium')
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light')
  const [context, setContext] = useState<'content-area' | 'over-glass'>('content-area')

  return <section id={desktopTokenSections[1].id} className="doc-section">
    <h2>{tr(desktopTokenSections[1].titleZh, desktopTokenSections[1].title)}</h2>
    <div className="desktop-token-controls">
      <label>{tr('外观', 'Appearance')}
        <select className="language-select" value={appearance} onChange={event => setAppearance(event.target.value === 'dark' ? 'dark' : 'light')}>
          <option value="light">{tr('浅色', 'Light')}</option>
          <option value="dark">{tr('深色', 'Dark')}</option>
        </select>
      </label>
      <label>{tr('尺寸', 'Size')}
        <select className="language-select" value={size} onChange={event => setSize(event.target.value as DesktopSize)}>
          {desktopSizeOrder.map(mode => <option key={mode} value={mode}>{sizes[mode]}</option>)}
        </select>
      </label>
      <label>{tr('上下文', 'Context')}
        <select className="language-select" value={context} onChange={event => setContext(event.target.value === 'over-glass' ? 'over-glass' : 'content-area')}>
          <option value="content-area">{tr('内容区', 'Content Area')}</option>
          <option value="over-glass">{tr('玻璃上方', 'Over Glass')}</option>
        </select>
      </label>
    </div>
    <div className="desktop-token-sample" data-theme="desktop" data-appearance={appearance} data-size={size} data-context={context}>
      <div className="desktop-token-shapes">
        <span className="desktop-token-control">{tr('尺寸示例', 'Size sample')}</span>
        <div className="desktop-token-track" aria-hidden="true"/>
        <code>{context}</code>
      </div>
      <dl className="desktop-token-metrics">
        {metrics.map(([variable, zh, en]) => <div key={variable}>
          <dt>{tr(zh, en)} <code>{variable}</code></dt>
          <dd>{desktopSizes[size][variable]}</dd>
        </div>)}
      </dl>
    </div>
  </section>
}

const typographyNames: Record<keyof typeof desktopTypography, [string, string]> = {
  'large-title': ['大标题', 'Large Title'],
  'title-1': ['标题 1', 'Title 1'], 'title-2': ['标题 2', 'Title 2'], 'title-3': ['标题 3', 'Title 3'],
  headline: ['标题', 'Headline'], body: ['正文', 'Body'], callout: ['强调文字', 'Callout'],
  subheadline: ['副标题', 'Subheadline'], footnote: ['脚注', 'Footnote'],
  'caption-1': ['说明 1', 'Caption 1'], 'caption-2': ['说明 2', 'Caption 2'],
}

export function TypographyPreview() {
  const { tr } = useLocale()
  return <section id={desktopTokenSections[2].id} className="doc-section">
    <h2>{tr(desktopTokenSections[2].titleZh, desktopTokenSections[2].title)}</h2>
    <p>{tr(
      '11 组文字样式各提供常规与强调两种变体。示例使用当前 CSS 的字号、行高和字重。',
      'All 11 text styles have Regular and Emphasized variants. The samples use the font size, line height, and weight from the current CSS.',
    )}</p>
    <div className="desktop-type-table" role="region" aria-label={tr('字体排印对照', 'Typography comparison')} tabIndex={0}>
      <table>
        <thead><tr>
          <th scope="col">{tr('样式', 'Style')}</th>
          <th scope="col">{tr('常规', 'Regular')}</th>
          <th scope="col">{tr('强调', 'Emphasized')}</th>
        </tr></thead>
        <tbody>
          {(Object.keys(typographyNames) as (keyof typeof desktopTypography)[]).map(group => <tr key={group}>
            <th scope="row">{tr(...typographyNames[group])}</th>
            {(['regular', 'emphasized'] as const).map(variant => {
              const token = '--desktop-type-' + group + '-' + variant
              const { fontSize, lineHeight, weight } = desktopTypography[group][variant]
              return <td key={variant}>
                <span style={{
                  fontFamily: 'var(' + token + '-font-family)',
                  fontSize: 'var(' + token + '-size)',
                  lineHeight: 'var(' + token + '-line-height)',
                  fontWeight: 'var(' + token + '-weight)',
                }}>{tr('文字示例', 'Sample text')}</span>
                <small>{fontSize} / {lineHeight} · {weight}</small>
              </td>
            })}
          </tr>)}
        </tbody>
      </table>
    </div>
  </section>
}

export default function DesktopTokensPage() {
  const { locale, tr } = useLocale()
  return <article className="markdown desktop-token-doc">
    <section id={desktopTokenSections[0].id} className="doc-section">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: () => null }} urlTransform={url => defaultUrlTransform(documentHref(url, locale))}>{tr(tokensZh, tokensEn)}</ReactMarkdown>
    </section>
    <ScopePreview/>
    <TypographyPreview/>
    <section className="doc-section">
      <h2>{tr('按主题浏览', 'Browse by topic')}</h2>
      <p>{tr('查看设计基础中实际渲染的 Token，或下载完整数据和 CSS。', 'Browse rendered tokens in Foundations, or download the complete data and CSS.')}</p>
      <ul>{[
        ['color', '色彩', 'Color'], ['dark-mode', '深色模式', 'Dark Mode'],
        ['typography', '排版', 'Typography'], ['layout', '布局', 'Layout'],
        ['materials', '材质', 'Materials'], ['liquid-glass', 'Liquid Glass', 'Liquid Glass'],
        ['motion', '动效', 'Motion'], ['icons', '图标', 'Icons'],
        ['sf-symbols-guidance', 'SF Symbols 指南', 'SF Symbols Guidance'],
        ['spacing', '间距', 'Spacing'], ['control-geometry', '控件尺寸', 'Control Geometry'],
      ].map(([id, zh, en]) => <li key={id}><a href={documentHref('/desktop/foundations/' + id, locale)}>{tr(zh, en)}</a></li>)}</ul>
    </section>
  </article>
}
