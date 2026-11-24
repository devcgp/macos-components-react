# Radio

## Overview

在一组互斥选项中选择一项，适合调用方自定义布局的场景。

## Anatomy

原生 radio 输入和关联标签。同组控件共享 name。

## Live Preview

## Sizes

沿用网页组件的原生 radio 表面。组件没有独立 size 属性。

## Variants

可设置默认选中、受控选中或禁用。

## States

可设置默认选中、受控选中或禁用。

## Behavior

点击标签选择，使用方向键在同组移动。

## Accessibility

通过原生标签为每个选项命名。自定义分组时宜使用 fieldset 和 legend。

## API Reference

label，以及除 type 外的原生 input 属性。

## Code Example

```tsx
import { Radio } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <fieldset><legend>图库布局</legend><Radio name="view-mode" label="网格" defaultChecked /><Radio name="view-mode" label="列表" /></fieldset>
    </div>
  )
}
```

## Design Specifications

沿用网页组件的原生 radio 表面。组件没有独立 size 属性。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Radio](https://developer.apple.com/design/human-interface-guidelines/radio-buttons)
