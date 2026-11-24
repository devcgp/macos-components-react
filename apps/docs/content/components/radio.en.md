# Radio

## Overview

Select one option in a mutually exclusive group with a caller-defined layout.

## Anatomy

Native radio input and associated label. Use the same name for every input in a group.

## Live Preview

## Sizes

Uses the existing native radio surface. There is no component size prop.

## Variants

Supports initial selection, controlled selection and disabled states.

## States

Supports initial selection, controlled selection and disabled states.

## Behavior

Click the label to select an option. Use arrow keys to move within a group.

## Accessibility

Give each option a native label. Use fieldset and legend for custom grouping.

## API Reference

label and native input props except type.

## Code Example

```tsx
import { Radio } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <fieldset><legend>Library layout</legend><Radio name="view-mode" label="Grid" defaultChecked /><Radio name="view-mode" label="List" /></fieldset>
    </div>
  )
}
```

## Design Specifications

Uses the existing native radio surface. There is no component size prop.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Radio](https://developer.apple.com/design/human-interface-guidelines/radio-buttons)
