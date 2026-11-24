import { Menu, MenuButton, MenuItems, MenuItem, Popover as HeadlessPopover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState, type ReactNode } from 'react'

export type MenuAction = { id: string; label: string; disabled?: boolean; onSelect: () => void }

export function DropdownMenu({ label, actions }: { label: string; actions: MenuAction[] }) {
  return <Menu>
    <MenuButton className="tahoe-menu-trigger">{label}</MenuButton>
    <MenuItems anchor="bottom start" className="tahoe-menu">
      <MenuActions actions={actions}/>
    </MenuItems>
  </Menu>
}

function MenuActions({ actions }: { actions: MenuAction[] }) {
  return actions.map(action => <MenuItem key={action.id} disabled={action.disabled}>
    <button type="button" disabled={action.disabled} onClick={action.onSelect}><span aria-hidden="true"/>{action.label}</button>
  </MenuItem>)
}

/** Web approximation: native right-click requests open the same keyboard-accessible menu. */
export function ContextMenu({ label, actions }: { label: string; actions: MenuAction[] }) {
  return <Menu>
    {({ open }) => <ContextTrigger label={label} actions={actions} open={open}/>}
  </Menu>
}

function ContextTrigger({ label, actions, open }: { label: string; actions: MenuAction[]; open: boolean }) {
  return <>
    <MenuButton className="tahoe-menu-trigger" onContextMenu={event => {
      event.preventDefault()
      if (!open) event.currentTarget.click()
    }}>{label}</MenuButton>
    <MenuItems anchor="bottom start" className="tahoe-menu"><MenuActions actions={actions}/></MenuItems>
  </>
}

export function Popover({ label, children }: { label: string; children: ReactNode }) {
  return <HeadlessPopover>
    <PopoverButton className="tahoe-button">{label}</PopoverButton>
    <PopoverPanel anchor="bottom start" className="tahoe-menu tahoe-popover">{children}</PopoverPanel>
  </HeadlessPopover>
}

export function Tabs({ label, items, value, defaultValue, onValueChange }: {
  label: string
  items: { id: string; label: string; panel: ReactNode; disabled?: boolean }[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  const [initialIndex] = useState(() => Math.max(0, items.findIndex(item => item.id === defaultValue)))
  const index = value === undefined ? undefined : items.findIndex(item => item.id === value)
  return <TabGroup defaultIndex={initialIndex} selectedIndex={index === -1 ? 0 : index}
    onChange={selection => { if (items[selection]) onValueChange?.(items[selection].id) }}>
    <TabList aria-label={label} className="tahoe-tabs">
      {items.map(item => <Tab key={item.id} disabled={item.disabled}>{item.label}</Tab>)}
    </TabList>
    <TabPanels>{items.map(item => <TabPanel key={item.id} className="tahoe-tab-panel">{item.panel}</TabPanel>)}</TabPanels>
  </TabGroup>
}

export function Breadcrumb({ items, label = "路径" }: { label?: string; items: { label: string; href: string }[] }) {
  return <nav aria-label={label}><ol className="tahoe-breadcrumb">
    {items.map((item, index) => <li key={item.href}>{index === items.length - 1
      ? <span aria-current="page">{item.label}</span>
      : <a href={item.href}>{item.label}</a>}</li>)}
  </ol></nav>
}
