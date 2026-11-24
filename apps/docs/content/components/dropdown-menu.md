# Menu

## Overview

展示针对当前对象的命令。

## Anatomy

触发器和命令列表。

## Live Preview

## Sizes

菜单项最小高 24px。

## Variants

常规和禁用命令。

## States

常规和禁用命令。

## Behavior

方向键选择，Enter 执行，Esc 关闭。

## Accessibility

方向键选择，Enter 执行，Esc 关闭。

## API Reference

label、actions，每项有 id、label、onSelect、disabled。

## Code Example

```tsx
import { DropdownMenu } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const openFile = () => document.getElementById("example-status")?.replaceChildren("已打开")
  return (
    <div data-theme="tahoe">
      <DropdownMenu label="文件" actions={[{ id: "open", label: "打开", onSelect: openFile }]} />
      <output id="example-status" />
    </div>
  )
}
```

## Design Specifications

菜单项最小高 24px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Menu](https://developer.apple.com/design/human-interface-guidelines/menus)
