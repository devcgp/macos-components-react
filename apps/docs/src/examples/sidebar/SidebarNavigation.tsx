import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faFolder, faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Sidebar } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const navigationLabels = {
  title: "Notes",
  navigation: "Notes library",
  favorites: "Favorites",
  starred: "Starred",
  all: "All Notes",
  folders: "Folders",
  work: "Work",
  personal: "Personal",
  deleted: "Recently Deleted",
  current: "Selected collection",
}

export function SidebarNavigation({ labels = navigationLabels }: { labels?: typeof navigationLabels } = {}) {
  const [selected, setSelected] = useState('starred')
  const [collapsed, setCollapsed] = useState<string[]>([])
  const groups = [
    { id: 'favorites', label: labels.favorites, items: [
      { id: 'starred', label: labels.starred, icon: <FontAwesomeIcon icon={faStar}/> },
      { id: 'all', label: labels.all, icon: <FontAwesomeIcon icon={faFileLines}/> },
    ] },
    { id: 'folders', label: labels.folders, items: [
      { id: 'work', label: labels.work, icon: <FontAwesomeIcon icon={faFolder}/> },
      { id: 'personal', label: labels.personal, icon: <FontAwesomeIcon icon={faFolder}/> },
      { id: 'deleted', label: labels.deleted, icon: <FontAwesomeIcon icon={faTrashCan}/> },
    ] },
  ]
  const current = groups.flatMap(group => group.items).find(item => item.id === selected)?.label

  return (
    <div data-theme="desktop" style={{ width: '100%', minWidth: 0, display: 'grid', gap: 'var(--desktop-gap)' }}>
      <div style={{ padding: 'calc(var(--desktop-gap) * 2)', borderRadius: 'var(--desktop-window-radius)',
        background: 'linear-gradient(135deg, var(--desktop-accents-yellow), var(--desktop-accents-green))' }}>
        <div style={{ width: 'var(--desktop-sidebar-width)', maxWidth: '100%', overflow: 'hidden',
          borderRadius: 'var(--desktop-control-radius)', background: 'var(--desktop-content-surface)' }}>
          <h4 style={{ padding: 'calc(var(--desktop-gap) * 2)', fontSize: 'var(--desktop-title)', fontWeight: 600 }}>{labels.title}</h4>
          <Sidebar label={labels.navigation} groups={groups} selected={selected} collapsed={collapsed} onSelect={setSelected}
            onToggle={id => setCollapsed(previous => previous.includes(id) ? previous.filter(group => group !== id) : [...previous, id])}/>
        </div>
      </div>
      <output style={{ overflowWrap: 'anywhere' }}>{labels.current}: {current}</output>
    </div>
  )
}
