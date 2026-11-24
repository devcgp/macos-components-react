# Split View

## Overview

Place navigation beside the main content.

## Anatomy

Leading pane and main pane.

## Live Preview

## Sizes

The leading pane is capped at 220px.

## Variants

Single or two-pane layout.

## States

Single or two-pane layout.

## Behavior

Uses a fixed-proportion web layout.

## Accessibility

Uses a fixed-proportion web layout.

## API Reference

leading and children.

## Code Example

```tsx
import { SplitView } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <SplitView leading="Folders">Library</SplitView>
    </div>
  )
}
```

## Design Specifications

The leading pane is capped at 220px.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Split View](https://developer.apple.com/design/human-interface-guidelines/split-views)
