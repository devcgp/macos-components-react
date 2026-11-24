# Window

## Overview

将工具栏、标题栏与内容组合为一个场景。

## Anatomy

标题栏、装饰性窗口按钮和内容区。

## Live Preview

## Sizes

容器宽度，16px 圆角。

## Variants

可选工具栏。

## States

可选工具栏。

## Behavior

网页容器，不提供系统窗口管理。

## Accessibility

网页容器，不提供系统窗口管理。

## API Reference

title、toolbar、children。

## Code Example

```tsx
import { Window } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Window title="PhotoVault">图库</Window>
    </div>
  )
}
```

## Design Specifications

容器宽度，16px 圆角。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Window](https://developer.apple.com/design/human-interface-guidelines/windows)
