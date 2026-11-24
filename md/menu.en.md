# Menu / Dropdown Menu — Component Specification (English)

> Component: `DropdownMenu` · Documentation route: `#/tahoe/dropdown-menu` (verify against the existing site routing) · Implementation: `packages/ui/src/components/navigation.tsx` · Styles: `packages/ui/src/styles/tahoe-tokens.css`  
> Status: Grounded in the current repository. This is a macOS Tahoe-inspired **web approximation**, not an Apple-native menu. The document follows the shared 12-section structure; React owns Live Preview and Markdown owns descriptions and specifications.

## 01. Overview

The Menu groups **discrete commands** associated with a task or object behind a button. Its current exported component name is `DropdownMenu`, built using Headless UI's `Menu`, `MenuButton`, `MenuItems`, and `MenuItem`.

**Use cases:** file actions, photo operations, view commands, and secondary toolbar actions. Do not use this API for multiselect filters; checked items, radio items, and nested submenus are not implemented.

**Distinction from Context Menu:** `DropdownMenu` opens from a conventional trigger and is anchored `bottom start`. The existing `ContextMenu` also supports right-click activation but is anchored to its trigger, not to the pointer coordinates. Both use the existing `MenuAction` data structure and menu styles.

## 02. Anatomy

| Element | Current implementation | Responsibility |
|---|---|---|
| Trigger | `MenuButton.tahoe-menu-trigger` | Displays `label` and opens the menu |
| Menu Surface | `MenuItems.tahoe-menu` | Contains actions, anchored `bottom start` |
| Menu Item | `button` inside `MenuItem` | Invokes the corresponding callback |
| Disabled Item | `MenuItem disabled` and `button disabled` | Prevents activation |
| Active / Focused | Headless UI focus state + `[data-focus]` CSS | Indicates navigation position |

No public API for icons, separators, shortcut labels, nested menus, checked options, or a custom trigger slot. `MenuActions` is an internal function, not an exported component.

## 03. Live Preview

This section is rendered by the docs site's React implementation. Do not duplicate the examples as static HTML or screenshots in Markdown.

| Preview Card | Content | Verification |
|---|---|---|
| **Menu Basics** | `File` menu with Open, Rename, Duplicate | Real activation, callback, closing, visible result |
| **Menu States** | Enabled and Disabled actions; active/focused row | Disabled actions cannot execute; focus remains visible |
| **Keyboard Interaction** | Keyboard open, arrow navigation, Enter/Space, Escape | Correct focus management and focus return |
| **Menu in Toolbar** | Menu inside a Tahoe Toolbar or Window | Overlay is visible, responsive, theme-consistent |

**Every card:** Title; independent `Light / Dark` control (preview card and overlay only); `Preview / Code` control; highlighted TSX source; Copy Code. Preview is the default. Copied examples must import the real components and compile.

**Theme isolation:** Headless UI may render the menu through a Portal. Light/Dark must reach the actual floating menu, not only the trigger. Reuse the repository's theme strategy; do not change the entire documentation page theme. Each card retains its own theme and Preview/Code selection state.

## 04. Sizes

`DropdownMenu` currently has **no `size` prop**. Do not invent size variants.

| Element | Current CSS |
|---|---|
| Trigger minimum height | `--tahoe-control-height` (currently 24px) |
| Trigger minimum width | 84px |
| Menu minimum width | 132px |
| Menu padding | 4px |
| Menu item minimum height | 24px |
| Menu radius | 10px |
| Item radius | 5px |

These values are **current web implementation specifications**, not claimed measurements from Apple's official Tahoe UI Kit.

## 05. Variants

No `variant` prop exists. There are no public menu variants for `primary`, `destructive`, `checkbox`, `radio`, or `submenu`. Individual actions only support an optional `disabled` state.

If future destructive commands require distinct styling, design and implement a documented API with accessibility semantics before presenting it as supported.

## 06. States

| State | Status | Behavior |
|---|---|---|
| Closed | Implemented | Menu panel hidden by default |
| Open | Implemented | Panel appears below trigger |
| Focused / Active Item | Implemented | Headless UI-managed, `[data-focus]` highlight |
| Open Trigger | Implemented | Trigger appearance follows `[data-open]` |
| Enabled Action | Implemented | Action can invoke `onSelect` |
| Disabled Action | Implemented | Action is not executable |
| Loading | Not implemented | No loading prop |
| Checked / Selected Action | Not implemented | No selection-state prop |

Show interactive Hover, Focus, and Open states through actual user input, not permanently forced demo classes.

## 07. Behavior

- Open the menu by clicking or using the accessible keyboard interaction on the trigger.
- Position the menu at `bottom start` relative to the trigger, not at an arbitrary screen coordinate.
- Activate an available item with the pointer or keyboard; its callback `onSelect()` runs.
- Escape dismisses the menu. Validate focus restoration in the actual browser through Headless UI.
- Disabled actions do not execute.
- Outside-click dismissal is managed by Headless UI.
- File management, notifications, undo, and persistence are application responsibilities, not built-in features.

Use clear verbs for commands: Open, Rename, Duplicate. Handle destructive-operation confirmation or undo in the application layer.

## 08. Accessibility

- Preserve Headless UI Menu semantics and built-in focus management. Do not manually reimplement an ARIA menu.
- `label` is the visible and meaningful trigger text.
- Keep native `button` elements and real `disabled` semantics.
- Verify Tab to trigger, Enter/Space to open, arrow-key navigation, Enter to activate, Escape to dismiss, and focus return.
- Check color contrast, active-row visibility, and disabled appearance in Light and Dark themes.
- Do not communicate state only through color.
- Floating/portal content must not be clipped, lose theme tokens, or obscure keyboard focus.

## 09. API Reference

```ts
export type MenuAction = {
  id: string
  label: string
  disabled?: boolean
  onSelect: () => void
}

export function DropdownMenu(props: {
  label: string
  actions: MenuAction[]
}): JSX.Element
```

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` | Yes | — | Visible trigger text |
| `actions` | `MenuAction[]` | Yes | — | Ordered list of commands |
| `actions[].id` | `string` | Yes | — | Item key; should be unique |
| `actions[].label` | `string` | Yes | — | Command label |
| `actions[].onSelect` | `() => void` | Yes | — | Command callback |
| `actions[].disabled` | `boolean` | No | `undefined` | Disables that action |

No public `size`, `variant`, `open`, `onOpenChange`, `icon`, `shortcut`, `separator`, or `children` prop. The return annotation above is illustrative; the source implementation uses inferred TypeScript return types.

## 10. Code Example

### Basic Menu

```tsx
import { DropdownMenu, type MenuAction } from '@macos-tahoe/ui'

export function FileMenuExample() {
  const actions: MenuAction[] = [
    { id: 'open', label: 'Open', onSelect: () => console.info('open') },
    { id: 'rename', label: 'Rename', onSelect: () => console.info('rename') },
    { id: 'delete', label: 'Delete', disabled: true, onSelect: () => console.info('delete') },
  ]

  return (
    <div data-theme="tahoe">
      <DropdownMenu label="File" actions={actions} />
    </div>
  )
}
```

### In a Toolbar

```tsx
import { DropdownMenu, Toolbar } from '@macos-tahoe/ui'

export function PhotoToolbarExample() {
  return (
    <div data-theme="tahoe">
      <Toolbar
        title="Photos"
        actions={
          <DropdownMenu
            label="More Actions"
            actions={[
              { id: 'duplicate', label: 'Duplicate', onSelect: () => console.info('duplicate') },
              { id: 'export', label: 'Export', onSelect: () => console.info('export') },
            ]}
          />
        }
      />
    </div>
  )
}
```

`console.info` represents an application callback. In Live Preview, a local “Last action” text is appropriate for displaying the result without mutating actual files.

## 11. Design Specifications

### Tahoe Token Mapping

| Role | Existing token / style | Source classification |
|---|---|---|
| Trigger height | `--tahoe-control-height` | Project CSS |
| Trigger background | `--tahoe-control` | Existing semantic token |
| Text | `--tahoe-label` | Existing semantic token |
| Menu surface | `--tahoe-menu` | Existing semantic token |
| Menu border | `--tahoe-menu-rim` | Existing semantic token |
| Menu shadow | `--tahoe-menu-shadow` | Existing semantic token |
| Active highlight | `--tahoe-focus` | Existing semantic token |
| Accent | `--tahoe-accent` | Existing semantic token |
| Typography | `--tahoe-font`, `--tahoe-body` | Existing semantic tokens |

The current material uses `backdrop-filter: blur(24px)` as a browser approximation. Light/Dark styles must continue to use the existing token scopes. Do not create a separate hard-coded palette. Any shared token change must be validated against other components.

### Visual Acceptance

- Readable in Light and Dark.
- Clear trigger/panel hierarchy with existing edge, fill, and shadow styles.
- Item hit areas follow current CSS dimensions; active and disabled states are distinguishable.
- Menus remain visible when used in narrow or clipped containers.
- Do not claim pixel-identical Apple-native rendering.

## 12. References

- Source: [`packages/ui/src/components/navigation.tsx`](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/navigation.tsx)
- CSS: [`packages/ui/src/styles/tahoe-tokens.css`](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/tahoe-tokens.css)
- Project guidance: `docs/design.md`, `docs/tokens.md`
- [Headless UI — Menu](https://headlessui.com/react/menu)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

> Maintenance rule: Keep component API, Live Preview, code examples, and design tokens aligned. Do not mark a feature as available until it is implemented and verified.
