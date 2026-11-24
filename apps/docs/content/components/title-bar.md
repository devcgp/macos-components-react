# Title Bar

## Overview

显示窗口名称和窗口级操作。

## Anatomy

窗口标记、标题和操作插槽。

## Live Preview

## Sizes

内容决定高度。

## Variants

可选 actions。

## States

可选 actions。

## Behavior

Web Approximation。操作由调用方提供。

## Accessibility

Web Approximation。操作由调用方提供。

## API Reference

title、actions。

## Code Example

```tsx
import { TitleBar } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <TitleBar title="照片图库" />
    </div>
  )
}
```

## Design Specifications

内容决定高度。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Title Bar](https://developer.apple.com/design/human-interface-guidelines/windows)
