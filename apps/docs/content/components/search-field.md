# Search Field

## Overview

在当前范围内查找内容。

## Anatomy

放大镜和搜索输入。

## Live Preview

## Sizes

常规高 24px，胶囊形。

## Variants

空、输入、聚焦、禁用。

## States

可对照默认、键盘焦点和禁用状态。适用时，可通过鼠标或键盘查看选中、按下等反馈。

## Behavior

接收原生输入事件，业务层选择过滤范围。

## Accessibility

接收原生输入事件，业务层选择过滤范围。

## API Reference

原生 input 属性；需提供可访问名称。

## Code Example

```tsx
import { SearchField } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <SearchField aria-label="搜索照片" placeholder="搜索照片" />
    </div>
  )
}
```

## Design Specifications

常规高 24px，胶囊形。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Search Field](https://developer.apple.com/design/human-interface-guidelines/search-fields)
