# Checkbox

> Component: `Checkbox`\
> Package: `@macos-tahoe/ui`\
> Documentation route: `#/tahoe/checkbox`
> Design system: **Tahoe Design Tokens** (always use the latest repository tokens)

## Overview

Checkboxes represent **independent selections** in forms, preference panels, and multi-select lists. Multiple checkboxes may be selected at the same time.

- Use a Checkbox to represent selected vs. unselected choices, not a one-time command.
- Consider a Switch for an immediately applied on/off setting and a Radio Group for mutually exclusive choices.
- This is a Tahoe-inspired React web control, not a native Apple control.

## Anatomy

The implemented structure consists of:

1. **Label wrapper** — native `<label>` containing the control and text, making the text clickable.
2. **Native input** — `<input type="checkbox">` for semantics, focus, keyboard interaction, and selection state.
3. **Visual box** — decorative check box styled through Tahoe Design Tokens.
4. **Checkmark** — SVG decoration revealed when checked; hidden from assistive technology.
5. **Label text** — the required `label: string` prop.

There are no dedicated description, error-message, icon, size, or variant APIs in the current component.

## Live Preview

> **Rendered by the documentation site's React preview system.** This Markdown describes the cards; it must not replace interactive components with static screenshots.

### Shared card layout

Each card has:

- Card title at top left.
- **Preview / Code** tabs. The **Light / Dark** tabs change the current card. The header appearance button changes the site theme.
- **Preview:** real exported `Checkbox` components from `@macos-tahoe/ui`.
- **Code:** corresponding runnable React + TypeScript example, syntax highlighting, and **Copy Code**.

### Card 1 — Checkbox Selection

Render initially `Unchecked` and `Checked` examples side by side or stacked. Both remain interactive. Use `defaultChecked` for the uncontrolled example. The Code tab must match the rendered examples.

### Card 2 — Checkbox States

Include Default, Checked, Disabled (unchecked), and Disabled + Checked. Verify Hover, Pressed, and Focus through real pointer/keyboard interaction. Any forced visual inspection states must be explicitly identified as such and never represented as genuine user interaction.

### Card 3 — Controlled Checkbox

Demonstrate `useState`, `checked`, and native `onChange`; display the current boolean value. Code must include imports and a complete compilable component.

### Card 4 — Checkbox Group / Form Example

Show several independent checkboxes within one form with distinct labels. This is a composition of actual `Checkbox` instances; **do not claim that a `CheckboxGroup` component/API exists**.

**Do not generate Sizes or Variants preview cards:** the current Checkbox does not expose `size` or `variant` props and has only one visual size.

## Sizes

The control uses the fixed Medium Tahoe tokens and has no public `size` prop.

| Specification | Current implementation |
| --- | --- |
| Visual box | `16 × 16 CSS px` |
| Corner radius | `5.5px` |
| Minimum label row height | `24px` |
| Box-to-label gap | `8px` |
| Visual checkmark width / height | `9.31px / 8.93px` |

These values describe project CSS, **not an Apple-verified Tahoe geometry specification**. Introduce a size API only after implementation and verification.

## Variants

There is **no `variant` prop**. The single Tahoe visual treatment adapts to Light/Dark theme and checked states. `checked` and `disabled` are states, not variants.

## States

| State | Current implementation |
| --- | --- |
| Unchecked | Native unchecked input with neutral visual box |
| Checked | Native `checked`, accent-filled box with visible checkmark |
| Hover | CSS hover background for an available, unchecked control |
| Pressed | CSS `:active` treatment for checked and unchecked controls |
| Focus | Tahoe focus ring on the visual box via `:focus-visible` |
| Disabled | Native `disabled`; reduced opacity and no interaction |
| Disabled + Checked | Retains selection but blocks interaction |
| Indeterminate | **No dedicated React prop or documented built-in styling**; do not advertise as supported |

## Behavior

- Clicking either the box or its label toggles the native checkbox when enabled.
- **Space** toggles the focused input; **Tab / Shift+Tab** moves focus.
- Supports uncontrolled `defaultChecked` and controlled `checked` plus `onChange`.
- `onChange` uses the native React `ChangeEvent<HTMLInputElement>` handler; read `event.currentTarget.checked`.
- `disabled` prevents user interaction. The native `name` and `value` props support form submission; unchecked checkboxes are not submitted as ordinary form values.
- Light and Dark appearance comes from Tahoe tokens and the theme container, not a Checkbox prop.

## Accessibility

- Keeps a genuine `<input type="checkbox">`; do not add a duplicate `role="checkbox"` on an outer element.
- Native label association provides a readable accessible name and a larger clickable region.
- The custom visual box is decorative and has `aria-hidden="true"`.
- Preserves native keyboard, focus, disabled, and form semantics.
- `--tahoe-control-focus` defines the visual focus ring; the stylesheet includes a forced-colors fallback for native inputs.
- For related options, the consumer may add `<fieldset>` and `<legend>` as appropriate.
- Confirm color contrast, focus visibility, and screen-reader behavior through QA; do not claim unverified WCAG compliance.

## API Reference

Current component signature:

```tsx
import type { ComponentProps, JSX } from 'react'

declare function Checkbox(
  props: Omit<ComponentProps<'input'>, 'type'> & {
    label: string
  }
): JSX.Element
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | None (required) | Visible and accessible label |
| `checked` | `boolean` | None | Controlled checked state |
| `defaultChecked` | `boolean` | Native default `false` | Initial uncontrolled state |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | None | Native React change handler |
| `disabled` | `boolean` | Native default `false` | Prevents interaction |
| `name` | `string` | None | Form field name |
| `value` | Native input value type | Native behavior | Submitted field value |
| Other native input props | `Omit<ComponentProps<'input'>, 'type'>` | Native behavior | Including `required`, `id`, `aria-*`, `data-*` |

**Not implemented as dedicated APIs:** `size`, `variant`, `indeterminate`, `onCheckedChange`, `description`. The input `type` is fixed to `checkbox`.

## Code Example

### Basic / Uncontrolled

```tsx
import { Checkbox } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function BasicCheckbox() {
  return (
    <div data-theme="tahoe">
      <Checkbox label="Show filenames" defaultChecked />
      <Checkbox label="Show file extensions" />
    </div>
  )
}
```

### Controlled

```tsx
import { useState } from 'react'
import { Checkbox } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function ControlledCheckbox() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div data-theme="tahoe">
      <Checkbox
        label="Show filenames"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
      />
      <p>Checked: {String(enabled)}</p>
    </div>
  )
}
```

### Disabled

```tsx
import { Checkbox } from '@macos-tahoe/ui'

export function DisabledCheckboxes() {
  return (
    <div data-theme="tahoe">
      <Checkbox label="Unavailable" disabled />
      <Checkbox label="Checked and locked" defaultChecked disabled />
    </div>
  )
}
```

Import the stylesheet once at the application entry point. The examples use currently implemented props; verify them through the project's TypeScript checks.

## Design Specifications

All preview and component styles must consume the **current Tahoe Design Tokens** instead of duplicating hard-coded colors and dimensions.

| Category | Token / style | Current use |
| --- | --- | --- |
| Checkbox size | `--tahoe-checkbox-size` | 16px visual box |
| Checkbox radius | `--tahoe-checkbox-radius` | 5.5px corners |
| Checkmark | `--tahoe-checkbox-mark-width`, `--tahoe-checkbox-mark-height` | SVG check dimensions |
| Neutral surface | `--tahoe-control` | Unchecked background |
| Accent | `--tahoe-accent` | Checked background |
| Text | `--tahoe-label` | Label color |
| Checkmark color | `--tahoe-on-accent` | Foreground when checked |
| Border / rim | `--tahoe-control-rim` | Box outline |
| Focus | `--tahoe-control-focus` | Focus ring |
| Hover | `--tahoe-button-hover` | Unchecked hover background (currently reused) |
| Pressed | `--tahoe-button-pressed`, `--tahoe-accent-pressed` | Pressed feedback |
| Typography | `--tahoe-type-body-regular-*` | Label typography |
| Layout | `--tahoe-global-height`, `--tahoe-gap` | 24px minimum row height, 8px gap |

Tahoe CSS variables control appearance. The root `.dark` class sets the site theme. A preview card follows it until you choose an appearance for that card.

**Source classification:** Apple HIG informs interaction and accessibility principles. The 16px box and 5.5px corners come from the project’s Medium Tahoe tokens and third-party measured references, not officially certified Apple Tahoe geometry.

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Checkbox implementation](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/checkbox.tsx)
- [Tahoe Design Tokens / CSS](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/tahoe-tokens.css)
- [Project design specification](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Third-party macOS components reference](https://github.com/tamnguyenvan/macos-components)

> Keep the Chinese and English Markdown files and the real Live Preview synchronized whenever the implementation or tokens change.
