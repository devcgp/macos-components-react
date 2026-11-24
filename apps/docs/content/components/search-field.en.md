# Search Field

## Overview

Find items within the current scope.

## Anatomy

Magnifier and search input.

## Live Preview

## Sizes

Regular is a 24px-high pill.

## Variants

Empty, populated, focused and disabled.

## States

Compare default, keyboard focus, and disabled states. Use the pointer or keyboard to inspect selection and press feedback where applicable.

## Behavior

Receives native input events. The application defines the scope.

## Accessibility

Receives native input events. The application defines the scope.

## API Reference

Native input props. Provide an accessible name.

## Code Example

```tsx
import { SearchField } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <SearchField aria-label="Search photos" placeholder="Search photos" />
    </div>
  )
}
```

## Design Specifications

Regular is a 24px-high pill.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Search Field](https://developer.apple.com/design/human-interface-guidelines/search-fields)
