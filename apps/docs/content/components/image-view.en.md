# Image View

## Overview

Display a photo or file preview.

## Anatomy

Image and alternative text.

## Live Preview

## Sizes

Sized by the container or image attributes.

## Variants

Contain or crop.

## States

Contain or crop.

## Behavior

Provide meaningful alt text. Use an empty alt for decorative images.

## Accessibility

Provide meaningful alt text. Use an empty alt for decorative images.

## API Reference

Native img props and fit.

## Code Example

```tsx
import { ImageView } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <ImageView src="/photo.jpg" alt="Coast" />
    </div>
  )
}
```

## Design Specifications

Sized by the container or image attributes.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Image View](https://developer.apple.com/design/human-interface-guidelines/image-views)
