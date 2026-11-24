# Switch

> macOS Tahoe Components · English component documentation  
> Route: `#/tahoe/switch` · Chinese counterpart: `switch.md`  
> Implementation references: `packages/ui/src/components/switch.tsx` and `packages/ui/src/styles/tahoe-tokens.css`. The repository implementation and latest Tahoe Design Tokens are authoritative.

## Overview

A Switch immediately turns a setting on or off, such as file-name visibility, notifications, or automatic synchronization. It represents a distinct **On / Off** state. Use separate switches for independent settings. When multiple choices are committed together, checkboxes may be more appropriate.

The project implements Switch in React using a native `input[type="checkbox"]` with `role="switch"`, styled with a macOS Tahoe-like track and thumb. This is a web implementation, not a native Apple control.

## Anatomy

1. **Label**: required `label` text, associated with the native input using a wrapping `<label>`.
2. **Input**: native checkbox providing form behavior and keyboard support; declares `role="switch"`.
3. **Track**: `.tahoe-switch-track`, styled using Tahoe tokens.
4. **Thumb**: `.tahoe-switch-thumb`, which moves with the checked state.
5. **Focus Ring**: focus indicator around the track during keyboard navigation.

The decorative track and thumb are `aria-hidden="true"`; assistive technology uses the native input and its label.

## Live Preview

The documentation site renders **real React Live Preview** cards for this section. Markdown does not embed runnable JSX. Each card has two independent tab controls:

- **Preview / Code**: the working component or its corresponding copyable React + TypeScript code.
- **Light / Dark**: changes only this preview card's theme without changing the whole documentation site or resetting its switch state.

Planned Phase 1 cards:

| Card | Preview | Code |
| --- | --- | --- |
| **Switch On / Off** | Show initially Off and initially On switches side by side, both interactive | Uncontrolled `defaultChecked` example |
| **Switch States** | Enabled Off, Enabled On, Disabled Off, Disabled On; test focus and pressed through real interaction | `disabled` / `defaultChecked` examples |
| **Controlled Switch** | Switch and text readout update together | `checked`, `onChange`, `useState` |
| **Settings Example** | Several independent switches in a settings list | Multiple real `<Switch>` components |

Do not invent Size / Variant cards. Hover, Pressed, and Focus should be tested as real interactions, not presented solely as artificial visuals. Readout labels in the demo are preview UI, not Switch component API.

## Sizes

The current Switch has **one standard size** and **no `size` prop**. Do not copy the Button size scale.

| Part | Current project CSS size | Token / basis |
| --- | --- | --- |
| Track | 54 × 24 CSS px | `--tahoe-switch-width`, `--tahoe-switch-height` |
| Track radius | 12 CSS px | `calc(var(--tahoe-switch-height) / 2)` |
| Thumb | 32 × 20 CSS px | `--tahoe-switch-thumb-width`; track height minus two 2px insets |
| Thumb inset | 2 CSS px | `--tahoe-switch-inset` |
| Thumb travel | 18 CSS px | Derived from track width, thumb width, and insets |
| Label / track gap | 8 CSS px | Current `.tahoe-switch` rule |
| Minimum row height | 24 CSS px | Current `.tahoe-switch` rule |

These figures describe project CSS and third-party measurements, not Apple-certified Tahoe dimensions.

## Variants

The current Switch **does not expose a `variant` prop**. Light / Dark are themes, not variants; On / Off are states, not variants.

## States

| State | Implementation status | Behavior and visual |
| --- | --- | --- |
| Off | Implemented | Unchecked; uses `--tahoe-switch-off` |
| On | Implemented | Checked; track uses `--tahoe-accent` and thumb moves |
| Hover | Native pointer interaction | Do not claim a dedicated hover style; verify CSS and only add one through an explicit component change |
| Pressed | CSS implemented | Active track changes based on checked state |
| Focus Visible | CSS implemented | Keyboard focus uses `--tahoe-control-focus` |
| Disabled Off / On | Implemented | Native disabled input; thumb opacity reduced and cannot be toggled |
| Selected | Not applicable | Use On / Off or Checked / Unchecked terminology |
| Loading / Indeterminate | Not implemented | Do not advertise these as APIs |

## Behavior

- Clicking the track or associated label toggles the state.
- Press **Space** when focused to toggle; **Tab / Shift+Tab** move focus.
- Use `checked` with `onChange` for controlled mode, or `defaultChecked` for an uncontrolled initial state.
- `disabled` prevents interaction and retains native disabled semantics.
- The component does not include persistence, asynchronous saving, or loading behavior; applications implement those separately.
- Validate behavior in target browsers and on touch devices.

## Accessibility

- Use a native `<input type="checkbox" role="switch">`, not a click-only `div`.
- The required `label` supplies an accessible name through native label association.
- Native input behavior exposes checked and disabled state and keyboard operation.
- The visual track and thumb have `aria-hidden="true"` to avoid duplicate announcements.
- The visible focus indicator uses `--tahoe-control-focus`.
- Applications providing additional descriptions should associate them accessibly; the current component has no dedicated `description` prop.
- Test screen readers, contrast, forced colors, and reduced motion. Do not claim WCAG conformance without verification.

## API Reference

Actual export: `Switch`. Its prop type is `Omit<ComponentProps<'input'>, 'type' | 'role'> & { label: string }`.

| Prop | Type | Default / required | Description |
| --- | --- | --- | --- |
| `label` | `string` | **Required** | Visible and accessible label |
| `checked` | `boolean` | Optional | Controlled checked state, updated by the parent |
| `defaultChecked` | `boolean` | Optional | Initial uncontrolled checked state |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | Optional | Native change event; read `event.currentTarget.checked` |
| `disabled` | `boolean` | Optional | Disables the input |
| `name` | `string` | Optional | Native form field name |
| `value` | Native input value type | Optional | Form submission value, not the On / Off state |
| Other native input props | React `ComponentProps<'input'>` | Optional | Forwarded except `type` and `role` |

**Internal fixed attributes**: `type="checkbox"` and `role="switch"`; they cannot be changed through public props. There are no custom `size`, `variant`, `loading`, or `onCheckedChange` APIs. Do not invent explicit custom defaults that are not in the source.

## Code Example

The following examples use the implemented API. The CSS entry point is `@macos-tahoe/ui/styles.css`; components belong in a `data-theme="tahoe"` context.

### Uncontrolled

```tsx
import { Switch } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function SimpleSwitch() {
  return (
    <div data-theme="tahoe">
      <Switch label="Show file names" defaultChecked />
    </div>
  )
}
```

### Controlled

```tsx
import { useState } from 'react'
import { Switch } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div data-theme="tahoe">
      <Switch
        label="Sync favorites"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
      />
      <p>Status: {enabled ? 'On' : 'Off'}</p>
    </div>
  )
}
```

### Disabled

```tsx
<Switch label="Disabled setting" disabled defaultChecked />
```

The short disabled example assumes Switch has been imported and Tahoe theme context is provided.

## Design Specifications

Reuse existing Tahoe Design Tokens instead of hardcoding another color, geometry, or shadow system.

| Category | Token | Role |
| --- | --- | --- |
| Geometry | `--tahoe-switch-width` | Track width: 54px |
| Geometry | `--tahoe-switch-height` | Track height: 24px |
| Geometry | `--tahoe-switch-thumb-width` | Thumb width: 32px |
| Geometry | `--tahoe-switch-inset` | Thumb inset: 2px |
| Color | `--tahoe-switch-off` | Off-track background; differs in Light / Dark |
| Color | `--tahoe-accent` | On-track background |
| Color | `--tahoe-switch-thumb-color` | Thumb fill; differs in Light / Dark |
| Surface | `--tahoe-switch-rim` | Track rim |
| Shadow | `--tahoe-switch-thumb-shadow` | Thumb shadow |
| State | `--tahoe-button-pressed` / `--tahoe-accent-pressed` | Pressed track colors |
| Focus | `--tahoe-control-focus` | Visible focus ring |
| Motion | `--tahoe-control-transition` | Thumb transition; 0ms in reduced motion |
| Typography | `--tahoe-regular-type`, `--tahoe-label` | Label typography and color |

Theme convention: render beneath `[data-theme="tahoe"]`; the `.dark` ancestor activates dark tokens. For card-level theme controls, scope the `.dark` ancestor to that card rather than changing the entire documentation page. This HTML/CSS switch is not the native macOS system control.

## References

- [Project Switch source](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/switch.tsx)
- [Project Tahoe Design Tokens](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/tahoe-tokens.css)
- [Project design documentation](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Apple Human Interface Guidelines — Switches](https://developer.apple.com/design/human-interface-guidelines/switches) (interaction guidance; not the source of the project's exact CSS dimensions)
- [Third-party macOS Components](https://github.com/tamnguyenvan/macos-components) (third-party visual measurement reference cited by this repository)

> Status: Phase 1 documentation. Live Preview is rendered in React. Repository implementation and current CSS tokens take precedence over stale documentation. More detailed fidelity and accessibility results can be added later.
