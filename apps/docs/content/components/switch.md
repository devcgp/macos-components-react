# Switch

## Overview

即时改变一个开关设置。

## Anatomy

标签、轨道和半透明滑块。

## Live Preview

## Sizes

轨道 54 × 24px，滑块 32 × 20px。

## Variants

开、关、禁用。

## States

可对照默认、键盘焦点和禁用状态。适用时，可通过鼠标或键盘查看选中、按下等反馈。

## Behavior

空格或标签激活，语义为 switch。

## Accessibility

空格或标签激活，语义为 switch。

## API Reference

label、checked、defaultChecked、onChange、disabled。

## Code Example

```tsx
import { Switch } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <Switch label="同步收藏" defaultChecked />
    </div>
  )
}
```

## Design Specifications

| 项目 | 实现值 | 依据 |
| --- | --- | --- |
| 轨道 | 54 × 24 CSS px，圆角 12px | 第三方参考规格，浏览器实测 |
| 滑块 | 32 × 20 CSS px，内缩 2px，位移 18px | 第三方尺寸与网页几何推导 |
| 浅色／深色 | 半透明白滑块 87%／85%，开启使用主题强调蓝 | 第三方色彩参考与项目主题 |
| 交互状态 | 开／关、禁用、键盘焦点。空格和点击标签均可切换 | 原生 HTML 语义与网页样式 |

官方 Tahoe 26 UI Kit 节点仍待逐项比对。
[第三方参考](https://github.com/tamnguyenvan/macos-components/tree/e82dbfa3702a156e4b9947337dea3d496a162905)

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Switch](https://developer.apple.com/design/human-interface-guidelines/toggles)
