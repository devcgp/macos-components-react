import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

type SidebarItem = { id: string; label: string; icon?: ReactNode }
type SidebarGroup = { id: string; label: string; items: SidebarItem[] }

export function Sidebar({ groups, selected, collapsed, onSelect, onToggle, label = "图库目录" }: {
  label?: string
  groups: SidebarGroup[]
  selected: string
  collapsed: string[]
  onSelect: (id: string) => void
  onToggle: (id: string) => void
}) {
  return <nav className="tahoe-sidebar" aria-label={label}>
    {groups.map(group => <div key={group.id} className="tahoe-sidebar-group">
      <button type="button" className="tahoe-sidebar-row tahoe-sidebar-heading" aria-expanded={!collapsed.includes(group.id)} onClick={() => onToggle(group.id)}>
        {group.label}<FontAwesomeIcon icon={faChevronRight} aria-hidden="true"/>
      </button>
      {!collapsed.includes(group.id) && <ul>{group.items.map(item => <li key={item.id}>
        <button type="button" className="tahoe-sidebar-row" aria-current={item.id === selected ? 'true' : undefined} onClick={() => onSelect(item.id)}>
          {item.icon && <span className="tahoe-sidebar-icon" aria-hidden="true">{item.icon}</span>}
          <span className="tahoe-sidebar-label">{item.label}</span>
        </button>
      </li>)}</ul>}
    </div>)}
  </nav>
}
