# Tab View

## Overview

Switch between views in the same panel.

## Anatomy

Tab strip and panels.

## Live Preview

## Sizes

Tabs are at least 24px high.

## Variants

Enabled and disabled tabs.

## States

Enabled and disabled tabs.

## Behavior

Headless UI handles arrow keys and focus semantics.

## Accessibility

Headless UI handles arrow keys and focus semantics.

## API Reference

items, value, defaultValue and onValueChange.

## Code Example

```tsx
import { Tabs } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Tabs label="Library" items={[{ id: "all", label: "All", panel: "3 photos" }]} />
    </div>
  )
}
```

## Design Specifications

Tabs are at least 24px high.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Tab View](https://developer.apple.com/design/human-interface-guidelines/tab-views)
