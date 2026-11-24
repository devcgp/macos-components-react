import type { ReactNode } from 'react'

export function Toolbar({ title, detail, filters, actions, search, filtersLabel = "筛选", actionsLabel = "显示操作" }: {
  filtersLabel?: string
  actionsLabel?: string
  title: string
  detail?: ReactNode
  filters?: ReactNode
  actions?: ReactNode
  search?: ReactNode
}) {
  return <header className="tahoe-toolbar">
    <div className="tahoe-toolbar-title"><strong>{title}</strong>{detail && <small>{detail}</small>}</div>
    <div className="tahoe-toolbar-controls">
      {filters && <div className="tahoe-toolbar-group" role="group" aria-label={filtersLabel}>{filters}</div>}
      {actions && <div className="tahoe-toolbar-group" role="group" aria-label={actionsLabel}>{actions}</div>}
      {search}
    </div>
  </header>
}
