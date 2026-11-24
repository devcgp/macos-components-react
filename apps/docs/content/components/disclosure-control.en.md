# Disclosure Control

## Overview

Show additional information on demand.

## Anatomy

Chevron, trigger and content.

## Live Preview

## Sizes

The trigger is at least 24px high.

## Variants

Expanded and collapsed.

## States

Expanded and collapsed.

## Behavior

Enter or Space toggles aria-expanded.

## Accessibility

Enter or Space toggles aria-expanded.

## API Reference

label and children.

## Code Example

```tsx
import { DisclosureControl } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <DisclosureControl label="Details">JPEG</DisclosureControl>
    </div>
  )
}
```

## Design Specifications

The trigger is at least 24px high.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Disclosure Control](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)
