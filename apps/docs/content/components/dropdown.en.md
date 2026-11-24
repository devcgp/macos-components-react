# Pop-up Button

## Overview

Choose a value from a predefined list.

## Anatomy

Trigger, menu and selection checkmark.

## Live Preview

## Sizes

At least 24px high and 84px wide, with a 6px radius.

## Variants

The current value has a checkmark.

## States

The current value has a checkmark.

## Behavior

Arrow keys navigate, Enter selects, and Escape closes.

## Accessibility

Arrow keys navigate, Enter selects, and Escape closes.

## API Reference

label, options, selected, onSelect and selectedLabel.

## Code Example

```tsx
import { useState } from "react"
import { Dropdown } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const [format, setFormat] = useState("png")
  return (
    <div data-theme="tahoe">
      <Dropdown label="Format" options={[{ value: "png", label: "PNG" }, { value: "jpeg", label: "JPEG" }]} selected={[format]} onSelect={setFormat} />
    </div>
  )
}
```

## Design Specifications

At least 24px high and 84px wide, with a 6px radius.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Pop-up Button](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
