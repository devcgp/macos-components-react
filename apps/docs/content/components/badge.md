# Status Feedback

## Overview

用短标签补充对象状态。

## Anatomy

胶囊形表面和文本。

## Live Preview

## Sizes

最小高 16px。

## Variants

中性色。

## States

中性色。

## Behavior

静态状态不接收键盘焦点。

## Accessibility

静态状态不接收键盘焦点。

## API Reference

原生 span 属性。

## Code Example

```tsx
import { Badge } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Badge>JPEG</Badge>
    </div>
  )
}
```

## Design Specifications

最小高 16px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Status Feedback](https://developer.apple.com/design/human-interface-guidelines/status)
