# Tab View

## Overview

在同一面板切换内容。

## Anatomy

标签条与面板。

## Live Preview

## Sizes

标签最小高 24px。

## Variants

常规、禁用标签。

## States

常规、禁用标签。

## Behavior

Headless UI 提供方向键和焦点语义。

## Accessibility

Headless UI 提供方向键和焦点语义。

## API Reference

items、value、defaultValue、onValueChange。

## Code Example

```tsx
import { Tabs } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Tabs label="图库" items={[{ id: "all", label: "全部", panel: "3 张照片" }]} />
    </div>
  )
}
```

## Design Specifications

标签最小高 24px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Tab View](https://developer.apple.com/design/human-interface-guidelines/tab-views)
