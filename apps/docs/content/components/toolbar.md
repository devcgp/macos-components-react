# Toolbar

## Overview

在窗口顶部组织常用操作。

## Anatomy

标题、筛选、操作及搜索插槽。

## Live Preview

## Sizes

示例最小高 52px，搜索宽 150px。

## Variants

随可用宽度换行。

## States

随可用宽度换行。

## Behavior

使用各控件自身的键盘交互。

## Accessibility

使用各控件自身的键盘交互。

## API Reference

title、detail、filters、actions、search、filtersLabel、actionsLabel。

## Code Example

```tsx
import { Toolbar, Button } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Toolbar title="照片" detail="3 张照片" actions={<Button>导入</Button>} />
    </div>
  )
}
```

## Design Specifications

示例最小高 52px，搜索宽 150px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Toolbar](https://developer.apple.com/design/human-interface-guidelines/toolbars)
