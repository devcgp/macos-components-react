import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLocale } from '../app/locale'
import type { NavigationItem } from '../app/navigation'
import DocsNavigation from './DocsNavigation'

export default function DocsLayout({ header, navigation, current, toc, children }: {
  header: ReactNode
  navigation: NavigationItem[]
  current: string
  toc: { href: string; title: string }[]
  children: ReactNode
}) {
  const { tr } = useLocale()
  const shell = useRef<HTMLDivElement>(null)
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

  return <div ref={shell} className="docs-shell">
    <a className="skip-link" href="#main">{tr("跳到正文", "Skip to content")}</a>
    <div ref={topbar} className="docs-topbar">{header}</div>
    <div className="docs-layout">
      <DocsNavigation items={navigation} current={current}/>
      <main id="main" tabIndex={-1}>{children}</main>
      <aside className="docs-toc" aria-label={tr("本页目录", "On this page")}>
        {toc.length > 0 && <><h2>{tr("本页目录", "On this page")}</h2><ul>{toc.map(item => <li key={item.href}>
          <button type="button" onClick={() => document.getElementById(item.href)?.scrollIntoView()}>{item.title}</button>
        </li>)}</ul></>}
      </aside>
    </div>
  </div>
}
