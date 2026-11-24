# Menu

## Overview

Show commands for the current object.

## Anatomy

Trigger and list of commands.

## Live Preview

## Sizes

Items are at least 24px high.

## Variants

Enabled and disabled commands.

## States

Enabled and disabled commands.

## Behavior

Arrow keys navigate, Enter runs a command, and Escape closes the menu.

## Accessibility

Arrow keys navigate, Enter runs a command, and Escape closes the menu.

## API Reference

label and actions. Each action has id, label, onSelect and optional disabled.

## Code Example

```tsx
import { DropdownMenu } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const openFile = () => document.getElementById("example-status")?.replaceChildren("Opened")
  return (
    <div data-theme="tahoe">
      <DropdownMenu label="File" actions={[{ id: "open", label: "Open", onSelect: openFile }]} />
      <output id="example-status" />
    </div>
  )
}
```

## Design Specifications

Items are at least 24px high.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Menu](https://developer.apple.com/design/human-interface-guidelines/menus)
