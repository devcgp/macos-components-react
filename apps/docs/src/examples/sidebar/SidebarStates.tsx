import { useState } from 'react'
import { Sidebar } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const statesLabels = {
  navigation: "Sidebar interaction states",
  favorites: "Favorites",
  starred: "Starred",
  all: "All Notes",
  folders: "Folders",
  work: "Work",
  hint: "Tab moves focus. Enter or Space selects a collection or toggles a group.",
}

export function SidebarStates({ labels = statesLabels }: { labels?: typeof statesLabels } = {}) {
  const [selected, setSelected] = useState('starred')
  const [collapsed, setCollapsed] = useState<string[]>(['folders'])
  const groups = [
    { id: 'favorites', label: labels.favorites, items: [
      { id: 'starred', label: labels.starred },
      { id: 'all', label: labels.all },
    ] },
    { id: 'folders', label: labels.folders, items: [
      { id: 'work', label: labels.work },
    ] },
  ]

  return (
    <div data-theme="desktop" style={{ maxWidth: '100%', display: 'grid', justifyItems: 'center', gap: 'var(--desktop-gap)' }}>
      <div style={{ width: 'var(--desktop-sidebar-width)', maxWidth: '100%' }}>
        <Sidebar label={labels.navigation} groups={groups} selected={selected} collapsed={collapsed} onSelect={setSelected}
          onToggle={id => setCollapsed(previous => previous.includes(id) ? previous.filter(group => group !== id) : [...previous, id])}/>
      </div>
      <p>{labels.hint}</p>
    </div>
  )
}
