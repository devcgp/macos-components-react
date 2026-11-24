# Tooltip

## Overview

在鼠标悬停或键盘聚焦时显示简短说明。

## Anatomy

触发元素和说明浮层。

## Live Preview

## Sizes

说明最大宽度 180px。

## Variants

隐藏、可见。

## States

隐藏、可见。

## Behavior

说明通过 aria-describedby 关联。

## Accessibility

说明通过 aria-describedby 关联。

## API Reference

text、children。

## Code Example

```tsx
import { Tooltip } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <Tooltip text="显示文件信息">详情</Tooltip>
    </div>
  )
}
```

## Design Specifications

说明最大宽度 180px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Tooltip](https://developer.apple.com/design/human-interface-guidelines/tooltips)
