# Scroll View

## Overview

在有限视口浏览较长内容。

## Anatomy

可聚焦的滚动区。

## Live Preview

## Sizes

块向最大尺寸由调用方设定。

## Variants

纵向浏览。

## States

纵向浏览。

## Behavior

支持滚轮、触控和聚焦后的键盘滚动。

## Accessibility

支持滚轮、触控和聚焦后的键盘滚动。

## API Reference

label、maxHeight、children。

## Code Example

```tsx
import { ScrollView } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <ScrollView label="照片列表" maxHeight={120}>图库内容</ScrollView>
    </div>
  )
}
```

## Design Specifications

块向最大尺寸由调用方设定。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Scroll View](https://developer.apple.com/design/human-interface-guidelines/scroll-views)
