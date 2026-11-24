# Radio Button

## Overview

在同组的互斥选项中选择一个。

## Anatomy

组标题和原生 radio。

## Live Preview

## Sizes

按钮直径 16px。

## Variants

未选中、选中、禁用。

## States

未选中、选中、禁用。

## Behavior

方向键改变同组选中项。

## Accessibility

方向键改变同组选中项。

## API Reference

label、options、value、defaultValue、onValueChange、disabled。

## Code Example

```tsx
import { RadioGroup } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <RadioGroup label="布局" options={[{ value: "grid", label: "网格" }]} defaultValue="grid" />
    </div>
  )
}
```

## Design Specifications

按钮直径 16px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Radio Button](https://developer.apple.com/design/human-interface-guidelines/radio-buttons)
