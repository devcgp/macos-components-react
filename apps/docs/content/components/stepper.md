# Stepper

## Overview

逐步调整数值。

## Anatomy

增加、减少按钮与可选数值。

## Live Preview

## Sizes

高 24px，三种布局 20 / 62 / 66px 宽。

## Variants

none、inside、outside。

## States

none、inside、outside。

## Behavior

到达边界时停用对应按钮。

## Accessibility

到达边界时停用对应按钮。

## API Reference

label、value、min、max、variant、onChange、incrementLabel、decrementLabel。

## Code Example

```tsx
import { useState } from "react"
import { Stepper } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  const [quantity, setQuantity] = useState(3)
  return (
    <div data-theme="tahoe">
      <Stepper label="数量" value={quantity} min={1} max={10} onChange={setQuantity} />
    </div>
  )
}
```

## Design Specifications

高 24px，三种布局 20 / 62 / 66px 宽。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Stepper](https://developer.apple.com/design/human-interface-guidelines/steppers)
