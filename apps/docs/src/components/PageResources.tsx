import {useState} from 'react'
import { useLocale } from '../app/locale'

export const repository = 'https://github.com/devcgp/macos-components-react'

const rawDocuments=import.meta.glob<string>(['../../content/**/*.md','../../../../docs/*.md'],{query:'?raw',import:'default'})

const componentSources: Record<string, string[]> = {
  button: ['button', 'icon-button'],
  checkbox: ['checkbox'],
  switch: ['switch'],
  slider: ['slider'],
  sidebar: ['sidebar'],
  toolbar: ['toolbar'],
  AdditionalControls: ['text-field', 'stepper', 'progress-indicator', 'disclosure-control'],
  controls: ['search-field', 'dropdown', 'radio', 'segmented-control'],
  forms: ['text-area', 'select', 'radio-group'],
  desktop: ['traffic-lights', 'title-bar', 'window', 'split-view', 'inspector-panel', 'settings-group', 'table', 'list'],
  navigation: ['dropdown-menu', 'context-menu', 'popover', 'tabs', 'breadcrumb'],
  content: ['image-view', 'text-view', 'outline-view', 'scroll-view', 'combo-box'],
  feedback: ['alert', 'dialog', 'sheet', 'tooltip', 'badge', 'spinner'],
}

export function PageResources({ id, route, title, component }: {
  id: string
  route: string
  title: string
  component: boolean
}) {
  const { locale, tr } = useLocale()
  const [showSource,setShowSource]=useState(false)
  const [raw,setRaw]=useState('')
  const [sourceError,setSourceError]=useState(false)
  const [loading,setLoading]=useState(false)
  const suffix = tr('.md', '.en.md')
  const path = id === 'design' || id === 'tokens' ? 'docs/' + id + suffix
    : 'apps/docs/content/' + (component ? 'components/' : '') + id + suffix
  const implementation = Object.entries(componentSources).find(([, ids]) => ids.includes(id))?.[0]
  const source = implementation ? 'packages/ui/src/components/' + implementation + '.tsx'
    : id === 'tokens' ? 'packages/ui/src/styles/tokens/tokens.json'
    : id === 'foundations/color' ? 'apps/docs/src/components/TahoeColorsPage.tsx'
    : path
  const url = new URL(location.href)
  url.searchParams.set('lang', locale)
  if (url.hash.split(/[?#]/, 2)[1] !== route.slice(1)) url.hash = route
  const issue = new URLSearchParams({
    template: 'bug_report.md',
    title: '[Docs] ' + title,
    body: `Page / 页面: ${url.href}\nLanguage / 语言: ${locale}\nSource / 源文件: ${path}\n\n## Steps / 复现步骤\n\n## Expected / 预期\n\n## Actual / 实际\n`,
  })
  const files = id === 'design' ? ['design' + suffix]
    : id === 'tokens' ? ['tokens' + suffix, 'tokens.json', 'styles.css']
    : id === 'resources/ai-integration' ? ['ai-integration' + suffix, 'design' + suffix, 'tokens.json', 'styles.css']
    : []
  const documentKey=path.startsWith('docs/')?'../../../../'+path:'../../content/'+path.replace('apps/docs/content/','')
  const loadRaw=(rawDocuments as Partial<Record<string,()=>Promise<string>>>)[documentKey]
  async function toggleSource(){
    if(showSource){setShowSource(false);return}
    if(raw){setShowSource(true);return}
    if(!loadRaw)return
    setLoading(true);setSourceError(false)
    try{setRaw(await loadRaw());setShowSource(true)}catch{setSourceError(true)}finally{setLoading(false)}
  }
  const documentPath=(language:string)=>path.replace(/(?:\.en)?\.md$/,language==='en'?'.en.md':'.md')
  const isMarkdown=path.endsWith('.md')
  return <footer className="page-contributions page-resource-card" aria-label={tr('文档资源与贡献','Document resources and contribution')}>
    <h2>{tr('文档资源与贡献','Document resources and contribution')}</h2>
    <div className="page-resource-actions">
      <a href={repository+'/edit/'+__DOCS_GIT_REF__+'/'+path} target="_blank" rel="noopener noreferrer">Edit on GitHub ↗</a>
      {loadRaw&&<button type="button" aria-expanded={showSource} aria-controls="page-raw-document" disabled={loading} onClick={toggleSource}>{loading?tr('正在加载…','Loading…'):showSource?tr('收起原文','Hide raw document'):tr('查看原文','View raw document')}</button>}
      {isMarkdown?['zh-CN','en'].map(language=><a key={language} className="page-download-button" href={'/downloads/pages/'+documentPath(language)} download><span aria-hidden="true">↓</span>{language==='en'?'English Markdown':tr('中文 Markdown','Chinese Markdown')}</a>):<a className="page-download-button" href={'/downloads/pages/'+path} download>↓ JSON</a>}
    </div>
    {files.filter(file=>!file.endsWith('.md')).length>0&&<nav className="page-resource-exports" aria-label={tr('配套文件','Related exports')}>{files.filter(file=>!file.endsWith('.md')).map(file=><a className="page-download-button" key={file} href={'/downloads/'+file} download>↓ {file}</a>)}</nav>}
    <nav className="page-resource-links" aria-label={tr('贡献入口','Contribution links')}>
      <a href={repository+'/blob/'+__DOCS_GIT_REF__+'/'+source} target="_blank" rel="noopener noreferrer">{tr('查看源码','View source')} ↗</a>
      <a href={repository+'/issues/new?'+issue} target="_blank" rel="noopener noreferrer">{tr('报告问题','Report an issue')} ↗</a>
      <a href="#/tahoe/resources/community">{tr('贡献指南','Contribution guide')} →</a>
      <a href="/font-awesome-license.txt">Font Awesome {tr('许可','license')}</a>
    </nav>
    {sourceError&&<p role="alert">{tr('原文加载失败，请重试或下载 Markdown。','Could not load source. Retry or download Markdown.')}</p>}
    {raw&&showSource&&<pre id="page-raw-document" className="page-raw-document" aria-label={tr('文档原文','Raw document')}><code>{raw}</code></pre>}
  </footer>
}
