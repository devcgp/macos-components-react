# Context Menu

> macOS Components · Component Documentation\
> Route: `#/desktop/context-menu`\
> Source: `packages/ui/src/components/navigation.tsx`  
> Styles: `packages/ui/src/styles/desktop-tokens.css`\
> Provenance: existing project implementation and Desktop Design Tokens; **not** an Apple-verified pixel-perfect macOS 26 component.

## 1. Overview

Context Menu presents commands relevant to an object, such as a file, photo, or list item. The current component uses `Menu` from `@headlessui/react` and shares its menu rendering with `DropdownMenu`.

**Current behavior:** right-clicking the visible trigger button prevents the native browser menu and, when closed, invokes a synthetic click to open a menu **anchored below the button at its start edge**. Regular clicking or keyboard activation also opens the menu. It **does not** position the menu at the pointer coordinates, nor attach right-click behavior to an arbitrary child element.

Use it as an accessible object-actions entry point rather than claiming parity with Finder's native context menu.

## 2. Anatomy

| Part | Implementation | Purpose |
| --- | --- | --- |
| Root | Headless UI `Menu` | Open/closed state management |
| Trigger | `MenuButton.desktop-menu-trigger` | Click, right-click and keyboard entry point |
| Context handler | `onContextMenu` | `preventDefault()` and `.click()` if closed |
| Panel | `MenuItems.desktop-menu` | `anchor="bottom start"`, **not** pointer-positioned |
| Item | `MenuItem` with `button` | Calls `onSelect()` |
| Label | `action.label` | Visible command name |
| Disabled item | `MenuItem disabled` and native `button disabled` | Prevents activation |

`MenuAction` is `{ id: string; label: string; disabled?: boolean; onSelect: () => void }`. Icons, separators, keyboard-shortcut labels, groups, and submenus are not implemented in the current API.

## 3. Live Preview

The documentation site renders Live Preview through the shared React preview card infrastructure. This Markdown defines the scenarios without duplicating the interactive JSX in the document.

Every card has **two independent tab groups**: `Preview / Code` and `Light / Dark`. Default to Preview. The theme applies only to that preview card, including a potentially portalled menu panel. Code must show copyable, executable React + TypeScript matching the card's actual behavior.

| Card | Content | Acceptance criteria |
| --- | --- | --- |
| Context Menu Basics | A single object trigger with Open, Rename, Info actions | Click and right-click open it; action feedback is accurate |
| Context Menu States | Closed/open, focused item, disabled action | Disabled action never fires; Escape closes; focus is visible |
| Object Actions | Photo/file action scenario with application-owned state | Actions update demo data only |
| Keyboard Interaction | Tab, Enter/Space, Arrow keys, Enter, Escape | Headless UI controls navigation and focus restoration |
| Context Menu in Window | Real `Window` / `SplitView` composition and constrained layout | Correct overlay layer/visibility; never imply pointer anchoring |

Provide a Copy Code action on every card. Theme changes must not change the entire documentation page or reset the business/demo state.

## 4. Sizes

The component has **no `size` prop**. Current CSS specifies `min-height: 24px` for menu items, `min-width: 132px`, `padding: 4px`, and `border-radius: 10px` for the panel. The shared `.desktop-menu-trigger` has `min-width: 84px` and `min-height: 24px`. These are implementation values, not additional named size variants.

## 5. Variants

There is **no `variant` prop**. Light and Dark represent theme modes rather than component variants. Destructive styling, grouped menus, icons, and nested menus are not present capabilities.

## 6. States

| State | Mechanism | Outcome |
| --- | --- | --- |
| Closed | Headless UI Menu closed | Panel hidden |
| Open | Trigger activated | Panel shown below the trigger |
| Focused item | Headless UI `data-focus` | Focus background via `--desktop-focus` |
| Hovered item | Headless UI interaction | Focus/hover feedback per library and CSS |
| Disabled item | `disabled: true` | No command activation |
| Executed | `onSelect()` invoked | Effects belong to the consuming application |
| Dismissed | Escape / outside interaction | Standard Headless UI dismissal behavior |

No `loading`, `checked`, `destructive`, or `submenu` state props are currently exposed.

## 7. Behavior

- **Opening:** normal click works; right-click on the button prevents the browser menu and invokes `.click()` only if currently closed.
- **Placement:** `anchor="bottom start"`; no pointer-coordinate positioning. Right-clicking while open does not explicitly toggle or reposition the menu.
- **Execution:** activating an enabled item invokes its `onSelect`. Demo feedback is application-layer logic, not a built-in file action.
- **Dismissal:** Escape, outside interactions and menu selection follow Headless UI behavior; confirm in-browser.
- **Focus:** let Headless UI manage menu navigation and focus restoration; do not implement a competing keyboard handler.
- **Boundaries:** test viewport edges, scrolling, window compositions and clipping. Web behavior is not equivalent to the native macOS context menu.

## 8. Accessibility

- The trigger uses a native button; `label` should identify the action context.
- Headless UI provides menu semantics and keyboard handling; test Tab, Enter, Space, Arrow keys and Escape.
- `disabled` is applied to both `MenuItem` and the inner native button.
- `data-focus` must remain visibly differentiated in both themes.
- Provide accessible feedback for executed commands as appropriate. Asynchronous errors and destructive-action confirmation are the responsibility of the consumer.
- Right-click must never be the only available method of accessing commands.

## 9. API Reference

### `ContextMenu`

```ts
type MenuAction = {
  id: string
  label: string
  disabled?: boolean
  onSelect: () => void
}

type ContextMenuProps = {
  label: string
  actions: MenuAction[]
}
```

| Prop | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `label` | `string` | Yes | — | Trigger text |
| `actions` | `MenuAction[]` | Yes | — | Command collection |
| `actions[].id` | `string` | Yes | — | Stable list key |
| `actions[].label` | `string` | Yes | — | Command label |
| `actions[].onSelect` | `() => void` | Yes | — | Selection callback |
| `actions[].disabled` | `boolean` | No | `undefined` | Disables a command |

`MenuAction` is exported from `navigation.tsx`. `ContextMenu` is available via the library root export. There is no public target/pointer position, `open/onOpenChange`, placement, icon, separator, or nested action prop.

## 10. Code Example

### Actual supported API

```tsx
import { useState } from 'react'
import { ContextMenu } from '@cgpdesktopui/ui'

export function PhotoContextActions() {
  const [message, setMessage] = useState('No action selected')

  return (
    <div data-theme="desktop">
      <ContextMenu
        label="Photo actions"
        actions={[
          { id: 'open', label: 'Open', onSelect: () => setMessage('Open selected') },
          { id: 'info', label: 'Get Info', onSelect: () => setMessage('Get Info selected') },
          { id: 'rename', label: 'Rename (unavailable)', disabled: true, onSelect: () => setMessage('Should not run') },
        ]}
      />
      <p role="status">{message}</p>
    </div>
  )
}
```

Import `@cgpdesktopui/ui/styles.css` at the application entry point. The status message comes from the example application, not a ContextMenu prop.

## 11. Design Specifications

| Property | Current value / token | Provenance |
| --- | --- | --- |
| Trigger min height | `--desktop-control-height` (24px) | Project-defined Web Approximation |
| Trigger min width | 84px | Project-defined Web Approximation |
| Menu min width | 132px | Project-defined Web Approximation |
| Menu padding | 4px | Project-defined Web Approximation |
| Menu radius | 10px | Project-defined Web Approximation |
| Menu item min height | 24px | Project-defined Web Approximation |
| Menu item radius | 5px | Project-defined Web Approximation |
| Menu background | `--desktop-menu` | Desktop semantic token / Web implementation |
| Menu border | `--desktop-menu-rim` | Desktop semantic token / Web implementation |
| Menu shadow | `--desktop-menu-shadow` | Desktop semantic token / Web implementation |
| Focus fill | `--desktop-focus` | Desktop semantic token |
| Text | `--desktop-label` | Desktop semantic token |

Use the existing `data-theme="desktop"` scope and `.dark` theme system. **Verify theme propagation to the menu portal**: applying `.dark` only inside a card does not necessarily affect a portalled menu. Reuse the site's overlay theme strategy and Desktop tokens rather than globally toggling the page or hard-coding new colors.

These dimensions reflect existing CSS and are **not** measurements verified against official Apple macOS UI Kit nodes. Update both language documents whenever actual APIs or tokens change.

## 12. References

- [Component source](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/navigation.tsx)
- [Desktop Tokens source](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/desktop-tokens.css)
- [Project design guidelines](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Headless UI Menu](https://headlessui.com/react/menu)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

**Potential future enhancements (not implemented):** custom trigger target, pointer positioning, shortcut text, icons, destructive actions, separators, and hierarchical submenus. Specify their API, accessibility and theming before documenting them as supported.
