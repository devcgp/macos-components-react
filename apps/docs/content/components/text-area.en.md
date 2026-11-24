# Text Area

## Overview

Accept multiline text.

## Anatomy

Label and native textarea.

## Live Preview

## Sizes

Minimum height is 64px.

## Variants

Default, focused and disabled.

## States

Default, focused and disabled.

## Behavior

Preserves multiline editing and form semantics.

## Accessibility

Preserves multiline editing and form semantics.

## API Reference

label and native textarea props.

## Code Example

```tsx
import { TextArea } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <TextArea label="Notes" rows={3} />
    </div>
  )
}
```

## Design Specifications

Minimum height is 64px.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Text Area](https://developer.apple.com/design/human-interface-guidelines/text-fields)
