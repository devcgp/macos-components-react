# Select

## Overview

从有限选项中选择一个值。

## Anatomy

标签和原生 select。

## Live Preview

## Sizes

常规高 24px。

## Variants

默认和禁用。

## States

默认和禁用。

## Behavior

浏览器负责候选列表和按键。

## Accessibility

浏览器负责候选列表和按键。

## API Reference

label、value、defaultValue、onChange、children。

## Code Example

```tsx
import { Select } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Select label="格式"><option>JPEG</option><option>PNG</option></Select>
    </div>
  )
}
```

## Design Specifications

常规高 24px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Select](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
