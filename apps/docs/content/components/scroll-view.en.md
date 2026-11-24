# Scroll View

## Overview

Browse long content in a limited space.

## Anatomy

Focusable scrolling region.

## Live Preview

## Sizes

The caller sets the maximum block size.

## Variants

Vertical scrolling.

## States

Vertical scrolling.

## Behavior

Supports wheel, touch and keyboard scrolling when focused.

## Accessibility

Supports wheel, touch and keyboard scrolling when focused.

## API Reference

label, maxHeight and children.

## Code Example

```tsx
import { ScrollView } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <ScrollView label="Photo list" maxHeight={120}>Library content</ScrollView>
    </div>
  )
}
```

## Design Specifications

The caller sets the maximum block size.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Scroll View](https://developer.apple.com/design/human-interface-guidelines/scroll-views)
