# Select

## Overview

Choose one value from a fixed list.

## Anatomy

Label and native select.

## Live Preview

## Sizes

Regular is 24px high.

## Variants

Default and disabled.

## States

Default and disabled.

## Behavior

The browser handles the option list and keyboard navigation.

## Accessibility

The browser handles the option list and keyboard navigation.

## API Reference

label, value, defaultValue, onChange and children.

## Code Example

```tsx
import { Select } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Select label="Format"><option>JPEG</option><option>PNG</option></Select>
    </div>
  )
}
```

## Design Specifications

Regular is 24px high.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Select](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
