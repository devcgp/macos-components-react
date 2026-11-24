# Text View

## Overview

Display selectable explanatory text.

## Anatomy

Text container.

## Live Preview

## Sizes

Wraps to fit its container.

## Variants

Body or secondary text.

## States

Body or secondary text.

## Behavior

Uses native browser text selection.

## Accessibility

Uses native browser text selection.

## API Reference

tone, children and native div props.

## Code Example

```tsx
import { TextView } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <TextView tone="secondary">Three photos</TextView>
    </div>
  )
}
```

## Design Specifications

Wraps to fit its container.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Text View](https://developer.apple.com/design/human-interface-guidelines/text-views)
