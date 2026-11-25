import { useState } from 'react'
import { Button } from '@cgpdesktopui/ui'
import { documentHref, documentStart, homeHref } from '../app/document-urls'
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

export default function LandingPage({ locale, initialDark = false }: { locale: Locale; initialDark?: boolean }) {
  const [dark, setDark] = useState(initialDark)
  const tr = (zh: string, en: string) => locale === 'en' ? en : zh
  const otherLocale = locale === 'en' ? 'zh-CN' : 'en'
  const href = (route: string) => documentHref(route, locale)
  const { heading, description } = landingMetadata(locale)
  const install = href('/desktop/getting-started/installation')
  const docs = href(documentStart)

  function toggleAppearance() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('desktop-appearance', next ? 'dark' : 'light') } catch { /* storage can be unavailable */ }
  }

  return <LocaleContext.Provider value={locale}><div className="landing" data-theme="desktop">
    <header className="landing-header">
      <a className="landing-brand" href={homeHref(locale)}>CGP Desktop UI</a>
      <nav aria-label={tr('主导航', 'Main navigation')}>
        <a href={docs}>{tr('文档', 'Docs')}</a>
        <a href={href('/desktop/tokens')}>{tr('设计 Tokens', 'Design Tokens')}</a>
        <a href={homeHref(otherLocale)} lang={otherLocale}>{tr('English', '简体中文')}</a>
        <Button aria-pressed={dark} onClick={toggleAppearance}>{tr('深色模式', 'Dark mode')}</Button>
      </nav>
    </header>
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
      <section className="landing-install" aria-labelledby="landing-install">
        <div>
          <h2 id="landing-install">{tr('安装组件包', 'Install the package')}</h2>
          <p>{tr('在 React 19 项目中运行。', 'Run this in your React 19 project.')}</p>
        </div>
        <CopyCode source={installCommands} label={tr('复制安装命令', 'Copy install command')}><pre><code>{installCommands}</code></pre></CopyCode>
      </section>
    </main>
    <footer className="landing-footer">
      <p>{tr('独立开源项目。与 Apple 无隶属关系。', 'An independent open-source project with no affiliation with Apple.')}</p>
      <nav aria-label={tr('页脚导航', 'Footer navigation')}>
        <a href={docs}>{tr('文档', 'Docs')}</a>
        <a href={repository}>GitHub</a>
        <a href={repository + '/blob/main/LICENSE'}>MIT</a>
      </nav>
    </footer>
  </div></LocaleContext.Provider>
}
