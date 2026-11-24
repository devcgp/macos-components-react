# Split View

## Overview

并排展示导航和内容。

## Anatomy

前导区域与主区域。

## Live Preview

## Sizes

前导列上限 220px。

## Variants

单列与双列。

## States

单列与双列。

## Behavior

网页使用固定比例分栏。

## Accessibility

网页使用固定比例分栏。

## API Reference

leading、children。

## Code Example

```tsx
import { SplitView } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <SplitView leading="目录">图库</SplitView>
    </div>
  )
}
```

## Design Specifications

前导列上限 220px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Split View](https://developer.apple.com/design/human-interface-guidelines/split-views)
