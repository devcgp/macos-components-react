# Settings Group

## Overview

Group related preferences for a web app.

## Anatomy

Group border, heading and setting rows.

## Live Preview

## Sizes

Height follows the rows.

## Variants

Accepts controls such as switches.

## States

Accepts controls such as switches.

## Behavior

fieldset and legend convey the group relationship.

## Accessibility

fieldset and legend convey the group relationship.

## API Reference

title and children.

## Code Example

```tsx
import { SettingsGroup, Switch } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <SettingsGroup title="Library"><Switch label="Show file names" /></SettingsGroup>
    </div>
  )
}
```

## Design Specifications

Height follows the rows.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Settings Group](https://developer.apple.com/design/human-interface-guidelines/settings)
