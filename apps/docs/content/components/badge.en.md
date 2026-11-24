# Status Feedback

## Overview

Add a short label describing an item’s status.

## Anatomy

Pill surface and text.

## Live Preview

## Sizes

At least 16px high.

## Variants

Neutral.

## States

Neutral.

## Behavior

Static status labels do not take keyboard focus.

## Accessibility

Static status labels do not take keyboard focus.

## API Reference

Native span props.

## Code Example

```tsx
import { Badge } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Badge>JPEG</Badge>
    </div>
  )
}
```

## Design Specifications

At least 16px high.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Status Feedback](https://developer.apple.com/design/human-interface-guidelines/status)
