# Text View

## Overview

展示可选择的说明文字。

## Anatomy

正文容器。

## Live Preview

## Sizes

随内容换行。

## Variants

正文、说明。

## States

正文、说明。

## Behavior

使用浏览器原生文本选择。

## Accessibility

使用浏览器原生文本选择。

## API Reference

tone、children 和原生 div 属性。

## Code Example

```tsx
import { TextView } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <TextView tone="secondary">三张照片</TextView>
    </div>
  )
}
```

## Design Specifications

随内容换行。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Text View](https://developer.apple.com/design/human-interface-guidelines/text-views)
