import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLocale } from '../app/locale'
import type { NavigationItem } from '../app/navigation'
import DocsNavigation from './DocsNavigation'

export default function DocsLayout({ header, heading, navigation, current, toc, children }: {
  header: ReactNode
  heading: ReactNode
  navigation: NavigationItem[]
  current: string
  toc: { href: string; title: string }[]
  children: ReactNode
}) {
  const { tr } = useLocale()
  const shell = useRef<HTMLDivElement>(null)
  const mobileToc = useRef<HTMLDetailsElement>(null)
  const topbar = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const layout = shell.current
    const bar = topbar.current
    if (!layout || !bar) return

    const updateHeight = () => layout.style.setProperty('--docs-header-height', bar.getBoundingClientRect().height + 'px')

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  function goToSection(id: string) {
    if (mobileToc.current) mobileToc.current.open = false
    const target = document.getElementById(id)
    if (!target) return
    target.tabIndex = -1
    target.focus({ preventScroll: true })
    target.scrollIntoView()
  }

  const tocLinks = <ul>{toc.map(item => <li key={item.href}>
    <button type="button" onClick={() => goToSection(item.href)}>{item.title}</button>
  </li>)}</ul>

  return <div ref={shell} className="docs-shell">
    <a className="skip-link" href="#main">{tr('跳到正文', 'Skip to content')}</a>
    <div ref={topbar} className="docs-topbar">{header}</div>
    <div className="docs-layout">
      <DocsNavigation items={navigation} current={current}/>
      <main id="main" tabIndex={-1}>
        {heading}
        {toc.length > 0 && <details key={current} className="mobile-toc" ref={mobileToc}>
          <summary>{tr('本页目录', 'On this page')}</summary>
          {tocLinks}
        </details>}
        {children}
      </main>
      <aside className="docs-toc" aria-label={tr('本页目录', 'On this page')}>
        {toc.length > 0 && <><h2>{tr('本页目录', 'On this page')}</h2>{tocLinks}</>}
      </aside>
    </div>
  </div>
}
