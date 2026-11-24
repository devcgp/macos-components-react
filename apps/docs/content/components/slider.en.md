# Slider

## Overview

Adjust a value within a range.

## Anatomy

Track and thumb.

## Live Preview

## Sizes

6px track with a 20 × 16px thumb.

## Variants

Default, focused and disabled.

## States

Compare default, keyboard focus, and disabled states. Use the pointer or keyboard to inspect selection and press feedback where applicable.

## Behavior

Uses native range keyboard behavior.

## Accessibility

Uses native range keyboard behavior.

## API Reference

min, max, step, value, defaultValue, onChange and disabled.

## Code Example

```tsx
import { Slider } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Slider aria-label="Thumbnail size" min={110} max={280} defaultValue={170} />
    </div>
  )
}
```

## Design Specifications

6px track with a 20 × 16px thumb.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Slider](https://developer.apple.com/design/human-interface-guidelines/sliders)
