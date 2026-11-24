# Traffic Lights

## Overview

Identify the window chrome in a macOS-style example.

## Anatomy

Three decorative indicators.

## Live Preview

## Sizes

Each indicator is 12px wide.

## Variants

Follows the light or dark theme.

## States

Follows the light or dark theme.

## Behavior

Decorative; does not control system windows.

## Accessibility

Decorative; does not control system windows.

## API Reference

No component-specific props.

## Code Example

```tsx
import { TrafficLights } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <TrafficLights />
    </div>
  )
}
```

## Design Specifications

Each indicator is 12px wide.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Traffic Lights](https://developer.apple.com/design/human-interface-guidelines/windows)
