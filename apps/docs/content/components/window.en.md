# Window

## Overview

Combine a title bar, toolbar and content in one scene.

## Anatomy

Title bar, decorative window controls and content.

## Live Preview

## Sizes

Container width with a 16px radius.

## Variants

Optional toolbar.

## States

Optional toolbar.

## Behavior

The web container does not manage system windows.

## Accessibility

The web container does not manage system windows.

## API Reference

title, toolbar and children.

## Code Example

```tsx
import { Window } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Window title="PhotoVault">Library</Window>
    </div>
  )
}
```

## Design Specifications

Container width with a 16px radius.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](#/tahoe/design)

## References

[Apple HIG · Window](https://developer.apple.com/design/human-interface-guidelines/windows)
