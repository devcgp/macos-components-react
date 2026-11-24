# Stepper

## Overview

Increase or decrease a numeric value in steps.

## Anatomy

Increment, decrement and optional value display.

## Live Preview

## Sizes

24px high; layouts are 20 / 62 / 66px wide.

## Variants

none, inside and outside.

## States

none, inside and outside.

## Behavior

The appropriate button is disabled at each limit.

## Accessibility

The appropriate button is disabled at each limit.

## API Reference

label, value, min, max, variant, onChange, incrementLabel and decrementLabel.

## Code Example

```tsx
import { useState } from "react"
import { Stepper } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const [quantity, setQuantity] = useState(3)
  return (
    <div data-theme="tahoe">
      <Stepper label="Quantity" value={quantity} min={1} max={10} onChange={setQuantity} />
    </div>
  )
}
```

## Design Specifications

24px high; layouts are 20 / 62 / 66px wide.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Stepper](https://developer.apple.com/design/human-interface-guidelines/steppers)
