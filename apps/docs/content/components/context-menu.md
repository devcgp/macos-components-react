# Context Menu

## Overview

在对象附近展示相关命令。

## Anatomy

触发器与命令列表。

## Live Preview

## Sizes

复用 Menu 尺寸。

## Variants

常规和禁用命令。

## States

常规和禁用命令。

## Behavior

右键或键盘激活。菜单锚定触发器。

## Accessibility

右键或键盘激活。菜单锚定触发器。

## API Reference

label、actions。

## Code Example

```tsx
import { ContextMenu } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  const showInfo = () => document.getElementById("example-status")?.replaceChildren("JPEG")
  return (
    <div data-theme="desktop">
      <ContextMenu label="照片操作" actions={[{ id: "info", label: "简介", onSelect: showInfo }]} />
      <output id="example-status" />
    </div>
  )
}
```

## Design Specifications

复用 Menu 尺寸。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Context Menu](https://developer.apple.com/design/human-interface-guidelines/context-menus)
