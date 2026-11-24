# Alert

## Overview

Explain an outcome or error.

## Anatomy

Title and message.

## Live Preview

## Sizes

Sizes to content.

## Variants

info and error.

## States

info and error.

## Behavior

Errors use alert semantics. The component is an inline notification.

## Accessibility

Errors use alert semantics. The component is an inline notification.

## API Reference

title, variant and children.

## Code Example

```tsx
import { Alert } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <Alert title="Import complete">Imported 3 photos.</Alert>
    </div>
  )
}
```

## Design Specifications

Sizes to content.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Alert](https://developer.apple.com/design/human-interface-guidelines/alerts)
