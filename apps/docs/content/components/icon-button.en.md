# Icon Button

## Overview

Represent a short action with an icon.

## Anatomy

Square button and icon.

## Live Preview

## Sizes

Regular has a minimum width of 24px.

## Variants

Shares Button sizes and states.

## States

Shares Button sizes and states.

## Behavior

Enter or Space activates the button.

## Accessibility

Enter or Space activates the button.

## API Reference

Button props and a required label.

## Code Example

```tsx
import { IconButton } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <IconButton label="Refresh">↻</IconButton>
    </div>
  )
}
```

## Design Specifications

Regular has a minimum width of 24px.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Icon Button](https://developer.apple.com/design/human-interface-guidelines/buttons)
