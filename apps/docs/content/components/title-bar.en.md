# Title Bar

## Overview

Show a window title and window-level actions.

## Anatomy

Window indicators, title and action slot.

## Live Preview

## Sizes

Height follows content.

## Variants

Optional actions.

## States

Optional actions.

## Behavior

Web approximation. The caller supplies actions.

## Accessibility

Web approximation. The caller supplies actions.

## API Reference

title and actions.

## Code Example

```tsx
import { TitleBar } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <TitleBar title="Photo Library" />
    </div>
  )
}
```

## Design Specifications

Height follows content.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Title Bar](https://developer.apple.com/design/human-interface-guidelines/windows)
