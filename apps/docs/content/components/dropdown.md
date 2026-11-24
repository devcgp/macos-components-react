# Pop-up Button

## Overview

从预先定义的选项中选择。

## Anatomy

选项触发器、菜单和勾选标记。

## Live Preview

## Sizes

高至少 24px，最小宽 84px，圆角 6px。

## Variants

当前值带勾选标记。

## States

当前值带勾选标记。

## Behavior

方向键导航，Enter 选择，Esc 关闭。

## Accessibility

方向键导航，Enter 选择，Esc 关闭。

## API Reference

label、options、selected、onSelect、selectedLabel。

## Code Example

```tsx
import { useState } from "react"
import { Dropdown } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const [format, setFormat] = useState("png")
  return (
    <div data-theme="tahoe">
      <Dropdown label="格式" options={[{ value: "png", label: "PNG" }, { value: "jpeg", label: "JPEG" }]} selected={[format]} onSelect={setFormat} />
    </div>
  )
}
```

## Design Specifications

高至少 24px，最小宽 84px，圆角 6px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Pop-up Button](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
