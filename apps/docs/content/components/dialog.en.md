# Dialog

## Overview

Limit interaction to the current task.

## Anatomy

Scrim, centered panel and title.

## Live Preview

## Sizes

Maximum panel width is 360px.

## Variants

Open and closed.

## States

Open and closed.

## Behavior

Headless UI traps and restores focus.

## Accessibility

Headless UI traps and restores focus.

## API Reference

open, onClose, title, children and closeLabel.

## Code Example

```tsx
import { useState } from "react"
import { Button, Dialog } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <div data-theme="desktop">
      <Button onClick={() => setOpen(true)}>View details</Button>
      <Dialog open={open} onClose={close} title="Info">JPEG</Dialog>
    </div>
  )
}
```

## Design Specifications

Maximum panel width is 360px.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Dialog](https://developer.apple.com/design/human-interface-guidelines/modality)
