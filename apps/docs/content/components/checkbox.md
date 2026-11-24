# Checkbox

> 组件：`Checkbox`\
> 包：`@cgpdesktopui/ui`\
> 页面路由：`#/desktop/checkbox`
> 设计系统：**Desktop Design Tokens**（以仓库最新的 CSS Tokens 为准）

## Overview

Checkbox（复选框）用于开启或关闭一个**独立的选择项**，也适用于多选列表、表单偏好设置及批量操作。用户可以选择多个互不排斥的选项。

- 用于表达“选中 / 未选中”，而非立即执行命令。
- 需要强调一个设置即时生效时，可考虑 Switch；只能选择一个互斥选项时，使用 Radio Group。
- 本组件是参考 macOS 的 React Web 控件，不是 Apple 原生控件。

## Anatomy

当前实现包含：

1. **Label 容器**：原生 `<label>`，包裹复选框和文字，使点击文字也能切换状态。
2. **原生 Input**：`<input type="checkbox">`，负责表单语义、焦点、键盘和选中状态。
3. **Visual Box**：独立绘制的可见色盒；使用 Desktop Tokens 决定尺寸、圆角和颜色。
4. **Checkmark**：装饰性 SVG 对勾，选中时可见；标记为 `aria-hidden`。
5. **Label Text**：必需的 `label: string` 属性。

当前没有内置的 description、error-message、icon、size 或 variant 插槽/API。

## Live Preview

> **此节由文档网站的 React Preview 渲染器插入真实组件。** Markdown 仅记录卡片的内容要求，不以静态图片替代控件。

### 通用卡片结构

每一张卡片统一包含：

- 左上角：卡片标题。
- **Preview / Code** 切换 Tab。右上角的**浅色 / 深色**标签仅切换当前卡片。顶部的「外观」按钮切换全站主题。
- Preview：渲染 `@cgpdesktopui/ui` 实际导出的 `Checkbox`。
- Code：显示与本卡片真实示例对应的 React + TypeScript 代码，支持高亮及 **Copy Code**。

### Card 1 — Checkbox Selection

同屏展示 `Unchecked` 与 `Checked` 两种起始状态；两个真实复选框均可点击切换。使用 `defaultChecked` 展示非受控模式。Code 与显示内容一致。

### Card 2 — Checkbox States

展示并可验证：Default、Checked、Disabled（未选中）、Disabled + Checked。Hover、Pressed、Focus 必须通过实际鼠标或键盘交互检验；必要时额外提供**明确标记为视觉检查模式**的状态预览，不可将模拟状态说成用户交互。选中与禁用状态不得与可交互项混淆。

### Card 3 — Controlled Checkbox

展示使用 `useState`、`checked` 和 `onChange` 的受控示例；切换后同时显示当前布尔值。Code 包含完整、可编译的组件函数和 import。

### Card 4 — Checkbox Group / Form Example

展示同一表单中的多个相互独立的 Checkbox，使用有区别的标签。证明可以组合多个原生 checkbox；**不要声称存在已实现的 `CheckboxGroup` API**。Code 使用实际 `Checkbox` 组件组合。

**不创建 Sizes 或 Variants 预览卡片**：当前组件没有 `size`、`variant` Prop，只有一种默认视觉规格。

## Sizes

当前固定使用 Medium Desktop Tokens，没有公开的 `size` Prop。

| 项目 | 当前实现 |
| --- | --- |
| 视觉色盒 | `16 × 16 CSS px` |
| 圆角 | `5.5px` |
| 最小标签行高 | `24px` |
| 色盒和标签间距 | `8px` |
| 对勾 SVG 视觉宽 / 高 | `9.31px / 8.93px` |

这些为项目 CSS 中的实现数值，**不代表已经核实的 Apple 官方 Desktop 尺寸**。后续如需支持不同 Size，应先实现并验证组件，再更新文档。

## Variants

当前**没有 `variant` Prop**，只提供一套 Desktop 风格外观，随 Light / Dark Theme 及选中状态变化。`checked` 和 `disabled` 是状态，不是 Variant。

## States

| 状态 | 当前实现 / 说明 |
| --- | --- |
| Unchecked | 原生未勾选，显示中性色盒 |
| Checked | 原生 `checked`，显示强调色背景和对勾 |
| Hover | CSS 对可用且未选中的色盒设置悬停背景 |
| Pressed | CSS `:active` 反馈，选中和未选中有不同处理 |
| Focus | `:focus-visible` 时在视觉色盒上显示 Desktop 焦点环 |
| Disabled | 原生 `disabled`，组件整体降低透明度，无法操作 |
| Disabled + Checked | 禁用时保留选中值，不能交互 |
| Indeterminate | **未实现专用 React Prop 或内置视觉规范**；不作为已支持状态宣传 |

## Behavior

- 点击色盒或文字标签切换选中状态（未禁用时）。
- 聚焦原生 Input 后按 **Space** 切换选中；使用 **Tab / Shift+Tab** 导航焦点。
- 支持非受控 `defaultChecked`，也支持受控 `checked` + `onChange`。
- `onChange` 是 React 原生 `ChangeEvent<HTMLInputElement>` 处理器，读取 `event.currentTarget.checked`。
- `disabled` 禁止用户切换；可用 `name` 和 `value` 参与原生表单提交。未选中的 checkbox 不会作为普通表单值提交。
- Light / Dark 配色由 Desktop Design Tokens 与 Theme 容器管理，而不是组件的某个 Prop。

## Accessibility

- 保留真实 `<input type="checkbox">`；不在外层额外添加重复的 `role="checkbox"`。
- 文字位于包裹 Input 的 `<label>` 中，提供可访问名称并扩大可点击区域。
- 自定义视觉盒及对勾是装饰层；视觉盒含 `aria-hidden="true"`。
- 保留原生键盘、焦点、禁用和表单语义。
- Focus ring 由 `--desktop-control-focus` 定义；Forced Colors 模式存在针对原生输入的回退 CSS。
- 多个独立选项建议使用有意义的标签；是否需要 `<fieldset>` / `<legend>` 由调用方根据表单结构决定。
- 颜色对比度、焦点可见性和读屏体验需要通过实际测试验证，不能未经测试声称 WCAG 全面合规。

## API Reference

当前源码签名：

```tsx
import type { ComponentProps, JSX } from 'react'

declare function Checkbox(
  props: Omit<ComponentProps<'input'>, 'type'> & {
    label: string
  }
): JSX.Element
```

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `string` | 无（必填） | 可见标签，也是输入的可访问名称 |
| `checked` | `boolean` | 无 | 受控选中状态 |
| `defaultChecked` | `boolean` | 原生默认 `false` | 非受控初始状态 |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | 无 | 原生输入变更回调 |
| `disabled` | `boolean` | 原生默认 `false` | 禁止操作 |
| `name` | `string` | 无 | 表单字段名称 |
| `value` | `string \| number \| readonly string[]` 等原生输入类型 | 原生行为 | 提交表单的字段值 |
| 其他原生 Input Props | `Omit<ComponentProps<'input'>, 'type'>` | 依原生行为 | 如 `required`、`id`、`aria-*`、`data-*` |

**未实现的专用 API**：`size`、`variant`、`indeterminate`、`onCheckedChange`、`description`。`type` 固定为 `checkbox`。

## Code Example

### Basic / Uncontrolled

```tsx
import { Checkbox } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function BasicCheckbox() {
  return (
    <div data-theme="desktop">
      <Checkbox label="显示文件名" defaultChecked />
      <Checkbox label="显示文件扩展名" />
    </div>
  )
}
```

### Controlled

```tsx
import { useState } from 'react'
import { Checkbox } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function ControlledCheckbox() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div data-theme="desktop">
      <Checkbox
        label="显示文件名"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
      />
      <p>当前状态：{enabled ? '已选中' : '未选中'}</p>
    </div>
  )
}
```

### Disabled

```tsx
import { Checkbox } from '@cgpdesktopui/ui'

export function DisabledCheckboxes() {
  return (
    <div data-theme="desktop">
      <Checkbox label="不可选择" disabled />
      <Checkbox label="已选中且不可修改" defaultChecked disabled />
    </div>
  )
}
```

样式入口文件在应用中引入一次即可。以上代码使用已存在的 API；需在实际项目中运行 TypeScript 检查。

## Design Specifications

所有样式应从**当前 Desktop Design Tokens** 读取，不得在 Preview 组件中重复硬编码一套颜色和尺寸。

| 类别 | Token / 样式 | 当前用途 |
| --- | --- | --- |
| Checkbox Size | `--desktop-checkbox-size` | 视觉色盒 16px |
| Checkbox Radius | `--desktop-checkbox-radius` | 色盒圆角 5.5px |
| Checkmark | `--desktop-checkbox-mark-width`、`--desktop-checkbox-mark-height` | 对勾尺寸 |
| Neutral Surface | `--desktop-control` | 未选中背景 |
| Accent Color | `--desktop-accent` | 选中背景 |
| Text Color | `--desktop-label` | 标签文字 |
| Checkmark Color | `--desktop-on-accent` | 选中时对勾颜色 |
| Border / Rim | `--desktop-control-rim` | 色盒边缘 |
| Focus | `--desktop-control-focus` | 焦点环 |
| Hover | `--desktop-button-hover` | 未选中状态悬停反馈（当前实现复用） |
| Pressed | `--desktop-button-pressed`、`--desktop-accent-pressed` | 按下反馈 |
| Typography | `--desktop-type-body-regular-*` | 当前标签排印 |
| Layout | `--desktop-global-height`、`--desktop-gap` | 24px 最小行高、8px 间距 |

主题由 Desktop CSS 变量控制。根元素的 `.dark` 设置全局外观。预览卡片默认跟随全站主题，手动切换后使用卡片中选定的外观。

**来源分级**：Apple HIG 用于交互与可访问性原则；色盒 16px / 圆角 5.5px 来自项目采用的 Medium Desktop Tokens，亦有第三方测量参考，不能称作 Apple 已认证的 Desktop 精确规格。

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Checkbox 组件源码](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/checkbox.tsx)
- [Desktop Design Tokens / CSS](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/desktop-tokens.css)
- [项目设计规范](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [第三方 macOS Components 参考](https://github.com/tamnguyenvan/macos-components)

> 当 Checkbox 实际 API、视觉 Tokens 或交互发生变化时，应同步更新中文、英文文档和真实 Live Preview。
