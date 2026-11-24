# Icon Button

## Overview

以图标承载简短操作。

## Anatomy

正方形按钮和图标。

## Live Preview

## Sizes

常规最小宽 24px。

## Variants

与 Button 共用尺寸和状态。

## States

与 Button 共用尺寸和状态。

## Behavior

Enter 或空格激活。

## Accessibility

Enter 或空格激活。

## API Reference

Button 属性及必填 label。

## Code Example

```tsx
import { IconButton } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <IconButton label="刷新">↻</IconButton>
    </div>
  )
}
```

## Design Specifications

常规最小宽 24px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Icon Button](https://developer.apple.com/design/human-interface-guidelines/buttons)
