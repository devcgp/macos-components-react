# Context Menu

## Overview

Show relevant commands near an object.

## Anatomy

Trigger and command list.

## Live Preview

## Sizes

Uses Menu sizing.

## Variants

Enabled and disabled commands.

## States

Enabled and disabled commands.

## Behavior

Open with a secondary click or the keyboard. The menu anchors to the trigger.

## Accessibility

Open with a secondary click or the keyboard. The menu anchors to the trigger.

## API Reference

label and actions.

## Code Example

```tsx
import { ContextMenu } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  const showInfo = () => document.getElementById("example-status")?.replaceChildren("JPEG")
  return (
    <div data-theme="desktop">
      <ContextMenu label="Photo actions" actions={[{ id: "info", label: "Info", onSelect: showInfo }]} />
      <output id="example-status" />
    </div>
  )
}
```

## Design Specifications

Uses Menu sizing.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Context Menu](https://developer.apple.com/design/human-interface-guidelines/context-menus)
