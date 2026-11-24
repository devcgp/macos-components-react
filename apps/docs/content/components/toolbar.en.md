# Toolbar

## Overview

Group frequently used actions at the top of a window.

## Anatomy

Title, filters, actions and search slots.

## Live Preview

## Sizes

The example is at least 52px high with a 150px search field.

## Variants

Controls wrap when space is limited.

## States

Controls wrap when space is limited.

## Behavior

Each control retains its own keyboard interactions.

## Accessibility

Each control retains its own keyboard interactions.

## API Reference

title, detail, filters, actions, search, filtersLabel and actionsLabel.

## Code Example

```tsx
import { Toolbar, Button } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Toolbar title="Photos" detail="3 photos" actions={<Button>Import</Button>} />
    </div>
  )
}
```

## Design Specifications

The example is at least 52px high with a 150px search field.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Toolbar](https://developer.apple.com/design/human-interface-guidelines/toolbars)
