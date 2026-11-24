# Combo Box

## Overview

Offer an editable field with suggestions.

## Anatomy

Label, input and browser datalist.

## Live Preview

## Sizes

Uses Text Field geometry.

## Variants

Free text and suggestions.

## States

Compare default, keyboard focus, and disabled states. Use the pointer or keyboard to inspect selection and press feedback where applicable.

## Behavior

The browser handles keyboard input and suggestion appearance.

## Accessibility

The browser handles keyboard input and suggestion appearance.

## API Reference

label, options and native input props.

## Code Example

```tsx
import { ComboBox } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <ComboBox label="Format" options={["JPEG", "PNG"]} />
    </div>
  )
}
```

## Design Specifications

Uses Text Field geometry.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Combo Box](https://developer.apple.com/design/human-interface-guidelines/combo-boxes)
