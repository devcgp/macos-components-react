# Inspector Panel

## Overview

Display details for the current object.

## Anatomy

Complementary region with a title.

## Live Preview

## Sizes

Width follows the parent layout.

## Variants

Solid window surface.

## States

Solid window surface.

## Behavior

Provide an accessible region name.

## Accessibility

Provide an accessible region name.

## API Reference

title and children.

## Code Example

```tsx
import { InspectorPanel } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <InspectorPanel title="File details">JPEG</InspectorPanel>
    </div>
  )
}
```

## Design Specifications

Width follows the parent layout.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Inspector Panel](https://developer.apple.com/design/human-interface-guidelines/windows)
