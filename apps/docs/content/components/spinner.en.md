# Spinner

## Overview

Indicate that work is still in progress.

## Anatomy

Spinning symbol with an accessible label.

## Live Preview

## Sizes

Size follows the icon context.

## Variants

In progress.

## States

In progress.

## Behavior

Status semantics announce progress to assistive technology.

## Accessibility

Status semantics announce progress to assistive technology.

## API Reference

label.

## Code Example

```tsx
import { Spinner } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Spinner label="Reading library" />
    </div>
  )
}
```

## Design Specifications

Size follows the icon context.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Spinner](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
