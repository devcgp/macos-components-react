# Toolbar

> Component: `Toolbar` · Category: Window & Navigation · Status: existing implementation; documentation and previews to integrate  
> Source: `packages/ui/src/components/toolbar.tsx`  
> Styles: `packages/ui/src/styles/tahoe-tokens.css`  
> Suggested document: `apps/docs/content/components/toolbar.en.md`  
> Route: `#/tahoe/toolbar` (locale-specific routing only if supported)

## Overview

Toolbar arranges a **title, supplementary details, filter controls, action controls, and a search area** at the top of an application window or content view. It is a **composition and layout component**; it does not implement searching, filtering, or actions itself.

Common uses include image/file management, gallery navigation, list filtering, view switching, and frequently used actions. Keep the set of controls concise and predictable.

The current component renders a semantic `<header>`. Its `filters`, `actions`, and `search` properties accept ReactNode slots. Any behavior comes from the elements passed into those slots, not from Toolbar.

## Anatomy

1. **Container**: `.tahoe-toolbar`, a flex layout that may wrap when space is limited.
2. **Title area**: `.tahoe-toolbar-title`; required `title`, optional `detail`.
3. **Filters group**: optional `filters` slot, wrapped with `role="group"`.
4. **Actions group**: optional `actions` slot, wrapped with `role="group"`.
5. **Search slot**: optional `search` ReactNode rendered as supplied.

> In the current source, the accessible group names are hardcoded in Chinese (“筛选” and “显示操作”). Internationalization needs an implementation decision; configurable labels are not currently part of the public API.

## Live Preview

<!-- The documentation renderer inserts live Toolbar React preview cards here. Do not embed interactive JSX in Markdown. -->

Each card has its title and a `Light / Dark` tab pair in the header; the content uses `Preview / Code` tabs, and Code includes syntax-highlighted TSX with `Copy Code`. These two tab groups are independent. The theme affects only the current card's preview.

| Card | Content | Requirements |
| --- | --- | --- |
| **01 · Toolbar Composition** | Title only; title with `detail`; full filters/actions/search composition | Show all three compositions and identify required versus optional slots |
| **02 · Filters & Actions** | View selection, sort/filter actions, enabled/disabled buttons | Use actual existing controls; example state belongs to the consumer, not Toolbar |
| **03 · Search Slot** | Without search; with search; editable input | Optionally filter local sample data; do not imply Toolbar provides an `onSearch` API |
| **04 · Responsive Layout** | Wide, medium, and narrow containers | Adjustable preview width; confirm wrapping and access, with no fabricated overflow menu |
| **05 · Toolbar in Window** | Toolbar combined with Window, Sidebar, and content | Only use verified existing components; inspect hierarchy, surfaces, separator, and themes |

No dedicated Sizes or Variants cards are needed: Toolbar has neither a `size` nor a `variant` prop. Code samples must match the live examples and use only supported props.

## Sizes

Toolbar has no public `size` prop. These are **current web CSS layout values**, not selectable sizes or Apple-verified Tahoe measurements.

| Measurement | Current implementation | Source |
| --- | --- | --- |
| Minimum toolbar height | `52px` | `--tahoe-toolbar-height` |
| Vertical / horizontal padding | `8px / 12px` | `.tahoe-toolbar` |
| Primary flex gap | `8px` | `.tahoe-toolbar` |
| Controls gap | `6px` | `.tahoe-toolbar-controls` |
| Gap within groups | `2px` | `.tahoe-toolbar-group` |
| Recommended search width | `150px`, max `100%` | `--tahoe-toolbar-search-width` |
| Example icon button width in groups | `24px` | `.tahoe-toolbar-group .tahoe-button` |

The parent determines the available width. `flex-wrap: wrap` allows content to move onto additional lines; `min-height` is not a fixed height.

## Variants

The current Toolbar does not expose a `variant` prop or predefined Compact, Expanded, or Glass variants.

Different usages can be achieved by composing available slots (title-only, filters/actions, search, etc.). These are **composition examples**, not variants of the Toolbar API.

Themes and materials come from the Tahoe token system and the containing surface; do not add unsupported `material` or `theme` props.

## States

Toolbar is a layout component with no built-in `selected`, `disabled`, `loading`, or `open` state.

| State | Owner | Current behavior |
| --- | --- | --- |
| Default layout | Toolbar | Renders title and supplied slots |
| Narrow container / wrapping | Toolbar CSS | `flex-wrap: wrap` |
| Hover / Pressed / Focus | Slotted Button/Search controls | Provided by the child controls |
| Selected / Active | Slotted controls or demo state | Not a Toolbar state |
| Disabled | Slotted controls | Controlled by child components |
| Light / Dark | Preview theme container | Token-driven; not a Toolbar prop |

Use real interactive child controls rather than static imitation buttons.

## Behavior

- `title` is rendered in `<strong>`; `detail`, when provided, is rendered in `<small>`.
- Truthy `filters` and `actions` values create separate `role="group"` wrappers.
- `search` is rendered directly, without built-in search input, filtering logic, or search events.
- Flex layout adapts to the available width and permits wrapping.
- Child controls retain their own pointer/keyboard behavior and application state.
- Toolbar does not implement automatic hiding, overflow menus, drag handles, native window buttons, or macOS-native toolbar behavior.

## Accessibility

- The top-level `<header>` is semantic; examine landmark naming if the document contains multiple headers.
- `filters` and `actions` use `role="group"`; their current hardcoded Chinese accessible names require an internationalization decision.
- Icon-only controls must expose an accessible name in the child component.
- Search inputs require an accessible label or `aria-label`; placeholder text alone is insufficient.
- Child controls are responsible for keyboard activation, tab order, and visible focus.
- Keep every control usable at narrow widths and high zoom levels.
- Do not arbitrarily add `role="toolbar"` to the header. If a WAI-ARIA toolbar pattern is needed, implement and test its specific keyboard model separately.

## API Reference

Current exported TypeScript props:

```tsx
import type { ReactNode } from 'react'

type ToolbarProps = {
  title: string
  detail?: ReactNode
  filters?: ReactNode
  actions?: ReactNode
  search?: ReactNode
}
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | Yes | None | Main title |
| `detail` | `ReactNode` | No | Not rendered | Supplementary information |
| `filters` | `ReactNode` | No | Not rendered | Filter controls slot |
| `actions` | `ReactNode` | No | Not rendered | Action controls slot |
| `search` | `ReactNode` | No | Not rendered | Search area slot |

There are no dedicated `onSearch`, `onFilterChange`, `onAction`, `size`, `variant`, or `theme` props. Define callbacks on the elements supplied to each slot.

## Code Example

### Minimal

```tsx
import { Toolbar } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function SimpleToolbar() {
  return (
    <div data-theme="tahoe">
      <Toolbar title="Photos" detail="3 photos" />
    </div>
  )
}
```

### Actions and an editable search input

```tsx
import { useState } from 'react'
import { Button, Toolbar } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function GalleryToolbar() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div data-theme="tahoe">
      <Toolbar
        title="Gallery"
        detail={`Current view: ${view}`}
        filters={
          <>
            <Button aria-pressed={view === 'grid'} onClick={() => setView('grid')}>Grid</Button>
            <Button aria-pressed={view === 'list'} onClick={() => setView('list')}>List</Button>
          </>
        }
        actions={<Button onClick={() => window.alert('Import example')}>Import</Button>}
        search={
          <input
            className="tahoe-toolbar-search"
            aria-label="Search photos"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        }
      />
      <p>Search: {query || 'All'}</p>
    </div>
  )
}
```

> `window.alert` is a consumer-side demonstration action; replace it with an application workflow. `tahoe-toolbar-search` constrains layout width and does not style a complete search field by itself. Verify the API of an existing Search Field component before using it instead.

## Design Specifications

**Provenance: Project-defined Web Approximation.** These are values from this repository, not independently verified official macOS Tahoe 26 measurements.

| Token / Selector | Purpose |
| --- | --- |
| `--tahoe-toolbar-height` | 52px minimum height |
| `--tahoe-toolbar-search-width` | 150px search-area reference width |
| `--tahoe-toolbar-surface` | Background surface, usually the window surface |
| `--tahoe-separator` | Bottom separator |
| `--tahoe-label` | Default text color |
| `--tahoe-text-secondary` | Detail text color |
| `--tahoe-accent` | Focus and accents on child controls |
| `--tahoe-fills-tertiary` | Group button hover surface |
| `--tahoe-fills-primary` | Group button selected surface |
| `--tahoe-font`, `--tahoe-body` | Inherited typography |
| `.tahoe-toolbar` | Flex layout, padding, minimum height, separator |
| `.tahoe-toolbar-group` | Control grouping and gaps |
| `.tahoe-toolbar-search` | Suggested search width |

Use the existing `.dark` and `[data-theme="tahoe"]` theme mechanism. For per-card Live Preview theme switching, verify that CSS selectors apply locally; do not toggle the whole documentation site or hardcode a second palette.

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Toolbar source](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/toolbar.tsx)
- [Tahoe Design Tokens](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/tahoe-tokens.css)
- [Design documentation](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Tokens documentation](https://github.com/devcgp/macos-components-react/blob/main/docs/tokens.md)

> Apple HIG provides platform guidance; the 52px/150px and other CSS values documented above belong to this project's web implementation and are not Apple-certified specifications.
