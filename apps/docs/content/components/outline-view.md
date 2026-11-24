# Outline View

## Overview

浏览有层级的目录。

## Anatomy

可展开分支和叶节点。

## Live Preview

## Sizes

每层向内缩进。

## Variants

展开、折叠。

## States

展开、折叠。

## Behavior

Tab 移动，Enter 或空格展开分支。

## Accessibility

Tab 移动，Enter 或空格展开分支。

## API Reference

items，分支可包含 children。

## Code Example

```tsx
import { OutlineView } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <OutlineView items={[{ id: "1", label: "图库", children: [{ id: "2", label: "收藏" }] }]} />
    </div>
  )
}
```

## Design Specifications

每层向内缩进。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Outline View](https://developer.apple.com/design/human-interface-guidelines/outline-views)
