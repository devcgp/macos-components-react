# Segmented Control

> Component: `SegmentedControl` · macOS Tahoe Components  
> Documentation status: Verified against current repository source; Live Preview describes implementation requirements, not completed validation  
> Source: `packages/ui/src/components/controls.tsx`  
> Suggested route: `#/tahoe/segmented-control`

## 1. Overview

A Segmented Control selects **one option from a small, mutually exclusive set**. Typical uses include switching between grid and list layouts, viewing different data subsets, or choosing a settings mode. This implementation is controlled: the parent owns the selected value.

Use it for switching a view or mode within a shared context, not for multiselection. Routing, filtering, and application content are the responsibility of the consumer; the component does not implement those behaviors.

## 2. Anatomy

1. **Container**: `.tahoe-segments` wraps the group.
2. **Segment**: a `<label>` contains a native `input[type="radio"]` and visible `<span>`.
3. **Selected segment**: derived from `checked={value === option}`.
4. **Focus indicator**: applied to the visible span associated with the focused radio.
5. **Accessible group name**: parent uses `role="radiogroup"` and `aria-label={label}`.

The current `options` API is `string[]`; the display label is also the option value. Object-based options, icon slots, and per-option disabling are not supported.

## 3. Live Preview

Use the real exported React `SegmentedControl` within **multiple Live Preview cards**, in this order:

| Card | Example | Verification |
| --- | --- | --- |
| **Basic Selection** | `Grid / List`, with a synchronized readout/content panel | Real controlled `value` and `onChange` |
| **Option Counts** | Independent examples with 2, 3, and 4 options | All options selectable; no invented size/variant |
| **Selection & Keyboard** | Selected item, Tab focus, radio arrow-key navigation | Native radio behavior and visible focus |
| **Practical Example** | `All / Photos / Videos` filters sample items | Actual React state updates, not a static mock |

**Shared card UI:** title on the left and `Light / Dark` tabs on the right; separate `Preview / Code` tabs in the body. Preview is selected by default. Code provides matching, syntax-highlighted TSX with a working `Copy Code` button. Switching views must not inadvertently reset demo selection. Copied code must pass the project's TypeScript checks.

Apply Tahoe variables within a valid `.dark` ancestor for Dark Mode. A standalone `data-theme="dark"` attribute does **not** activate the existing theme mechanism.

The documentation site's React renderer owns the interactive cards; this Markdown defines content and acceptance criteria rather than embedding fake preview markup.

## 4. Sizes

There is currently **no `size` prop** and only one default geometry. Do not offer fictitious Mini/Small/Regular/Large configurations.

| Property | Current implementation | Basis |
| --- | --- | --- |
| Container minimum height | 24px | Project control-height convention; `.tahoe-segments` currently declares `min-height: 24px` directly |
| Container radius | 6px | `.tahoe-segments` |
| Container padding | 2px | `.tahoe-segments` |
| Gap between segments | 1px | `.tahoe-segments` |
| Segment radius | 4px | `.tahoe-segments span` |
| Segment horizontal padding | 10px | `.tahoe-segments span` |

Width grows with content. There is no built-in full-width or equal-width prop.

## 5. Variants

No `variant` prop currently exists. Light/Dark represents the preview environment, not a component variant. Two-option and three-option examples are content configurations, not appearance variants.

## 6. States

| State | Current behavior |
| --- | --- |
| Unselected | The radio is not checked and has inactive styling |
| Selected | `input:checked + span` uses the accent background |
| Focus-visible | `input:focus-visible + span` shows an accent outline |
| Hover / Pressed | Native pointer interaction works; current CSS has no dedicated segment hover/pressed visual rules |
| Disabled | No component or per-option `disabled` API is exposed |
| Loading | Not supported |

Do not present unimplemented states as features.

## 7. Behavior

- This is a **controlled component**: the parent supplies `value` and updates it in `onChange(nextValue)`.
- Changing a radio calls `onChange` with that option's string.
- All radios share `name`; separate groups must use distinct names.
- Clicking a label selects it. Tab, arrow-key, and Space behavior relies on native radios and should be verified in target browsers.
- If `value` is not in `options`, no segment may appear selected; consumers should use a valid initial value.
- Prefer stable, nonempty, unique option strings. Current React keys use the strings.

## 8. Accessibility

- `role="radiogroup"` and `aria-label={label}` name the group.
- Native `input[type="radio"]` retains radio semantics.
- Each radio is associated with visible text via a wrapping `<label>`.
- Focus-visible must be apparent in both Light and Dark themes.
- Preview/Code and Light/Dark tabs should also be keyboard accessible, without conflicting radio `name` values.
- Per-item disabled states, icon-only items, and auxiliary descriptions are not part of the current API. Extend implementation and tests before documenting any such features.

## 9. API Reference

```ts
type SegmentedControlProps = {
  label: string
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
}
```

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Yes | Accessible group label |
| `name` | `string` | Yes | Native radio-group name |
| `value` | `string` | Yes | Currently selected option |
| `options` | `string[]` | Yes | String choices |
| `onChange` | `(value: string) => void` | Yes | Selection callback |

There are no default props or `defaultValue`, `size`, `variant`, `disabled`, or object-based `options` APIs in the current implementation.

## 10. Code Example

A complete React + TypeScript example using the current public API:

```tsx
import { useState } from 'react'
import { SegmentedControl } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

const views = ['Grid', 'List']

export function ViewSwitcher() {
  const [view, setView] = useState('Grid')

  return (
    <div data-theme="tahoe">
      <SegmentedControl
        label="View layout"
        name="view-layout"
        options={views}
        value={view}
        onChange={setView}
      />
      <p>Current view: {view}</p>
    </div>
  )
}
```

Dark Mode is controlled by the application's `.dark` ancestor; there is no `theme` prop on `SegmentedControl`.

## 11. Design Specifications

**Tahoe Design Tokens are the source of truth.** Follow `packages/ui/src/styles/tahoe-tokens.css` and `docs/tokens.md`; do not introduce a second hard-coded palette.

| Role | Current CSS / Token |
| --- | --- |
| Background | `--tahoe-control` |
| Selected segment background | `--tahoe-accent` |
| Selected text | The current CSS uses `#111`; contrast should be reviewed in both themes before changing to a semantic token |
| Focus outline | `--tahoe-accent`, 2px, 2px offset |
| Theme scope | `[data-theme="tahoe"]` with a `.dark` ancestor |
| Font | Inherited Tahoe typography system |

**Specification provenance:** the 24px minimum height and 6px radius are repository/project-defined web dimensions, not verified official Apple Tahoe 26 measurements.

Any new component-specific semantic tokens must be synchronized across token definitions, CSS, both language docs, and visual verification.

## 12. References

- Source: `packages/ui/src/components/controls.tsx`
- Styles: `packages/ui/src/styles/tahoe-tokens.css`
- Design guidance: `docs/design.md`
- Tokens: `docs/tokens.md`
- Catalog: `apps/docs/src/app/catalog.ts`
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [MDN — radio input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)

> TODO: Mark Live Preview, cross-browser keyboard behavior, and color contrast as verified only after actual tests.
