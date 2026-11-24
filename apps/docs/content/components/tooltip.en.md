# Tooltip

## Overview

Show a short explanation on hover or focus.

## Anatomy

Trigger and tooltip bubble.

## Live Preview

## Sizes

Maximum bubble width is 180px.

## Variants

Hidden and visible.

## States

Hidden and visible.

## Behavior

aria-describedby associates the explanation with the trigger.

## Accessibility

aria-describedby associates the explanation with the trigger.

## API Reference

text and children.

## Code Example

```tsx
import { Tooltip } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Tooltip text="Show file info">Details</Tooltip>
    </div>
  )
}
```

## Design Specifications

Maximum bubble width is 180px.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Tooltip](https://developer.apple.com/design/human-interface-guidelines/tooltips)
