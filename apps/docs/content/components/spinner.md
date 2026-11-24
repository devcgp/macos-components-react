# Spinner

## Overview

表明任务仍在进行。

## Anatomy

带可访问说明的旋转符号。

## Live Preview

## Sizes

由上下文图标尺寸决定。

## Variants

进行中。

## States

进行中。

## Behavior

用状态语义通知辅助技术。

## Accessibility

用状态语义通知辅助技术。

## API Reference

label（默认正在加载）。

## Code Example

```tsx
import { Spinner } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Spinner label="正在读取图库" />
    </div>
  )
}
```

## Design Specifications

由上下文图标尺寸决定。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Spinner](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
