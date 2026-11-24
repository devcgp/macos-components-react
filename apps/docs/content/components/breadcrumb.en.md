# Path Control

## Overview

Show the current location and its ancestors.

## Anatomy

Path segments and separators.

## Live Preview

## Sizes

Wraps to fit the container.

## Variants

Links and the current location.

## States

Links and the current location.

## Behavior

Ancestor links are keyboard accessible.

## Accessibility

Ancestor links are keyboard accessible.

## API Reference

items. The last item is the current location.

## Code Example

```tsx
import { Breadcrumb } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Breadcrumb items={[{ label: "Library", href: "/" }, { label: "Favorites", href: "#favorites" }]} />
    </div>
  )
}
```

## Design Specifications

Wraps to fit the container.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Path Control](https://developer.apple.com/design/human-interface-guidelines/path-controls)
