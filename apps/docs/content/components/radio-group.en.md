# Radio Button

## Overview

Choose one option from a mutually exclusive group.

## Anatomy

Group heading and native radio buttons.

## Live Preview

## Sizes

Radio buttons are 16px in diameter.

## Variants

Unselected, selected and disabled.

## States

Unselected, selected and disabled.

## Behavior

Arrow keys change the selected option.

## Accessibility

Arrow keys change the selected option.

## API Reference

label, options, value, defaultValue, onValueChange and disabled.

## Code Example

```tsx
import { RadioGroup } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <RadioGroup label="Layout" options={[{ value: "grid", label: "Grid" }]} defaultValue="grid" />
    </div>
  )
}
```

## Design Specifications

Radio buttons are 16px in diameter.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Radio Button](https://developer.apple.com/design/human-interface-guidelines/radio-buttons)
