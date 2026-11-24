import { Badge } from '@macos-tahoe/ui'
import { useEffect, useId, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { navigationByHref, navigationTitle, type NavigationItem } from '../app/navigation'
import { useLocale } from '../app/locale'

type TreeProps = {
  items: NavigationItem[]
  current: string
  collapsed: ReadonlySet<string>
  toggle: (id: string) => void
}

function NavigationTree({ items, current, collapsed, toggle }: TreeProps) {
  const { locale } = useLocale()
  const idPrefix = useId()
  return <ul className="docs-nav-list">
    {items.map(item => {
      const title = navigationTitle(item, locale)
      if (item.href) {
        return <li key={item.id}><a href={item.href} aria-current={item.href === current ? 'page' : undefined}><span>{title}</span>{item.status === 'todo' && <Badge className="docs-nav-todo" aria-hidden="true">TODO</Badge>}</a></li>
      }
      if (!item.children?.length) return null
      const open = !collapsed.has(item.id)
      const region = idPrefix + item.id
      return <li key={item.id}>
        <button type="button" className="docs-nav-toggle" aria-expanded={open} aria-controls={region} onClick={() => toggle(item.id)}>
          <FontAwesomeIcon icon={faChevronRight} className="docs-nav-chevron" aria-hidden="true"/>
          {title}
        </button>
        <div id={region} hidden={!open}>
          <NavigationTree items={item.children} current={current} collapsed={collapsed} toggle={toggle}/>
        </div>
      </li>
    })}
  </ul>
}

export default function DocsNavigation({ items, current }: { items: NavigationItem[]; current: string }) {
  const { tr } = useLocale()
  const panel = useRef<HTMLElement>(null)
  const lastScrolledRoute = useRef<string>(undefined)
  const ancestors = navigationByHref.get(current)?.ancestors
  const [collapsed, setCollapsed] = useState(() => new Set<string>())

  useEffect(() => {
    if (ancestors) {
      setCollapsed(previous => ancestors.some(id => previous.has(id)) ? new Set([...previous].filter(id => !ancestors.includes(id))) : previous)
    }
  }, [current, ancestors])

  useEffect(() => {
    if (lastScrolledRoute.current === current) return
    const sidebar = panel.current
    const active = sidebar?.querySelector('[aria-current="page"]')
    if (!sidebar || !active || !active.getClientRects().length) return
    lastScrolledRoute.current = current
    const viewport = sidebar.getBoundingClientRect()
    const link = active.getBoundingClientRect()
    if (link.top < viewport.top) sidebar.scrollTop += link.top - viewport.top
    if (link.bottom > viewport.bottom) sidebar.scrollTop += link.bottom - viewport.bottom
  }, [current, collapsed])

  function toggle(id: string) {
    setCollapsed(previous => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return <aside className="docs-nav" ref={panel}>
    <nav aria-label={tr('文档分类', 'Documentation categories')}>
      <NavigationTree items={items} current={current} collapsed={collapsed} toggle={toggle}/>
    </nav>
  </aside>
}
