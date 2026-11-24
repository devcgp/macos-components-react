# Inspector Panel

## Overview

展示当前对象的详细属性。

## Anatomy

带标题的互补区域。

## Live Preview

## Sizes

由父布局决定宽度。

## Variants

实色窗口表面。

## States

实色窗口表面。

## Behavior

提供可访问的区域名称。

## Accessibility

提供可访问的区域名称。

## API Reference

title、children。

## Code Example

```tsx
import { InspectorPanel } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <InspectorPanel title="文件详情">JPEG</InspectorPanel>
    </div>
  )
}
```

## Design Specifications

由父布局决定宽度。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Inspector Panel](https://developer.apple.com/design/human-interface-guidelines/windows)
