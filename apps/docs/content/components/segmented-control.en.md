# Segmented Control

## Overview

Switch between a small set of views.

## Anatomy

Radio group and segment labels.

## Live Preview

## Sizes

At least 24px high with a 6px radius.

## Variants

Current segment and focus.

## States

Current segment and focus.

## Behavior

Arrow keys switch between options.

## Accessibility

Arrow keys switch between options.

## API Reference

label, name, options, value and onChange.

## Code Example

```tsx
import { useState } from "react"
import { SegmentedControl } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const [view, setView] = useState("Grid")
  return (
    <div data-theme="tahoe">
      <SegmentedControl label="View" name="view" options={["Grid", "List"]} value={view} onChange={setView} />
    </div>
  )
}
```

## Design Specifications

At least 24px high with a 6px radius.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Segmented Control](https://developer.apple.com/design/human-interface-guidelines/segmented-controls)
