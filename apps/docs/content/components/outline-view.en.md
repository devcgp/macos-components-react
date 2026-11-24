# Outline View

## Overview

Browse a hierarchy of folders or items.

## Anatomy

Expandable branches and leaf nodes.

## Live Preview

## Sizes

Each level adds an indent.

## Variants

Expanded or collapsed.

## States

Expanded or collapsed.

## Behavior

Tab moves focus. Enter or Space expands a branch.

## Accessibility

Tab moves focus. Enter or Space expands a branch.

## API Reference

items, with optional children on each branch.

## Code Example

```tsx
import { OutlineView } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <OutlineView items={[{ id: "1", label: "Library", children: [{ id: "2", label: "Favorites" }] }]} />
    </div>
  )
}
```

## Design Specifications

Each level adds an indent.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Outline View](https://developer.apple.com/design/human-interface-guidelines/outline-views)
