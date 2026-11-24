# Alert

## Overview

向用户说明处理结果或错误。

## Anatomy

标题与正文。

## Live Preview

## Sizes

随内容。

## Variants

info、error。

## States

info、error。

## Behavior

错误使用 alert 语义，本组件是行内通知。

## Accessibility

错误使用 alert 语义，本组件是行内通知。

## API Reference

title、variant、children。

## Code Example

```tsx
import { Alert } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <Alert title="读取完成">已导入 3 张图片。</Alert>
    </div>
  )
}
```

## Design Specifications

随内容。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Alert](https://developer.apple.com/design/human-interface-guidelines/alerts)
