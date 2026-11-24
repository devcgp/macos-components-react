import type { ComponentProps, ReactNode } from 'react'

export function TrafficLights() {
  return <span className="tahoe-traffic-lights" aria-hidden="true"><i/><i/><i/></span>
}

export function TitleBar({ title, actions }: { title: string; actions?: ReactNode }) {
  return <div className="tahoe-title-bar"><TrafficLights/><strong>{title}</strong>{actions}</div>
}

export function Window({ title, toolbar, children }: { title: string; toolbar?: ReactNode; children: ReactNode }) {
  return <section className="tahoe-window" aria-label={title}>
    <TitleBar title={title}/>{toolbar}{children}
  </section>
}

export function SplitView({ leading, children }: { leading?: ReactNode; children: ReactNode }) {
  return <div className="tahoe-split-view" data-has-leading={!!leading}>
    {leading && <div className="tahoe-split-leading">{leading}</div>}
    <div className="tahoe-split-content">{children}</div>
  </div>
}

export function InspectorPanel({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="tahoe-inspector" aria-label={title}><strong>{title}</strong><div>{children}</div></aside>
}

export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return <fieldset className="tahoe-settings"><legend>{title}</legend>{children}</fieldset>
}

export function Table({ caption, columns, rows }: {
  caption: string
  columns: { id: string; label: string }[]
  rows: { id: string; cells: Record<string, ReactNode> }[]
}) {
  return <div className="tahoe-table-wrap"><table className="tahoe-table">
    <caption>{caption}</caption>
    <thead><tr>{columns.map(column => <th key={column.id} scope="col">{column.label}</th>)}</tr></thead>
    <tbody>{rows.map(row => <tr key={row.id}>{columns.map(column => <td key={column.id}>{row.cells[column.id]}</td>)}</tr>)}</tbody>
  </table></div>
}

export function List({ className = '', ...props }: ComponentProps<'ul'>) {
  return <ul {...props} className={`tahoe-list ${className}`}/>
}
