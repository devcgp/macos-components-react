# Sheet

## Overview

Present a related task over a window.

## Anatomy

Scrim, title, panel and close action.

## Live Preview

## Sizes

Maximum panel width is 360px.

## Variants

Open and closed.

## States

Open and closed.

## Behavior

Escape closes the sheet and focus returns to the trigger.

## Accessibility

Escape closes the sheet and focus returns to the trigger.

## API Reference

open, onClose, title, children and closeLabel.

## Code Example

```tsx
import { useState } from "react"
import { Button, Sheet } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <div data-theme="tahoe">
      <Button onClick={() => setOpen(true)}>View details</Button>
      <Sheet open={open} onClose={close} title="File details">JPEG</Sheet>
    </div>
  )
}
```

## Design Specifications

Maximum panel width is 360px.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Sheet](https://developer.apple.com/design/human-interface-guidelines/sheets)
