# Slider

## Overview

调整一个有范围的值。

## Anatomy

轨道和滑块。

## Live Preview

## Sizes

轨道高 6px，滑块 20 × 16px。

## Variants

默认、焦点、禁用。

## States

可对照默认、键盘焦点和禁用状态。适用时，可通过鼠标或键盘查看选中、按下等反馈。

## Behavior

使用原生 range 的键盘交互。

## Accessibility

使用原生 range 的键盘交互。

## API Reference

min、max、step、value、defaultValue、onChange、disabled。

## Code Example

```tsx
import { Slider } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Slider aria-label="缩略图大小" min={110} max={280} defaultValue={170} />
    </div>
  )
}
```

## Design Specifications

轨道高 6px，滑块 20 × 16px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Slider](https://developer.apple.com/design/human-interface-guidelines/sliders)
