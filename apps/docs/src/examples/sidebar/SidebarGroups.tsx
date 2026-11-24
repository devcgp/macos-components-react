import { useState } from 'react'
import { Sidebar } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const groupsLabels = {
  navigation: "Grouped notes",
  favorites: "Favorites",
  starred: "Starred",
  all: "All Notes",
  folders: "Folders",
  work: "Work",
  personal: "Personal",
}

export function SidebarGroups({ labels = groupsLabels }: { labels?: typeof groupsLabels } = {}) {
  const [selected, setSelected] = useState('starred')
  const [collapsed, setCollapsed] = useState<string[]>(['folders'])
  const groups = [
    { id: 'favorites', label: labels.favorites, items: [
      { id: 'starred', label: labels.starred },
      { id: 'all', label: labels.all },
    ] },
    { id: 'folders', label: labels.folders, items: [
      { id: 'work', label: labels.work },
      { id: 'personal', label: labels.personal },
    ] },
  ]

  return (
    <div data-theme="tahoe" style={{ width: 'var(--tahoe-sidebar-width)', maxWidth: '100%' }}>
      <Sidebar label={labels.navigation} groups={groups} selected={selected} collapsed={collapsed} onSelect={setSelected}
        onToggle={id => setCollapsed(previous => previous.includes(id) ? previous.filter(group => group !== id) : [...previous, id])}/>
    </div>
  )
}
