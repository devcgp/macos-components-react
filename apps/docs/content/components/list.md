# List

## Overview

展示可顺序浏览的条目。

## Anatomy

列表容器与条目。

## Live Preview

## Sizes

宽度随容器。

## Variants

每项有轻量分隔。

## States

每项有轻量分隔。

## Behavior

使用 ul 和 li 保留语义。

## Accessibility

使用 ul 和 li 保留语义。

## API Reference

原生 ul 属性。

## Code Example

```tsx
import { List } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <List><li>海岸.jpg</li></List>
    </div>
  )
}
```

## Design Specifications

宽度随容器。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · List](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
