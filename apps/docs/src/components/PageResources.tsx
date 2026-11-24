import { useLocale } from '../app/locale'

export const repository = 'https://github.com/devcgp/macos-components-react'

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
  const suffix = tr('.md', '.en.md')
  const path = id === 'design' || id === 'tokens' ? 'docs/' + id + suffix
    : id === 'colors' ? 'packages/ui/src/styles/figma-colors.json'
    : 'apps/docs/content/' + (component ? 'components/' : '') + id + suffix
  const implementation = Object.entries(componentSources).find(([, ids]) => ids.includes(id))?.[0]
  const source = implementation ? 'packages/ui/src/components/' + implementation + '.tsx'
    : id === 'tokens' ? 'packages/ui/src/styles/tokens/tokens.json'
    : id === 'colors' ? 'apps/docs/src/components/TahoeColorsPage.tsx'
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
  return <>
    {files.length > 0 && <section className="page-downloads" aria-label={tr('下载文件', 'Downloads')}>
      <h2>{tr('下载文件', 'Downloads')}</h2>
      <ul>{files.map(file => <li key={file}><a href={'/downloads/' + file} download>{file}</a></li>)}</ul>
    </section>}
    <footer className="page-contributions">
      <nav aria-label={tr('贡献入口', 'Contribute to this page')}>
        <a href={repository + '/edit/' + __DOCS_GIT_REF__ + '/' + path}>{tr('在 GitHub 编辑', 'Edit on GitHub')}</a>
        <a href={repository + '/blob/' + __DOCS_GIT_REF__ + '/' + source}>{tr('查看源码', 'View source')}</a>
        <a href={repository + '/issues/new?' + issue}>{tr('报告问题', 'Report an issue')}</a>
        <a href="/font-awesome-license.txt">Font Awesome {tr('许可', 'license')}</a>
      </nav>
    </footer>
  </>
}
