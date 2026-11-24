# Lists and Tables

## Overview

Present scannable data in rows and columns.

## Anatomy

Caption, column headings and cells.

## Live Preview

## Sizes

Columns size to content and can scroll horizontally.

## Variants

List and Table.

## States

List and Table.

## Behavior

Preserves native table and list structure.

## Accessibility

Preserves native table and list structure.

## API Reference

Table accepts caption, columns and rows. List accepts ul props.

## Code Example

```tsx
import { Table } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <Table caption="Library" columns={[{ id: "name", label: "File" }]} rows={[{ id: "1", cells: { name: "Coast.jpg" } }]} />
    </div>
  )
}
```

## Design Specifications

Columns size to content and can scroll horizontally.

These values describe the web implementation. Verification against official nodes and individual states is pending.

[Design guide and sources](/downloads/design.en.md)

## References

[Apple HIG · Lists and Tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
