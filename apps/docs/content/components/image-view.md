# Image View

## Overview

展示照片或文件预览。

## Anatomy

图像与替代文字。

## Live Preview

## Sizes

宽高由容器或图片属性控制。

## Variants

原始比例与裁剪。

## States

原始比例与裁剪。

## Behavior

提供有意义的 alt，装饰图使用空 alt。

## Accessibility

提供有意义的 alt，装饰图使用空 alt。

## API Reference

原生 img 属性与 fit。

## Code Example

```tsx
import { ImageView } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <ImageView src="/photo.jpg" alt="海岸" />
    </div>
  )
}
```

## Design Specifications

宽高由容器或图片属性控制。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Image View](https://developer.apple.com/design/human-interface-guidelines/image-views)
