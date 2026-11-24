# Path Control

## Overview

显示用户当前位置与上级路径。

## Anatomy

路径节点与分隔符。

## Live Preview

## Sizes

随容器换行。

## Variants

链接节点和当前位置。

## States

链接节点和当前位置。

## Behavior

上级节点是原生链接，可键盘访问。

## Accessibility

上级节点是原生链接，可键盘访问。

## API Reference

items，最后一项表示当前位置。

## Code Example

```tsx
import { Breadcrumb } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Breadcrumb items={[{ label: "图库", href: "/" }, { label: "收藏", href: "#favorites" }]} />
    </div>
  )
}
```

## Design Specifications

随容器换行。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Path Control](https://developer.apple.com/design/human-interface-guidelines/path-controls)
