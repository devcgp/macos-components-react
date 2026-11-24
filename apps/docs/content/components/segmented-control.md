# Segmented Control

## Overview

切换有限的视图选项。

## Anatomy

单选分组和分段标签。

## Live Preview

## Sizes

外框至少高 24px，6px 圆角。

## Variants

当前分段、焦点。

## States

当前分段、焦点。

## Behavior

方向键切换同组选项。

## Accessibility

方向键切换同组选项。

## API Reference

label、name、options、value、onChange。

## Code Example

```tsx
import { useState } from "react"
import { SegmentedControl } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  const [view, setView] = useState("网格")
  return (
    <div data-theme="desktop">
      <SegmentedControl label="视图" name="view" options={["网格", "列表"]} value={view} onChange={setView} />
    </div>
  )
}
```

## Design Specifications

外框至少高 24px，6px 圆角。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Segmented Control](https://developer.apple.com/design/human-interface-guidelines/segmented-controls)
