# Sidebar

> Project: macOS Tahoe Components\
> Component: `Sidebar`\
> Status: Phase 1 · Checked against the current repository implementation; documentation remains editable\
> Route: `#/tahoe/sidebar`\
> Source: `packages/ui/src/components/sidebar.tsx`\
> Styles: `packages/ui/src/styles/tahoe-tokens.css`\
> Note: “Implemented” describes the inspected code. “Suggested improvements” are not public APIs.

## Overview

Sidebar organizes grouped navigation in a macOS-inspired desktop web application, such as a photo library, folders, collections, or preferences. It keeps navigation alongside the content, lets users expand or collapse groups, and marks the current item. The current component is **controlled**: its parent owns selection and expanded-group state. It does not implement business routing or render the destination page.

Use it for desktop window sidebars and grouped navigation. Nested tree views, drag-and-drop rearrangement, mobile drawers, and resizing are not built in.

## Anatomy

The current implementation renders:

1. **Navigation (`nav.tahoe-sidebar`)** — navigation region whose accessible name is set by the optional `label` prop.
2. **Group (`.tahoe-sidebar-group`)** — container for one group.
3. **Group Heading (`button.tahoe-sidebar-heading`)** — expands/collapses the group and exposes `aria-expanded`.
4. **Disclosure Chevron** — decorative Font Awesome `faChevronRight` rotated by 90° when expanded.
5. **Item List (`ul > li`)** — present while the group is expanded.
6. **Navigation Item (`button.tahoe-sidebar-row`)** — calls `onSelect(item.id)` on activation.
7. **Optional Icon (`.tahoe-sidebar-icon`)** — optional decorative `ReactNode` under `aria-hidden`.
8. **Item Label (`.tahoe-sidebar-label`)** — title with ellipsis truncation.
9. **Current Selection** — `aria-current="true"` when `item.id === selected`.

Search, resizable panels, context menus, nested groups, and a global collapsed-sidebar mode are **not implemented**.

## Live Preview

The documentation site's React renderer inserts real interactive examples into this section. Do not embed executable JSX in Markdown. Every card must provide independent **Preview / Code** and **Light / Dark** tabs, plus working TSX code copying.

| Card | Preview content | Interaction |
| --- | --- | --- |
| **Sidebar Navigation** | Notes title, Favorites / Folders groups, icons and system-color gradient | Selecting a row updates the highlighted item and collection output |
| **Sidebar Groups** | At least two independently expandable groups | Group headers toggle expansion and `aria-expanded` |
| **Sidebar States** | Current, Hover, Pressed, Focus, Expanded, Collapsed | Verify states through real mouse/keyboard interactions; no invented disabled state |
| **Sidebar in Window** | Sidebar alongside a content panel | Card-local theme switching and narrow layout checks; no fake responsive API |

The content panel/window wrapper belongs to the **example**, not to the Sidebar API. Do not invent `size`, `variant`, `collapsedWidth`, or `resizable` props.

## Sizes

`Sidebar` has **no `size` prop**. These are current CSS layout values, not selectable size variants.

| Metric | Current value | Source |
| --- | --- | --- |
| Default sidebar-width token | `220px` | `--tahoe-sidebar-width`, consumed by a parent layout |
| Minimum navigation row height | `28px` | `--tahoe-sidebar-row-height` |
| Row border radius | `5px` | `--tahoe-sidebar-row-radius` |
| Sidebar and row horizontal inset | `8px` | `--tahoe-sidebar-inset` |
| Gap between groups | `16px` | `--tahoe-sidebar-group-gap` |
| Icon column width | `16px` | `.tahoe-sidebar-icon` |
| Group heading minimum height | `16px` | `.tahoe-sidebar-heading` |
| Heading bottom margin | `4px` | `.tahoe-sidebar-heading` |

The parent layout uses `--tahoe-sidebar-width` as its 220px reference and limits it to available space. The window example wraps the content when necessary.

## Variants

There is **no `variant` prop**. Content configurations such as with/without icons or one/multiple groups are examples, not API variants. Light and Dark are theme modes, not Sidebar variants.

## States

| State | Current behavior | Notes |
| --- | --- | --- |
| Default | Unselected row | Normal styling |
| Hover | `.tahoe-sidebar-row:hover` | `--tahoe-fills-tertiary` |
| Pressed | `.tahoe-sidebar-row:active` | `--tahoe-fills-primary` |
| Focus | `.tahoe-sidebar-row:focus-visible` | `2px` accent outline, `-2px` offset |
| Current / Selected | `aria-current="true"` | Parent-provided `selected`; `--tahoe-selection` |
| Expanded | `aria-expanded="true"` | Group children are rendered; chevron rotates |
| Collapsed | `aria-expanded="false"` | Group children are not rendered |
| Disabled | **Not implemented / N/A** | No disabled-item API |
| Loading | **Not implemented / N/A** | No loading API |

Hover, Pressed, and Focus should be verified using genuine interactions rather than fabricated previews.

## Behavior

- **Select an item:** activating a row calls `onSelect(item.id)`. The parent updates `selected`; the component does not navigate on its own.
- **Toggle a group:** activating a heading calls `onToggle(group.id)`. The parent maintains the `collapsed: string[]` array.
- **Initial state:** both `selected` and `collapsed` are required; there is no built-in default selection or uncontrolled mode.
- **Keyboard:** headings and items are native `button type="button"` elements with Tab navigation and Enter/Space activation. Arrow-key tree navigation and roving tabindex are not provided.
- **Icons:** the optional icon node is treated as decorative (`aria-hidden`).
- **Identifiers:** callers should supply stable group IDs and navigation-wide unique item IDs.

## Accessibility

**Currently implemented:**

- Semantic `nav`, `button`, `ul`, and `li` elements.
- `aria-expanded` on group headings and `aria-current="true"` on the selected row.
- Decorative chevrons/icons hidden from assistive technologies.
- Native Tab, Enter, and Space button behavior; `:focus-visible` outline.
- Supply `label` to localize the navigation landmark. English examples provide an English name.
- `aria-current="true"` is the exact current value; `aria-current="page"` may be evaluated for page navigation but is not currently emitted.

## API Reference

Verified against `packages/ui/src/components/sidebar.tsx`. The five controlled props are required; the navigation `label` is optional.

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | `string` | No | Accessible navigation name. Defaults to the existing Chinese gallery label. |
| `groups` | `SidebarGroup[]` | Yes | Rendered groups and items |
| `selected` | `string` | Yes | Currently selected item ID |
| `collapsed` | `string[]` | Yes | IDs of collapsed groups |
| `onSelect` | `(id: string) => void` | Yes | Invoked when an item is activated |
| `onToggle` | `(id: string) => void` | Yes | Invoked when a heading is activated |

Internal (not separately exported) data shapes:

```ts
type SidebarItem = {
  id: string
  label: string
  icon?: React.ReactNode
}

type SidebarGroup = {
  id: string
  label: string
  items: SidebarItem[]
}
```

**Not supported as public props:** `size`, `variant`, `defaultSelected`, `defaultCollapsed`, `disabled`, `ariaLabel`, `resizable`, `onResize`, `children`, `className`, and `ref`. Do not use them in copyable examples.

## Code Example

A controlled example using the current public API. The data and companion content belong to the caller.

```tsx
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faFolder, faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Sidebar } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

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
    <div data-theme="tahoe" style={{ width: '100%', minWidth: 0, display: 'grid', gap: 'var(--tahoe-gap)' }}>
      <div style={{ padding: 'calc(var(--tahoe-gap) * 2)', borderRadius: 'var(--tahoe-window-radius)',
        background: 'linear-gradient(135deg, var(--tahoe-accents-yellow), var(--tahoe-accents-green))' }}>
        <div style={{ width: 'var(--tahoe-sidebar-width)', maxWidth: '100%', overflow: 'hidden',
          borderRadius: 'var(--tahoe-control-radius)', background: 'var(--tahoe-content-surface)' }}>
          <h4 style={{ padding: 'calc(var(--tahoe-gap) * 2)', fontSize: 'var(--tahoe-title)', fontWeight: 600 }}>{labels.title}</h4>
          <Sidebar label={labels.navigation} groups={groups} selected={selected} collapsed={collapsed} onSelect={setSelected}
            onToggle={id => setCollapsed(previous => previous.includes(id) ? previous.filter(group => group !== id) : [...previous, id])}/>
        </div>
      </div>
      <output style={{ overflowWrap: 'anywhere' }}>{labels.current}: {current}</output>
    </div>
  )
}
```

The example composes the Notes title, system-color gradient and selection output. Its width uses `--tahoe-sidebar-width` with a container limit. Icons use the existing Font Awesome dependencies.

## Design Specifications

**Geometry**

- Indentation, row height, radius, and group gap use `--tahoe-sidebar-inset`, `--tahoe-sidebar-row-height`, `--tahoe-sidebar-row-radius`, and `--tahoe-sidebar-group-gap`.
- The parent layout controls width; `--tahoe-sidebar-width` is the default window-layout reference.

**Typography**

- Body labels use `--tahoe-font` and `--tahoe-body`.
- Group headings use `--tahoe-caption`, weight `600`.

**Color**

- Text: `--tahoe-label`; secondary headings: `--tahoe-text-secondary`.
- Sidebar surface: `--tahoe-sidebar-surface`; divider: `--tahoe-separator`.
- Icons/focus: `--tahoe-accent`; current item: `--tahoe-selection`.
- Unselected rows use `--tahoe-fills-tertiary` on hover and `--tahoe-fills-primary` when pressed. The current row keeps `--tahoe-selection` in both states.

**Material / Theme**

- The root `.dark` class controls the site appearance. Cards use `data-theme="tahoe"` and `data-appearance` for local appearance while keeping selection and group state.
- `--tahoe-sidebar-surface` uses Vibrant Fills semantic colors. This is a web approximation, not an Apple-certified native material specification.
- The current geometry comes from project Web conventions and third-party references, not validated pixel-perfect Apple Tahoe 26 measurements.

## References

- [Apple HIG · Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Third-party macOS Components reference](https://github.com/tamnguyenvan/macos-components)
- Source: `packages/ui/src/components/sidebar.tsx`
- Styles: `packages/ui/src/styles/tahoe-tokens.css`
- Project documents: `docs/design.md`, `docs/tokens.md`

> Maintenance rule: update this file and its Chinese counterpart only after new APIs or behaviors (such as keyboard arrow navigation or sidebar resizing) have been implemented and verified.
