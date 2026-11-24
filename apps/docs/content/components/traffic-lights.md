# Traffic Lights

## Overview

在网页窗口示例中标示 macOS 窗口位置。

## Anatomy

三个装饰色点。

## Live Preview

## Sizes

单个色点 12px。

## Variants

深浅色由主题决定。

## States

深浅色由主题决定。

## Behavior

纯装饰，没有系统窗口操作。

## Accessibility

纯装饰，没有系统窗口操作。

## API Reference

无业务属性。

## Code Example

```tsx
import { TrafficLights } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <TrafficLights />
    </div>
  )
}
```

## Design Specifications

单个色点 12px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Traffic Lights](https://developer.apple.com/design/human-interface-guidelines/windows)
