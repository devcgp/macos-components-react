import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { Button, Sidebar, Window } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const windowLabels = {
  title: "Notes",
  show: "Show sidebar",
  hide: "Hide sidebar",
  navigation: "Window collections",
  folders: "Folders",
  work: "Work",
  personal: "Personal",
  longName: "Research, design references, and project notes",
  current: "Selected collection",
}

export function SidebarInWindow({ labels = windowLabels }: { labels?: typeof windowLabels } = {}) {
  const [visible, setVisible] = useState(true)
  const [selected, setSelected] = useState('work')
  const [collapsed, setCollapsed] = useState<string[]>([])
  const groups = [
    { id: 'folders', label: labels.folders, items: [
      { id: 'work', label: labels.work, icon: <FontAwesomeIcon icon={faFolder}/> },
      { id: 'personal', label: labels.personal, icon: <FontAwesomeIcon icon={faFolder}/> },
      { id: 'research', label: labels.longName, icon: <FontAwesomeIcon icon={faFolder}/> },
    ] },
  ]
  const current = groups[0].items.find(item => item.id === selected)?.label

  return (
    <div data-theme="tahoe" style={{ width: '100%', minWidth: 0 }}>
      <Window title={labels.title} toolbar={
        <div style={{ padding: 'var(--tahoe-gap)' }}>
          <Button aria-pressed={visible} onClick={() => setVisible(previous => !previous)}>{visible ? labels.hide : labels.show}</Button>
        </div>
      }>
        <div style={{ display: 'flex', flexWrap: 'wrap', minWidth: 0 }}>
          {visible && <div style={{ flex: '0 0 var(--tahoe-sidebar-width)', minWidth: 0, maxWidth: '100%' }}>
            <Sidebar label={labels.navigation} groups={groups} selected={selected} collapsed={collapsed} onSelect={setSelected}
              onToggle={id => setCollapsed(previous => previous.includes(id) ? previous.filter(group => group !== id) : [...previous, id])}/>
          </div>}
          <div style={{ flex: '1 1 calc(var(--tahoe-sidebar-width) / 2)', minWidth: 0, padding: 'calc(var(--tahoe-gap) * 2)', overflowWrap: 'anywhere' }}>
            <output>{labels.current}: {current}</output>
          </div>
        </div>
      </Window>
    </div>
  )
}
