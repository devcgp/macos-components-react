import { useState } from 'react'
import { Button, Checkbox, InspectorPanel, SearchField, Slider, Switch, Table, TextField, Toolbar, Window } from '@cgpdesktopui/ui'
import { documentHref, documentStart } from '../app/document-urls'
import { installCommands } from '../app/installation'
import { LocaleContext, type Locale } from '../app/locale'
import { SidebarInWindow } from '../examples/sidebar/SidebarInWindow'
import CopyCode from './CopyCode'
import '../styles/landing.css'

const repository = 'https://github.com/devcgp/macos-components-react'

const content = {
  'zh-CN': {
    heading: '用 React 构建 macOS 风格的界面',
    description: '开源 React 19 组件、浅深色主题和设计 Tokens，适用于桌面风格的网页界面。',
    title: 'CGP Desktop UI · macOS 风格的 React 组件',
  },
  en: {
    heading: 'Build macOS-inspired interfaces with React.',
    description: 'Open-source React 19 components, light and dark themes, and design tokens for desktop-style web interfaces.',
    title: 'CGP Desktop UI · macOS-inspired React components',
  },
}

export function landingMetadata(locale: Locale) {
  return content[locale]
}

const windowZh = {
  title: '备忘录', show: '显示侧栏', hide: '隐藏侧栏', navigation: '窗口目录',
  folders: '文件夹', work: '工作', personal: '个人', longName: '研究资料与设计参考',
  current: '当前目录',
}

export default function LandingPage({ locale }: { locale: Locale }) {
  const tr = (zh: string, en: string) => locale === 'en' ? en : zh
  const href = (route: string) => documentHref(route, locale)
  const { heading, description } = landingMetadata(locale)
  const install = href('/desktop/getting-started/installation')
  const docs = href(documentStart)
  const [query, setQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState('tokens')
  const guidelines = locale === 'en' ? '/downloads/design.en.md' : '/downloads/design.md'
  const tokens = '/downloads/tokens.json'
  const api = repository + '/blob/main/docs/components.md'
  const files = [
    { id: 'tokens', name: tr('设计 Tokens', 'Design Tokens'), format: 'JSON', url: tokens },
    { id: 'guidelines', name: tr('设计规范', 'Design Guidelines'), format: 'Markdown', url: guidelines },
  ]
  const visibleFiles = files.filter(file => (file.name + ' ' + file.format).toLowerCase().includes(query.trim().toLowerCase()))
  const activeFile = visibleFiles.find(file => file.id === selectedFile) ?? visibleFiles[0]
  const tokenCode = '--desktop-accent: var(--desktop-accents-blue);'
  const capabilities = [
    { label: tr('组件', 'Components'), detail: tr('表单控件与桌面布局。', 'Form controls and desktop layouts.'), route: '/desktop/button',
      preview: <><Button disabled>{tr('保存', 'Save')}</Button><Checkbox label={tr('显示网格', 'Show grid')} defaultChecked/></> },
    { label: tr('设计基础', 'Foundations'), detail: tr('色彩、排版与材质。', 'Color, typography, and materials.'), route: '/desktop/foundations/color',
      preview: <><strong className="landing-type-sample">Aa</strong><span className="landing-color-dot"/></> },
    { label: tr('设计 Tokens', 'Design Tokens'), detail: tr('用于实现主题和控件的共享参数。', 'Shared values for themes and controls.'), route: '/desktop/tokens',
      preview: <code>--desktop-accent</code> },
    { label: tr('交互模式', 'Patterns'), detail: tr('搜索、反馈与常见桌面交互。', 'Search, feedback, and common desktop interactions.'), route: '/desktop/patterns/searching',
      preview: <span className="landing-layout-sample" aria-hidden="true"><i/><i/></span> },
  ]
  const demos = [
    { name: 'Button', route: 'button', detail: tr('默认、强调与禁用状态。', 'Default, accent, and disabled states.'),
      preview: <><Button>{tr('取消', 'Cancel')}</Button><Button variant="accent">{tr('继续', 'Continue')}</Button><Button disabled>{tr('不可用', 'Unavailable')}</Button></> },
    { name: 'Checkbox', route: 'checkbox', detail: tr('按空格切换独立选项。', 'Toggle independent options with Space.'),
      preview: <><Checkbox label={tr('显示网格', 'Show grid')} defaultChecked/><Checkbox label={tr('显示标尺', 'Show rulers')}/></> },
    { name: 'Text Field', route: 'text-field', detail: tr('编辑带标签的文本字段。', 'Edit a labeled text field.'),
      preview: <TextField label={tr('图库名称', 'Library name')} defaultValue={tr('照片图库', 'Photo Library')}/> },
    { name: 'Switch', route: 'switch', detail: tr('切换应用偏好。', 'Toggle an application preference.'),
      preview: <Switch label={tr('同步图库', 'Sync library')}/> },
    { name: 'Slider', route: 'slider', detail: tr('使用方向键调整数值。', 'Adjust the value with arrow keys.'),
      preview: <Slider aria-label={tr('预览缩放', 'Preview zoom')} min={50} max={150} defaultValue={100}/> },
    { name: 'Sidebar', route: 'sidebar', detail: tr('切换目录并折叠分组。', 'Select collections and collapse groups.'),
      preview: <a href="#landing-window">{tr('试用窗口侧栏', 'Try the window sidebar')}</a> },
  ]
  const prompt = tr(
    '使用 @cgpdesktopui/ui，遵循提供的设计规范和 Tokens。复用文档中的组件 API，并验证键盘操作与浅深色外观。',
    'Use @cgpdesktopui/ui. Follow the supplied design guidelines and tokens. Reuse documented component APIs and verify keyboard behavior and light/dark appearance.',
  )
  const exampleCode = `import { Button } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function App() {
  return <div data-theme="desktop">
    <Button variant="accent">${tr('保存', 'Save')}</Button>
  </div>
}`

  return <LocaleContext.Provider value={locale}><div className="landing" data-theme="desktop">
    <main id="main" className="landing-main">
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-intro">
          <p className="landing-eyebrow">{tr('开源组件库', 'Open source')} · React 19</p>
          <h1 id="landing-title">{heading}</h1>
          <p>{description}</p>
          <div className="landing-actions">
            <a className="landing-primary" href={install}>{tr('开始使用', 'Get Started')}</a>
            <a href={repository}>{tr('查看 GitHub', 'View on GitHub')}</a>
          </div>
        </div>
        <figure id="landing-window" className="landing-preview">
          <SidebarInWindow labels={locale === 'zh-CN' ? windowZh : undefined}/>
          <figcaption><a href={href('/desktop/sidebar')}>{tr('查看 Sidebar 交互文档', 'Explore the Sidebar example')}</a></figcaption>
        </figure>
      </section>
      <section className="landing-section landing-section-white" aria-labelledby="landing-system">
        <h2 id="landing-system">{tr('从设计规范到 React 组件', 'From design foundations to React components')}</h2>
        <div className="landing-grid">
          {capabilities.map(({ label, detail, route, preview }) => <article key={route}><div className="landing-system-preview">{preview}</div><h3><a href={href(route)}>{label}</a></h3><p>{detail}</p></article>)}
        </div>
      </section>
      <section className="landing-section" aria-labelledby="landing-components">
        <h2 id="landing-components">{tr('试用组件', 'Try the components')}</h2>
        <div className="landing-gallery">
          {demos.map(({ name, route, detail, preview }) => <article key={route}>
            <div className="landing-stage">{preview}</div>
            <div className="landing-gallery-copy"><h3><a href={href('/desktop/' + route)}>{name}</a></h3><p>{detail}</p></div>
          </article>)}
        </div>
      </section>
      <section className="landing-section" aria-labelledby="landing-showcase">
        <div className="landing-showcase-card">
          <h2 id="landing-showcase">{tr('桌面界面示例', 'Desktop interface example')}</h2>
          <p>{tr('在一个窗口中组合工具栏、内容表格和检查器。', 'Combine a toolbar, content table, and inspector in one window.')}</p>
          <Window title={tr('项目资料', 'Project files')} toolbar={<Toolbar title={tr('设计资料', 'Design files')}
            detail={<output>{tr('文件数', 'Files')}: {visibleFiles.length}</output>}
            search={<SearchField className="desktop-toolbar-search" aria-label={tr('搜索资源', 'Search resources')} placeholder={tr('搜索资源', 'Search resources')} value={query} onChange={event => setQuery(event.target.value)}/>}/>}>
            <div className="landing-showcase">
              {visibleFiles.length ? <Table caption={tr('文件列表', 'File list')} columns={[{id:'name', label:tr('名称', 'Name')}, {id:'format', label:tr('格式', 'Format')}]}
                rows={visibleFiles.map(file => ({id:file.id, cells:{name:<Button aria-pressed={activeFile?.id === file.id} onClick={() => setSelectedFile(file.id)}>{file.name}</Button>, format:file.format}}))}/>
                : <p className="landing-empty" role="status">{tr('没有匹配的资源。', 'No matching resources.')}</p>}
              <InspectorPanel title={tr('检查器', 'Inspector')}>
                {activeFile ? <><p>{activeFile.name} · {activeFile.format}</p><a href={activeFile.url} download>{tr('下载文件', 'Download file')}</a></>
                  : <p>{tr('请修改搜索词。', 'Try another search term.')}</p>}
              </InspectorPanel>
            </div>
          </Window>
          <p><a href={href('/desktop/patterns/file-management')}>{tr('查看文件管理模式', 'Explore file management patterns')}</a></p>
        </div>
      </section>
      <section className="landing-section landing-tokens" aria-labelledby="landing-tokens">
        <h2 id="landing-tokens">{tr('设计基础与 Tokens', 'Foundations and design tokens')}</h2>
        <p>{tr('JSON 数据生成 CSS 变量，供组件与主题使用。', 'JSON data generates the CSS variables used by components and themes.')}</p>
        <div className="landing-foundations">
          <article className="landing-palette"><h3>{tr('色彩与外观', 'Color and appearance')}</h3>
            <div className="landing-swatches">{(['light', 'dark'] as const).map(mode => <div key={mode} data-theme="desktop" data-appearance={mode}>
              <strong>{mode === 'light' ? tr('浅色', 'Light') : tr('深色', 'Dark')}</strong><div><i/><i/><i/></div>
              <small>{tr('强调色 · 表面 · 文字', 'Accent · Surface · Text')}</small>
            </div>)}</div>
          </article>
          <article><h3>{tr('排版', 'Typography')}</h3><p className="landing-type-sample">Aa</p><p className="landing-body-sample">{tr('正文样例', 'Body text sample')}</p></article>
          <article><h3>{tr('控件几何', 'Control geometry')}</h3><div className="landing-geometry">{['mini', 'small', 'medium', 'large', 'xl'].map(size => <div key={size} data-size={size}><i/><small>{size}</small></div>)}</div></article>
          <article><h3>{tr('上下文与材质', 'Context and materials')}</h3><div className="landing-materials" data-context="content-area"><span>Solid</span><span data-material="vibrant">Vibrant</span></div><div className="landing-materials" data-context="over-glass"><span data-material="glass-regular">Glass Regular</span><span data-material="glass-clear">Glass Clear</span></div><small>{tr('CSS 材质为网页近似。', 'CSS materials are web approximations.')}</small></article>
          <article><h3>{tr('从数据到组件', 'From data to components')}</h3><p><a href={tokens} download>tokens.json</a> → CSS → Button</p><pre><code>{tokenCode}</code></pre></article>
        </div>
        <div className="landing-actions"><a href={href('/desktop/tokens')}>{tr('查看设计 Tokens', 'Explore design tokens')}</a><a href={guidelines} download>{tr('下载设计规范', 'Download design guidelines')}</a></div>
      </section>
      <section className="landing-section landing-install" aria-labelledby="landing-install">
        <h2 id="landing-install">{tr('从安装到第一个组件', 'From install to your first component')}</h2>
        <div className="landing-step"><div><h3>{tr('安装', 'Install')}</h3><p>{tr('在 React 19 项目中运行。', 'Run this in your React 19 project.')}</p><a href={install}>{tr('查看安装指南', 'Read the installation guide')}</a></div>
          <CopyCode source={installCommands} label={tr('复制安装命令', 'Copy install command')}><pre><code>{installCommands}</code></pre></CopyCode></div>
        <div className="landing-step"><div><h3>{tr('构建', 'Build')}</h3><div className="landing-stage"><Button variant="accent">{tr('保存', 'Save')}</Button></div></div>
          <CopyCode source={exampleCode} label={tr('复制 React 代码', 'Copy React code')}><pre><code>{exampleCode}</code></pre></CopyCode></div>
      </section>
      <section className="landing-section landing-section-white" aria-labelledby="landing-ai">
        <h2 id="landing-ai">{tr('为 AI 编码提供一致的设计语言', 'A consistent design language for AI coding')}</h2>
        <ol className="landing-flow">
          <li><h3>{tr('提供项目资源', 'Supply project resources')}</h3><a href={guidelines} download>{tr('设计规范', 'Design guidelines')}</a><a href={tokens} download>tokens.json</a><a href={api}>{tr('组件 API', 'Component API')}</a></li>
          <li><h3>{tr('交给你的编码工具', 'Use your coding tool')}</h3><p>{tr('让工具按这些资源选择组件和 Tokens。', 'Ask it to select components and tokens using these resources.')}</p></li>
          <li><h3>{tr('验证界面', 'Verify the interface')}</h3><p>{tr('对照组件文档，检查键盘操作和浅深色外观。', 'Check keyboard behavior and both appearances against the component docs.')}</p></li>
        </ol>
        <div className="landing-prompt"><CopyCode source={prompt} label={tr('复制提示词', 'Copy prompt')}><p>{prompt}</p></CopyCode><a href={href('/desktop/resources/ai-integration')}>{tr('查看 AI 集成指南', 'Explore AI integration')}</a></div>
      </section>
      <section className="landing-section landing-community" aria-labelledby="landing-community">
        <div><h2 id="landing-community">{tr('开源项目，持续演进', 'Open source. Built to evolve.')}</h2>
        <p>{tr('项目自有代码采用 MIT 许可证。欢迎通过 GitHub 提交问题、组件建议与文档改进。', 'Project code is MIT licensed. Use GitHub to report issues and propose component or documentation improvements.')}</p><a href={repository + '/blob/main/docs/PROVENANCE.md'}>{tr('查看来源审查', 'View provenance')}</a></div>
        <div className="landing-community-links"><a href={repository}>{tr('查看源码', 'GitHub repository')}</a><a href={href('/desktop/resources/community')}>{tr('参与贡献', 'Contribute')}</a><a href={repository + '/issues'}>{tr('报告问题', 'Report an issue')}</a></div>
      </section>
      <section className="landing-section landing-final" aria-labelledby="landing-start">
        <h2 id="landing-start">{tr('开始构建你的桌面界面', 'Start building your desktop interface')}</h2>
        <p>{tr('在 React 项目中试用组件，再按需引入设计 Tokens。', 'Try the components in a React project and adopt the design tokens as you go.')}</p>
        <div className="landing-actions"><a className="landing-primary" href={install}>{tr('前往安装指南', 'Open the installation guide')}</a><a href={repository}>{tr('查看 GitHub', 'View on GitHub')}</a></div>
      </section>
    </main>
    <footer className="landing-footer">
      <div><strong>CGP Desktop UI</strong><p>{tr('独立开源项目。与 Apple 无隶属关系。', 'An independent open-source project with no affiliation with Apple.')}</p></div>
      <nav aria-label={tr('文档链接', 'Documentation links')}>
        <strong>{tr('文档', 'Documentation')}</strong>
        <a href={docs}>{tr('简介', 'Introduction')}</a>
        <a href={href('/desktop/button')}>{tr('组件', 'Components')}</a>
        <a href={href('/desktop/foundations/color')}>{tr('设计基础', 'Foundations')}</a>
        <a href={href('/desktop/patterns/searching')}>{tr('交互模式', 'Patterns')}</a>
      </nav>
      <nav aria-label={tr('资源链接', 'Resource links')}>
        <strong>{tr('资源', 'Resources')}</strong>
        <a href={href('/desktop/tokens')}>{tr('设计 Tokens', 'Design Tokens')}</a>
        <a href={guidelines} download>{tr('设计规范', 'Design Guidelines')}</a>
        <a href={href('/desktop/resources/ai-integration')}>{tr('AI 集成', 'AI Integration')}</a>
      </nav>
      <nav aria-label={tr('社区链接', 'Community links')}>
        <strong>{tr('社区', 'Community')}</strong>
        <a href={repository}>GitHub</a>
        <a href={repository + '/blob/main/CONTRIBUTING.md'}>{tr('贡献指南', 'Contributing')}</a>
        <a href={repository + '/issues'}>{tr('问题反馈', 'Issues')}</a>
        <a href={repository + '/blob/main/LICENSE'}>MIT</a>
        <a href={repository + '/blob/main/docs/PROVENANCE.md'}>{tr('来源审查', 'Provenance')}</a>
      </nav>
    </footer>
  </div></LocaleContext.Provider>
}
