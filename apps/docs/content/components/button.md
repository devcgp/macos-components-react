# Button

> 组件：`Button`\
> 包：`@macos-tahoe/ui`\
> 文档路由：`#/tahoe/button`

## Overview

按钮用于触发保存、确认或删除等单次操作。标签应直接说明操作。持续的开关或选中状态使用 Switch 或 Checkbox。

项目中的 `Button` 是参考 macOS Tahoe 的网页实现。以下尺寸和视觉参数为项目实现值，尚未经 Apple 官方 Tahoe 26 UI Kit 验证。

## Anatomy

1. **容器**：由 Headless UI `Button` 渲染为按钮元素。
2. **内容**：通过 `children` 提供，通常是文字标签，也可传入其他 React 内容。
3. **外观**：CSS 根据 `data-variant` 和 `data-size` 应用相应样式。
4. **焦点环**：通过 `:focus-visible` 显示键盘焦点。

图标按钮使用另行导出的 `IconButton`。普通 `Button` 的内容由 `children` 传入。

## Live Preview

## Sizes

| 尺寸 | 高度 | 圆角 | 横向内边距 | 字号 |
| --- | ---: | --- | ---: | --- |
| `mini` | 16px | 4px | 7px | 10px |
| `small` | 20px | 5px | 10px | 11px |
| `regular` | 24px | 6px | 16px | 项目常规字号 |
| `large` | 28px | 胶囊形（999px） | 16px | 项目常规字号 |
| `xl` | 36px | 胶囊形（999px） | 16px | 项目常规字号 |

默认使用 `regular`。表中数值为当前 CSS 像素值。按钮宽度由内容决定。

## Variants

| 变体 | 默认 | 当前样式 | 适用操作 |
| --- | --- | --- | --- |
| `neutral` | 是 | 中性表面与标签色 | 常规操作 |
| `accent` | 否 | 强调色表面与浅色文字 | 主要操作 |
| `destructive` | 否 | 淡色危险操作表面与危险色文字 | 删除等危险操作 |

`variant` 接受上表中的三个值。危险操作变体使用淡色表面。

## States

| 状态 | 当前实现 |
| --- | --- |
| 默认 | 启用并可操作 |
| 悬停 | 通过 CSS `:hover` 触发 |
| 按下 | 通过 CSS `:active` 触发 |
| 焦点 | 通过 CSS `:focus-visible` 显示 |
| 禁用 | 使用原生 `disabled` |
| 加载 | `loading` 禁用按钮并设置 `aria-busy` |

加载中的可见提示由调用方通过 `children` 提供。应用可以使用原生 ARIA 属性 `aria-pressed` 来实现切换按钮语义。

## Behavior

- 默认渲染为 `type="button"`。可以传入其他原生类型，例如 `type="submit"`。
- 点击、Enter 和空格使用原生激活行为，并调用传入的 `onClick`。
- `disabled` 或 `loading` 会停用按钮。
- 外观由 Tahoe CSS 变量控制。可在 Tahoe 容器上设置 `data-appearance`，为该区域指定浅色或深色。

## Accessibility

- Headless UI 渲染具有原生语义的按钮，保留键盘激活。
- 禁用时使用原生 `disabled`。加载时同时提供 `aria-busy="true"`。
- 键盘焦点使用 CSS 焦点环。系统强制颜色模式下使用系统焦点描边。
- 图标按钮使用 `IconButton` 的必填 `label`，为按钮提供可访问名称与原生标题。装饰图标可标注 `aria-hidden`。
- 组件验收时继续核查对比度、焦点可见性与屏幕阅读器表现。

## API Reference

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `variant` | `'neutral' \| 'accent' \| 'destructive'` | `'neutral'` | 外观 |
| `size` | `'mini' \| 'small' \| 'regular' \| 'large' \| 'xl'` | `'regular'` | 尺寸 |
| `loading` | `boolean` | `false` | 停用按钮并设置忙碌状态 |
| `disabled` | `boolean` | `false` | 原生禁用 |
| `className` | `string` | `''` | 追加到基础类名 |
| `children` | `ReactNode` | — | 按钮内容 |
| `onClick` | 原生按钮事件处理器 | — | 点击事件 |
| `type` | 原生按钮类型 | `'button'` | 可由调用方覆盖 |
| 其他属性 | `ComponentProps<'button'>` | — | 转发原生按钮属性 |

`IconButton` 继承 `Button` 的属性，另外要求 `label: string`。

## Code Example

基础按钮：

```tsx
import { Button } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function SaveButton() {
  return (
    <div data-theme="tahoe">
      <Button variant="accent" onClick={() => console.log('已保存')}>保存</Button>
    </div>
  )
}
```

五档尺寸：

```tsx
import { Button } from '@macos-tahoe/ui'

const sizes = ['mini', 'small', 'regular', 'large', 'xl'] as const

export function ButtonSizes() {
  return (
    <div data-theme="tahoe" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {sizes.map((size) => <Button key={size} size={size}>{size}</Button>)}
    </div>
  )
}
```

三种变体：

```tsx
import { Button } from '@macos-tahoe/ui'

const variants = ['neutral', 'accent', 'destructive'] as const

export function ButtonVariants() {
  return (
    <div data-theme="tahoe" style={{ display: 'flex', gap: 8 }}>
      {variants.map((variant) => <Button key={variant} variant={variant}>{variant}</Button>)}
    </div>
  )
}
```

应用只需导入一次组件库样式。

## Design Specifications

| 类别 | 当前实现 |
| --- | --- |
| 几何 | 见五档尺寸表，宽度由内容决定 |
| 排印 | 项目字体栈 `--tahoe-font`，Mini 和 Small 各有独立字号 |
| 中性表面 | `--tahoe-control` |
| 前景 | `--tahoe-label` |
| 强调色 | `--tahoe-accent`、`--tahoe-on-accent` |
| 危险色 | `--tahoe-destructive`、`--tahoe-destructive-face` |
| 悬停、按下 | `--tahoe-button-hover`、`--tahoe-button-pressed` 及对应的强调色变量 |
| 禁用 | `--tahoe-disabled-face`、`--tahoe-disabled-label`、`--tahoe-accent-disabled` |
| 焦点 | `--tahoe-control-focus` 双层焦点环 |
| 边缘 | `--tahoe-control-rim` |
| 动效 | `--tahoe-control-transition`，支持减少动态效果偏好 |
| 材质 | CSS 表面与颜色近似 |

来源为现有组件代码、样式、[设计规范](/downloads/design.md)和 [Tahoe Tokens](#/tahoe/tokens)。几何与视觉处理参考第三方资料及项目网页实现。

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [项目 Button 实现](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/button.tsx)
- [项目样式与 Token](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/tahoe-tokens.css)
- [项目设计规范](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [第三方 macOS Components 参考](https://github.com/tamnguyenvan/macos-components)
