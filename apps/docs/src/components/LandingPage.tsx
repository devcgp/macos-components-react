import { Button, Checkbox, InspectorPanel, Table, TextField, Toolbar, Window } from '@cgpdesktopui/ui'
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
  const guidelines = locale === 'en' ? '/downloads/design.en.md' : '/downloads/design.md'
  const capabilities = [
    [tr('组件', 'Components'), tr('表单控件与桌面布局。', 'Form controls and desktop layouts.'), '/desktop/button'],
    [tr('设计基础', 'Foundations'), tr('色彩、排版与材质。', 'Color, typography, and materials.'), '/desktop/foundations/color'],
    [tr('设计 Tokens', 'Design Tokens'), tr('用于实现主题和控件的共享参数。', 'Shared values for themes and controls.'), '/desktop/tokens'],
    [tr('交互模式', 'Patterns'), tr('搜索、反馈与常见桌面交互。', 'Search, feedback, and common desktop interactions.'), '/desktop/patterns/searching'],
  ]
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
          <h1 id="landing-title">{heading}</h1>
          <p>{description}</p>
          <div className="landing-actions">
            <a className="landing-primary" href={install}>{tr('开始使用', 'Get Started')}</a>
            <a href={repository}>{tr('查看 GitHub', 'View on GitHub')}</a>
          </div>
        </div>
        <figure className="landing-preview">
          <SidebarInWindow labels={locale === 'zh-CN' ? windowZh : undefined}/>
          <figcaption><a href={href('/desktop/sidebar')}>{tr('查看 Sidebar 交互文档', 'Explore the Sidebar example')}</a></figcaption>
        </figure>
      </section>
      <section className="landing-section" aria-labelledby="landing-system">
        <h2 id="landing-system">{tr('从设计规范到 React 组件', 'From design foundations to React components')}</h2>
        <div className="landing-grid">
          {capabilities.map(([label, detail, route]) => <article key={route}><h3><a href={href(route)}>{label}</a></h3><p>{detail}</p></article>)}
        </div>
      </section>
      <section className="landing-section" aria-labelledby="landing-components">
        <h2 id="landing-components">{tr('试用组件', 'Try the components')}</h2>
        <div className="landing-grid">
          <article><h3><a href={href('/desktop/button')}>Button</a></h3><Button variant="accent">{tr('继续', 'Continue')}</Button> <Button disabled>{tr('不可用', 'Unavailable')}</Button></article>
          <article><h3><a href={href('/desktop/checkbox')}>Checkbox</a></h3><Checkbox label={tr('显示网格', 'Show grid')} defaultChecked/></article>
          <article><h3><a href={href('/desktop/text-field')}>Text Field</a></h3><TextField label={tr('图库名称', 'Library name')} defaultValue={tr('照片图库', 'Photo Library')}/></article>
          <article><h3><a href={href('/desktop/sidebar')}>Sidebar</a></h3><p>{tr('试用首屏窗口中的目录切换与分组折叠。', 'Select collections and collapse groups in the window above.')}</p><a href="#landing-title">{tr('返回窗口示例', 'Return to the window example')}</a></article>
        </div>
      </section>
      <section className="landing-section" aria-labelledby="landing-showcase">
        <h2 id="landing-showcase">{tr('桌面界面示例', 'Desktop interface example')}</h2>
        <p>{tr('在一个窗口中组合工具栏、内容表格和检查器。', 'Combine a toolbar, content table, and inspector in one window.')}</p>
        <Window title={tr('项目资料', 'Project files')} toolbar={<Toolbar title={tr('设计资料', 'Design files')} detail={tr('2 个项目', '2 items')}/>}>
          <div className="landing-showcase">
            <Table caption={tr('文件列表', 'File list')} columns={[{id:'name', label:tr('名称', 'Name')}, {id:'format', label:tr('格式', 'Format')}]}
              rows={[{id:'tokens', cells:{name:'Design Tokens', format:'JSON'}}, {id:'guidelines', cells:{name:'Design Guidelines', format:'Markdown'}}]}/>
            <InspectorPanel title={tr('资源', 'Resources')}>
              <a href="/downloads/tokens.json" download>tokens.json</a><br/>
              <a href={guidelines} download>{tr('设计规范', 'Design Guidelines')}</a>
            </InspectorPanel>
          </div>
        </Window>
        <p><a href={href('/desktop/patterns/file-management')}>{tr('查看文件管理模式', 'Explore file management patterns')}</a></p>
      </section>
      <section className="landing-section" aria-labelledby="landing-tokens">
        <h2 id="landing-tokens">{tr('设计基础与 Tokens', 'Foundations and design tokens')}</h2>
        <p>{tr('JSON 数据生成 CSS 变量，供组件与主题使用。', 'JSON data generates the CSS variables used by components and themes.')}</p>
        <div className="landing-grid">
          <article><h3>{tr('色彩与外观', 'Color and appearance')}</h3><div className="landing-swatches">{['light', 'dark'].map(mode => <span key={mode} data-theme="desktop" data-appearance={mode}>{mode === 'light' ? tr('浅色', 'Light') : tr('深色', 'Dark')}</span>)}</div></article>
          <article><h3>{tr('排版与控件尺寸', 'Typography and control geometry')}</h3><p>Mini · Small · Medium · Large · XL</p><a href={href('/desktop/foundations/control-geometry')}>{tr('查看控件尺寸', 'View control geometry')}</a></article>
          <article><h3>{tr('上下文与材质', 'Context and materials')}</h3><p>Content Area · Over Glass</p><p>Solid · Vibrant · Glass Regular · Glass Clear</p><a href={href('/desktop/foundations/materials')}>{tr('查看材质', 'View materials')}</a></article>
        </div>
        <div className="landing-actions"><a href={href('/desktop/tokens')}>{tr('查看设计 Tokens', 'Explore design tokens')}</a><a href={guidelines} download>{tr('下载设计规范', 'Download design guidelines')}</a></div>
      </section>
      <section className="landing-section landing-install" aria-labelledby="landing-install">
        <div>
          <h2 id="landing-install">{tr('安装组件包', 'Install the package')}</h2>
          <p>{tr('在 React 19 项目中运行。', 'Run this in your React 19 project.')}</p>
          <a href={install}>{tr('查看安装指南', 'Read the installation guide')}</a>
        </div>
        <CopyCode source={installCommands} label={tr('复制安装命令', 'Copy install command')}><pre><code>{installCommands}</code></pre></CopyCode>
        <div><h3>{tr('最小示例', 'Minimal example')}</h3><Button variant="accent">{tr('保存', 'Save')}</Button></div>
        <CopyCode source={exampleCode} label={tr('复制 React 代码', 'Copy React code')}><pre><code>{exampleCode}</code></pre></CopyCode>
      </section>
      <section className="landing-section" aria-labelledby="landing-ai">
        <h2 id="landing-ai">{tr('AI 开发集成', 'AI integration')}</h2>
        <p>{tr('将设计规范、Token 数据和组件 API 一起提供给 AI 编码工具。生成代码后，用组件文档核对属性与交互。', 'Give your AI coding tool the design guidelines, token data, and component API. Check the generated code against the documented props and interactions.')}</p>
        <div className="landing-actions"><a href={href('/desktop/resources/ai-integration')}>{tr('查看 AI 集成指南', 'Explore AI integration')}</a><a href="/downloads/tokens.json" download>tokens.json</a><a href={repository + '/blob/main/docs/components.md'}>{tr('查看组件 API', 'View the component API')}</a></div>
      </section>
      <section className="landing-section" aria-labelledby="landing-community">
        <h2 id="landing-community">{tr('开源与社区', 'Open source and community')}</h2>
        <p>{tr('项目自有代码采用 MIT 许可证。欢迎通过 GitHub 提交问题、组件建议与文档改进。', 'Project code is MIT licensed. Use GitHub to report issues and propose component or documentation improvements.')}</p>
        <div className="landing-actions"><a href={href('/desktop/resources/community')}>{tr('参与贡献', 'Contribute')}</a><a href={repository + '/issues'}>{tr('报告问题', 'Report an issue')}</a><a href={repository + '/blob/main/docs/PROVENANCE.md'}>{tr('查看来源审查', 'View provenance')}</a></div>
      </section>
      <section className="landing-section landing-final" aria-labelledby="landing-start">
        <h2 id="landing-start">{tr('开始构建你的桌面界面', 'Start building your desktop interface')}</h2>
        <div className="landing-actions"><a className="landing-primary" href={install}>{tr('前往安装指南', 'Open the installation guide')}</a><a href={repository}>GitHub</a></div>
      </section>
    </main>
    <footer className="landing-footer">
      <p>{tr('独立开源项目。与 Apple 无隶属关系。', 'An independent open-source project with no affiliation with Apple.')}</p>
      <nav aria-label={tr('页脚导航', 'Footer navigation')}>
        <a href={docs}>{tr('文档', 'Docs')}</a>
        <a href={repository}>GitHub</a>
        <a href={href('/desktop/tokens')}>{tr('设计 Tokens', 'Design Tokens')}</a>
        <a href={guidelines}>{tr('设计规范', 'Design Guidelines')}</a>
        <a href={href('/desktop/resources/ai-integration')}>{tr('AI 集成', 'AI Integration')}</a>
        <a href={repository + '/blob/main/CONTRIBUTING.md'}>{tr('贡献指南', 'Contributing')}</a>
        <a href={repository + '/blob/main/LICENSE'}>MIT</a>
      </nav>
    </footer>
  </div></LocaleContext.Provider>
}
