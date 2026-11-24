# Sheet

## Overview

在窗口上方呈现相关操作。

## Anatomy

遮罩、标题、面板、关闭操作。

## Live Preview

## Sizes

面板宽度上限 360px。

## Variants

打开、关闭。

## States

打开、关闭。

## Behavior

Esc 关闭，焦点回到触发器。

## Accessibility

Esc 关闭，焦点回到触发器。

## API Reference

open、onClose、title、children、closeLabel。

## Code Example

```tsx
import { useState } from "react"
import { Button, Sheet } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <div data-theme="desktop">
      <Button onClick={() => setOpen(true)}>查看详情</Button>
      <Sheet open={open} onClose={close} title="文件详情">JPEG</Sheet>
    </div>
  )
}
```

## Design Specifications

面板宽度上限 360px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Sheet](https://developer.apple.com/design/human-interface-guidelines/sheets)
