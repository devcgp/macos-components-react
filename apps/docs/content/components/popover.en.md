# Popover

## Overview

Show nonmodal details near a control.

## Anatomy

Trigger and anchored panel.

## Live Preview

## Sizes

Sizes to content.

## Variants

Open and closed.

## States

Open and closed.

## Behavior

Click outside or press Escape to dismiss.

## Accessibility

Click outside or press Escape to dismiss.

## API Reference

label and children.

## Code Example

```tsx
import { Popover } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Popover label="File info">JPEG</Popover>
    </div>
  )
}
```

## Design Specifications

Sizes to content.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Popover](https://developer.apple.com/design/human-interface-guidelines/popovers)
