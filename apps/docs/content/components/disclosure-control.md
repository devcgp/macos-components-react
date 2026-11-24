# Disclosure Control

## Overview

按需展示附加信息。

## Anatomy

折叠箭头、按钮与内容。

## Live Preview

## Sizes

按钮最小高 24px。

## Variants

展开与收起。

## States

展开与收起。

## Behavior

Enter 或空格切换，aria-expanded 表示状态。

## Accessibility

Enter 或空格切换，aria-expanded 表示状态。

## API Reference

label、children。

## Code Example

```tsx
import { DisclosureControl } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <DisclosureControl label="详情">JPEG</DisclosureControl>
    </div>
  )
}
```

## Design Specifications

按钮最小高 24px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Disclosure Control](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)
