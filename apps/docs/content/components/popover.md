# Popover

## Overview

从控件附近展示非模态详情。

## Anatomy

触发器与锚定面板。

## Live Preview

## Sizes

由内容决定。

## Variants

关闭、展开。

## States

关闭、展开。

## Behavior

点击外部或按 Esc 关闭。

## Accessibility

点击外部或按 Esc 关闭。

## API Reference

label、children。

## Code Example

```tsx
import { Popover } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Popover label="文件信息">JPEG</Popover>
    </div>
  )
}
```

## Design Specifications

由内容决定。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Popover](https://developer.apple.com/design/human-interface-guidelines/popovers)
