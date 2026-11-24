# Progress Indicator

## Overview

Show how far a task has progressed.

## Anatomy

Track and filled portion.

## Live Preview

## Sizes

Regular is 10px high.

## Variants

Determinate and indeterminate.

## States

Determinate and indeterminate.

## Behavior

Use 0–100 for a known value. Omit value while waiting.

## Accessibility

Use 0–100 for a known value. Omit value while waiting.

## API Reference

label and value.

The package exports ProgressIndicator and its compatibility alias Progress.

## Code Example

```tsx
import { Progress } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Progress label="Import progress" value={45} />
    </div>
  )
}
```

## Design Specifications

Regular is 10px high.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Progress Indicator](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
