# Sidebar

> Project: macOS Tahoe Components  
> Component: `Sidebar`  
> Status: Phase 1 · Checked against the current repository implementation; documentation remains editable  
> Route: `#/tahoe/sidebar`  
> Source: `packages/ui/src/components/sidebar.tsx`  
> Styles: `packages/ui/src/styles/tahoe-tokens.css`  
> Note: “Implemented” describes the inspected code. “Suggested improvements” are not public APIs.

## Overview

Sidebar organizes grouped navigation in a macOS-inspired desktop web application, such as a photo library, folders, collections, or preferences. It keeps navigation alongside the content, lets users expand or collapse groups, and marks the current item. The current component is **controlled**: its parent owns selection and expanded-group state. It does not implement business routing or render the destination page.

Use it for desktop window sidebars and grouped navigation. Nested tree views, drag-and-drop rearrangement, mobile drawers, and resizing are not built in.

## Anatomy

The current implementation renders:

1. **Navigation (`nav.tahoe-sidebar`)** — navigation region with a currently hardcoded `aria-label="图库目录"` (Chinese for “Gallery directory”).
2. **Group (`.tahoe-sidebar-group`)** — container for one group.
3. **Group Heading (`button.tahoe-sidebar-heading`)** — expands/collapses the group and exposes `aria-expanded`.
4. **Disclosure Chevron** — decorative `ChevronRight` rotated by 90° when expanded.
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
| **Sidebar Navigation** | Multiple groups, optional icons, selected item, and companion content | Selecting a row updates the highlighted item and content |
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

The `220px` token belongs to the window layout. `Sidebar` does not have a fixed-width prop.

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
- **Known limitation:** the navigation's accessible name is hardcoded as `图库目录`, even on English pages. There is no public prop to override it. A future `ariaLabel` or `label` prop would require implementation and tests before being documented as supported.
- `aria-current="true"` is the exact current value; `aria-current="page"` may be evaluated for page navigation but is not currently emitted.

## API Reference

Verified against `packages/ui/src/components/sidebar.tsx`. Every prop is required.

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
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
import { Folder, Star } from 'lucide-react'
import { Sidebar } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

const groups = [
  {
    id: 'library',
    label: 'Library',
    items: [
      { id: 'all', label: 'All Photos', icon: <Folder size={16} /> },
      { id: 'favorites', label: 'Favorites', icon: <Star size={16} /> },
    ],
  },
  {
    id: 'albums',
    label: 'Albums',
    items: [{ id: 'travel', label: 'Travel' }],
  },
]

export function SidebarExample() {
  const [selected, setSelected] = useState('all')
  const [collapsed, setCollapsed] = useState<string[]>([])

  function toggleGroup(id: string) {
    setCollapsed(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id],
    )
  }

  return (
    <div data-theme="tahoe" style={{ display: 'flex', minHeight: 240 }}>
      <div style={{ width: 220, flexShrink: 0 }}>
        <Sidebar
          groups={groups}
          selected={selected}
          collapsed={collapsed}
          onSelect={setSelected}
          onToggle={toggleGroup}
        />
      </div>
      <main style={{ padding: 16, flex: 1 }}>
        Selected item: {selected}
      </main>
    </div>
  )
}
```

`style={{ width: 220 }}` is used on the example layout, not as a Sidebar prop. Icons require `lucide-react` or your own ReactNode icons.

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
- Hover: `--tahoe-fills-tertiary`; Pressed: `--tahoe-fills-primary`.

**Material / Theme**

- The existing `data-theme="tahoe"` and `.dark` theme mechanism controls appearance, not a nonexistent Sidebar `theme` prop.
- `--tahoe-sidebar-surface` uses Vibrant Fills semantic colors. This is a web approximation, not an Apple-certified native material specification.
- The current geometry comes from project Web conventions and third-party references, not validated pixel-perfect Apple Tahoe 26 measurements.

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Third-party macOS Components reference](https://github.com/tamnguyenvan/macos-components)
- Source: `packages/ui/src/components/sidebar.tsx`
- Styles: `packages/ui/src/styles/tahoe-tokens.css`
- Project documents: `docs/design.md`, `docs/tokens.md`

> Maintenance rule: update this file and its Chinese counterpart only after new APIs or behaviors (such as an accessible-name prop, keyboard arrow navigation, or sidebar resizing) have been implemented and verified.
