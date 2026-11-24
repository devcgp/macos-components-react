import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'
import type { ComponentProps, ReactNode } from 'react'


export function SearchField({ className = '', ...props }: ComponentProps<'input'>) {
  return <span className={`tahoe-search ${className}`}><FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true"/><input type="search" {...props}/></span>
}


export function Dropdown({ label, icon, selected, options, onSelect, selectedLabel = '（当前选中）' }: {
  selectedLabel?: string
  label: string
  icon?: ReactNode
  selected: string[]
  options: { value: string; label: string }[]
  onSelect: (value: string) => void
}) {
  return <Menu>
    <MenuButton className="tahoe-menu-trigger" aria-label={label} title={label} data-filtered={selected.some(Boolean)}>
      {icon ?? label}<FontAwesomeIcon icon={faSort} aria-hidden="true"/>
    </MenuButton>
    <MenuItems anchor="bottom end" className="tahoe-menu">
      {options.map(option => <MenuItem key={option.value}>
        <button type="button" onClick={() => onSelect(option.value)}>
          <span aria-hidden="true">{selected.includes(option.value) ? "✓" : ""}</span>{option.label}{selected.includes(option.value) && <span className="sr-only">{selectedLabel}</span>}
        </button>
      </MenuItem>)}
    </MenuItems>
  </Menu>
}


export function Radio({ label, ...props }: Omit<ComponentProps<'input'>, 'type'> & { label: string }) {
  return <label className="tahoe-choice"><input {...props} type="radio"/>{label}</label>
}


export function SegmentedControl({ label, name, value, options, onChange }: {
  label: string
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return <div className="tahoe-segments" role="radiogroup" aria-label={label}>
    {options.map(option => <label key={option}>
      <input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)}/>
      <span>{option}</span>
    </label>)}
  </div>
}
