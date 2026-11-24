# Dialog

## Overview

限制交互范围以完成当前任务。

## Anatomy

遮罩、居中面板、标题。

## Live Preview

## Sizes

面板宽度上限 360px。

## Variants

打开、关闭。

## States

打开、关闭。

## Behavior

Headless UI 管理焦点限制与恢复。

## Accessibility

Headless UI 管理焦点限制与恢复。

## API Reference

open、onClose、title、children、closeLabel。

## Code Example

```tsx
import { useState } from "react"
import { Button, Dialog } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <div data-theme="tahoe">
      <Button onClick={() => setOpen(true)}>查看详情</Button>
      <Dialog open={open} onClose={close} title="简介">JPEG</Dialog>
    </div>
  )
}
```

## Design Specifications

面板宽度上限 360px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Dialog](https://developer.apple.com/design/human-interface-guidelines/modality)
