# Switch

## Overview

Change an on/off setting immediately.

## Anatomy

Label, track and translucent thumb.

## Live Preview

## Sizes

54 × 24px track and 32 × 20px thumb.

## Variants

On, off and disabled.

## States

Compare default, keyboard focus, and disabled states. Use the pointer or keyboard to inspect selection and press feedback where applicable.

## Behavior

Activate with Space or the label. Exposed as a switch.

## Accessibility

Activate with Space or the label. Exposed as a switch.

## API Reference

label, checked, defaultChecked, onChange and disabled.

## Code Example

```tsx
import { Switch } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <Switch label="Sync favorites" defaultChecked />
    </div>
  )
}
```

## Design Specifications

| Property | Implementation | Evidence |
| --- | --- | --- |
| Track | 54 × 24 CSS px with a 12px radius | Third-party reference and browser measurements |
| Thumb | 32 × 20 CSS px, 2px inset and 18px travel | Third-party dimensions and web geometry |
| Light and dark | Translucent white thumb at 87% / 85%; active track uses the theme accent | Third-party color reference and project theme |
| States | On, off, disabled and keyboard focus. Toggle with Space or the label. | Native HTML semantics and web styling |

Verification against individual macOS 26 UI Kit nodes is pending.
[Third-party reference](https://github.com/tamnguyenvan/macos-components/tree/e82dbfa3702a156e4b9947337dea3d496a162905)

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Switch](https://developer.apple.com/design/human-interface-guidelines/toggles)
