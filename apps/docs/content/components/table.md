# Lists and Tables

## Overview

用行和列呈现可扫描的数据。

## Anatomy

表标题、列头和单元格。

## Live Preview

## Sizes

列宽取决于内容，可横向滚动。

## Variants

List、Table。

## States

List、Table。

## Behavior

保持表格与列表的原生结构。

## Accessibility

保持表格与列表的原生结构。

## API Reference

Table 使用 caption、columns、rows。List 支持 ul 属性。

## Code Example

```tsx
import { Table } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <Table caption="图库" columns={[{ id: "name", label: "文件" }]} rows={[{ id: "1", cells: { name: "海岸.jpg" } }]} />
    </div>
  )
}
```

## Design Specifications

列宽取决于内容，可横向滚动。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Lists and Tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
