# Combo Box

## Overview

提供可编辑输入和候选值。

## Anatomy

标签、输入与浏览器 datalist。

## Live Preview

## Sizes

使用 TextField 几何。

## Variants

自由输入、候选。

## States

可对照默认、键盘焦点和禁用状态。适用时，可通过鼠标或键盘查看选中、按下等反馈。

## Behavior

浏览器管理候选键盘行为，外观按浏览器变化。

## Accessibility

浏览器管理候选键盘行为，外观按浏览器变化。

## API Reference

label、options 及原生 input 属性。

## Code Example

```tsx
import { ComboBox } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <ComboBox label="格式" options={["JPEG", "PNG"]} />
    </div>
  )
}
```

## Design Specifications

使用 TextField 几何。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Combo Box](https://developer.apple.com/design/human-interface-guidelines/combo-boxes)
