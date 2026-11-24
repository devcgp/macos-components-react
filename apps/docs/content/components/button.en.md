# Button

> Component: `Button`\
> Package: `@cgpdesktopui/ui`\
> Documentation route: `#/desktop/button`

## Overview

Buttons trigger a discrete action, such as saving a change, confirming a dialog, or deleting an item. Use a clear, action-oriented label. For persistent on/off choices, use a Switch or Checkbox instead.

In this project, `Button` is a web implementation inspired by macOS. It is **not** an Apple-native control, and its geometry should not be described as an officially verified Apple specification.

## Anatomy

The current implementation comprises:

1. **Button container** — Headless UI `Button` rendered as a button element.
2. **Content** — `children`, generally a text label; other React content is allowed.
3. **Appearance** — `data-variant` and `data-size` attributes select CSS rules.
4. **Focus ring** — CSS `:focus-visible` treatment.

Optional icon layout is available via the separately exported `IconButton` wrapper. A standalone `icon` prop is **not** implemented on `Button`.

## Live Preview

## Sizes

The current `size` prop supports the following five values:

| Size | Control height | Border radius | Horizontal padding | Font size |
| --- | ---: | --- | --- | --- |
| `mini` | 16px | 4px | 7px | 10px |
| `small` | 20px | 5px | 10px | 11px |
| `regular` | 24px | 6px | 16px | Project regular typography |
| `large` | 28px | Pill (`999px`) | 16px | Project regular typography |
| `xl` | 36px | Pill (`999px`) | 16px | Project regular typography |

**Default:** `regular`. Dimensions describe current CSS px values, not official Apple measurements. Button width is content-dependent; no fixed width prop is defined.

## Variants

| Variant | Default | Current rendering | Intended usage |
| --- | --- | --- | --- |
| `neutral` | Yes | Neutral control surface with label color | Standard actions |
| `accent` | No | Accent-colored surface with light foreground | Primary or emphasized actions |
| `destructive` | No | Tinted destructive surface with destructive-colored text | Destructive actions |

The current `destructive` style is **not** a solid red filled button. No `outline`, `ghost`, or `secondary` variant is part of the current `Button` API.

## States

| State | Current implementation |
| --- | --- |
| Default | Supported |
| Hover | Supported through CSS `:hover` |
| Pressed | Supported through CSS `:active` |
| Focus | Supported through `:focus-visible` |
| Disabled | Supported through native `disabled` |
| Loading | Supported through `loading`; disables the button and sets `aria-busy` |
| Selected | Not part of the default Button API; do not advertise as a built-in state |

**Note:** `loading` does not currently render a spinner automatically. Consumers can provide their own visible content. `aria-pressed` can be forwarded as a native ARIA attribute when implementing an application-specific toggle button, but that does not make a built-in `selected` variant.

## Behavior

- The component renders through Headless UI `Button` with `type="button"` set by default.
- Clicks invoke native button activation and any supplied `onClick` handler.
- Keyboard activation follows native button behavior (Enter and Space).
- `disabled` or `loading` prevents activation via the native disabled state.
- Light and Dark styles come from the Desktop theme and CSS variables. Set `data-appearance` on a Desktop container to choose a local appearance.

**Implementation note:** The current `Button` passes `...props` after `type="button"`, so a caller-provided `type` can override it (for example, `type="submit"`).

## Accessibility

- Uses a semantic button via Headless UI, preserving native keyboard activation.
- Disabled controls receive the native `disabled` attribute.
- `loading` adds `aria-busy="true"` and disables the control.
- Keyboard focus has a visible CSS focus ring; a forced-colors fallback is included in the stylesheet.
- Icon-only usage should provide an accessible name. Prefer `IconButton` with its required `label` prop, which supplies `aria-label` and `title`.
- Verify color contrast, focus appearance, and screen-reader behavior during component QA; do not claim an unverified WCAG conformance level.

## API Reference

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'neutral' \| 'accent' \| 'destructive'` | `'neutral'` | Visual treatment |
| `size` | `'mini' \| 'small' \| 'regular' \| 'large' \| 'xl'` | `'regular'` | Visual size |
| `loading` | `boolean` | `false` | Disables control and sets `aria-busy`; no automatic spinner |
| `disabled` | `boolean` | Native default (`false`) | Native disabled behavior |
| `className` | `string` | `''` | Appended to `desktop-button` class |
| `children` | `ReactNode` | — | Button content |
| `onClick` | Native button event handler | — | Standard React event |
| `type` | Native button type | `'button'` | Can be overridden by caller |
| Other button props | `ComponentProps<'button'>` | — | Native button attributes forwarded |

**Related export — `IconButton`:** accepts the `Button` props plus required `label: string`, which becomes its accessible name and tooltip title. `IconButton` is a wrapper, not a `Button` variant.

## Code Example

Basic button:

```tsx
import { Button } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function SaveButton() {
  return (
    <div data-theme="desktop">
      <Button variant="accent" onClick={() => console.log('Saved')}>
        Save
      </Button>
    </div>
  )
}
```

All sizes:

```tsx
import { Button } from '@cgpdesktopui/ui'

const sizes = ['mini', 'small', 'regular', 'large', 'xl'] as const

export function ButtonSizes() {
  return (
    <div data-theme="desktop" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {sizes.map((size) => (
        <Button key={size} size={size}>Button</Button>
      ))}
    </div>
  )
}
```

All variants:

```tsx
import { Button } from '@cgpdesktopui/ui'

const variants = ['neutral', 'accent', 'destructive'] as const

export function ButtonVariants() {
  return (
    <div data-theme="desktop" style={{ display: 'flex', gap: 8 }}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  )
}
```

> The stylesheet import is shown in the first example and should be loaded once in the application. The root `.dark` class sets the global appearance. Set `data-appearance` on a Desktop container to choose a local appearance.

## Design Specifications

| Category | Implemented specification |
| --- | --- |
| Geometry | See five size rules above; width is content-based |
| Typography | Project font stack `--desktop-font`; size-specific CSS for Mini / Small |
| Neutral surface | `--desktop-control` |
| Foreground | `--desktop-label` |
| Accent | `--desktop-accent`, `--desktop-on-accent` |
| Destructive | `--desktop-destructive`, `--desktop-destructive-face` |
| Hover / pressed | `--desktop-button-hover`, `--desktop-button-pressed`, plus accent equivalents |
| Disabled | `--desktop-disabled-face`, `--desktop-disabled-label`, `--desktop-accent-disabled` |
| Focus | `--desktop-control-focus` (two-layer focus ring) |
| Border / rim | `--desktop-control-rim` |
| Motion | `--desktop-control-transition`; reduced-motion override |
| Material | CSS surface/color approximations; no automatic Liquid Glass effect in Button |

Source files: `packages/ui/src/components/button.tsx`, `packages/ui/src/styles/desktop-tokens.css`, `docs/design.md`, and `docs/tokens.md`.

**Source classification:** Button dimensions and visual properties are third-party-inspired / project-defined Web implementations, not Apple-verified macOS 26 component metrics.

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Project Button implementation](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/button.tsx)
- [Project styles and tokens](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/desktop-tokens.css)
- [Project design specification](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Third-party macOS components reference](https://github.com/tamnguyenvan/macos-components)

> Documentation may be expanded incrementally. If the public Button API or actual styles change, update this file and the corresponding live preview together.
