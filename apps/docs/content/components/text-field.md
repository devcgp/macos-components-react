# Text Field

> 组件：`TextField` · 分类：Selection and Input · 文档语言：简体中文\
> 文档路由：`#/desktop/text-field` · 源码：`packages/ui/src/components/AdditionalControls.tsx`\
> 样式基准：`packages/ui/src/styles/desktop-tokens.css` · 状态：与当前仓库实现一致（2026-11-17）

## Overview

Text Field 是 macOS 风格的**单行纯文本输入控件**，用于编辑文件名称、项目名称和其他短文本。它使用真实 HTML `<input type="text">`，并通过包裹式 `<label>` 提供可访问名称。`TextField` 是表单中的输入元素，而不是完整的验证表单或搜索组件。

**适用：**名称、标题、短备注、标签名称。**不适用：**多行内容（使用 TextArea）、专用搜索体验（使用 SearchField）、日期或数字的专用选择器。

**实现依据：**组件导出自 `AdditionalControls.tsx`；`type` 强制为 `text`；`label` 为必填字符串；其余继承原生 `input` 属性，但不允许覆盖 `type`。不要将项目建议误写为现有 Props。

## Anatomy

| 部位 | 源码 / 样式 | 作用 |
| --- | --- | --- |
| Label | `<label className="desktop-field-label">` | 文字与输入框的关联，点击文字可聚焦输入框 |
| Input | `<input type="text">` | 原生键盘输入、选择、剪贴板和表单行为 |
| Field surface | `.desktop-text-input.desktop-field-control` | 实色表面、单像素边框、圆角 |
| Placeholder | 原生 `placeholder` | 可选提示，不替代可访问名称 |
| Focus ring | `:focus` / `:focus-visible` | 键盘及聚焦状态可见反馈 |

默认采用紧凑的水平排列：文字标签与输入框间距由 `--desktop-gap` 定义，默认为 `8px`。实际宽度由容器或 `className` 控制，也可借助原生 `size` 属性指定字符宽度。

## Live Preview

本节由文档网站的 **真实 React + TypeScript 预览组件**渲染；Markdown 只提供卡片配置和验收规则，不直接包含可执行 JSX。

### 卡片配置

| 卡片名称 | Preview 内容 | 交互要点 |
| --- | --- | --- |
| **Text Field Basics** | 空值、Placeholder、默认值并排展示 | 可以输入、选择、删除文本；不同实例相互独立 |
| **Text Field States** | Default、Filled、Focused、Disabled、Read-only、Required | 焦点通过实际 Tab/点击获得；禁用不可编辑；只读可选择但不可编辑 |
| **Controlled Text Field** | `value`、`onChange` 和同步文本输出 | 输入后实时更新，Reset 还原示例值；不得用只读静态假输入框 |
| **Form & Validation** | 文本字段、提交按钮与反馈文本 | 原生 `required` + 应用层错误信息，验证行为与示例代码一致 |
| **Text Field in Settings** | 文件重命名 / 设置表单场景 | 展示与真实 Button、窗口或设置控件的组合，不新增虚构 TextField Props |

每张卡片统一具备两组**独立 Tab**：`Preview / Code` 和 `Light / Dark`。默认显示 Preview；Code 视图提供可复制的完整 TSX 代码。切换主题不得丢失当前输入内容、选择状态或切换标签；切换代码视图不重置预览。

*交互状态不是全部静态快照。Hover、Focus、Editing 必须通过真实操作验证。错误文本属于组合示例，TextField 当前没有 `error` 或 `invalid` 专用组件 Props。*

## Sizes

当前只有一种视觉规格（Regular）。原生数字属性 `size` 仍可透传给 HTML 输入框，用于指定字符宽度。

| 参数 | 当前 CSS 规格 | 依据 |
| --- | --- | --- |
| 高度 | `24px` | `--desktop-control-height` |
| 圆角 | `6px` | `--desktop-control-radius` |
| 左内边距 | `8px` | `.desktop-field-control.desktop-text-input` |
| 右内边距 | `4px` | `.desktop-field-control.desktop-text-input` |
| 边框 | `1px` | `--desktop-field-border` |
| 正文字号 | `13px` | `--desktop-regular-type` |
| 标签与输入间距 | `8px` | `--desktop-gap` |

以上为项目当前 CSS/Web 规范，不宣称直接测量自 Apple 官方 macOS 26 Figma 节点。不要为 Mini/Small/Large 创建假的组件变体。

## Variants

当前 TextField 没有 `variant` Prop。`placeholder`、`readOnly`、`disabled`、`required` 是内容或原生状态，**不是变体**。

- `type` 由组件固定为 `text`，不支持通过 Prop 切换为 `password`、`email`、`number` 或 `search`。
- 需要其他输入类型时，应单独设计合适组件，而非向现有 API 传递不存在的变体。

## States

| 状态 | 触发方式 | 当前行为 |
| --- | --- | --- |
| Empty | `value=""` / 无默认值 | 空文本框 |
| Placeholder | `placeholder` | 显示辅助提示，输入后消失 |
| Filled | `value` / `defaultValue` | 展示用户文本 |
| Focused | 点击或 Tab | 当前焦点样式使用 `--desktop-control-focus` |
| Disabled | `disabled` | 原生禁止编辑与聚焦，项目样式降低可见权重 |
| Read-only | `readOnly` | 不可编辑，但仍可聚焦及复制内容 |
| Required | `required` | 参与原生表单约束验证；组件不内建错误文案 |
| Invalid | 表单约束或应用状态 | 浏览器可提供原生验证；组件未内置自定义 `error` UI |

Hover 不保证单独的自定义边框变化；不要无依据将其写成已实现。IME 输入、剪贴板、撤销重做由浏览器处理。

## Behavior

- 单击输入框聚焦；单击关联标签也可聚焦。
- 输入、文本选择、复制粘贴、光标移动和 Home/End 等遵循原生 input 行为。
- 受控用法需传入 `value` 和 `onChange`；非受控用法使用 `defaultValue`。
- `onChange` 接收 React 事件对象，读取 `event.currentTarget.value`；**不是**直接传新字符串。
- `maxLength`、`minLength`、`required`、`autoComplete`、`name` 等按原生 HTML 语义传递。
- 组件不会自动提交表单、执行远端校验、显示清除按钮或联动保存。这些由使用方实现。
- 长文本框宽度和截断由容器、输入框自身属性及浏览器行为决定，禁止将未实现的自动扩展宽度作为默认功能。

## Accessibility

- 内部使用真实 `input type="text"`，保留浏览器键盘行为。
- 可见的 `label` 字符串与输入框通过包裹 `<label>` 关联。
- 通过 `aria-describedby` 可以关联外部帮助或错误信息；`aria-invalid` 可以标记应用层验证失败。
- 通过 `id`、`name` 支持表单关联与数据提交。
- Focus 必须在 Light/Dark 下可辨认；不要因自定义样式移除焦点提示。
- Placeholder 不可替代 label。
- 原生 `disabled` 与 `readOnly` 语义不同，预览必须分别测试。
- 在高对比度、缩放及键盘导航下验证文字和焦点的可读性。

## API Reference

公开签名（当前实现）：

```tsx
export function TextField(
  { label, className = '', ...props }:
  Omit<React.ComponentProps<'input'>, 'type'> & { label: string }
)
```

| 属性 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | `string` | 是 | — | 可见文本标签 |
| `className` | `string` | 否 | `''` | 添加到原生 input，不是外层 label |
| `value` | `string \| number \| readonly string[]`（React input 类型） | 否 | — | 受控输入值；此处用于单行文本 |
| `defaultValue` | 原生 input 类型 | 否 | — | 非受控初始值 |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | 否 | — | 原生 React 输入变更事件 |
| `placeholder` | `string` | 否 | — | 输入提示 |
| `size` | `number` | 否 | 浏览器默认 | HTML 字符宽度，组件仍使用 Regular 高度与圆角 |
| `disabled` | `boolean` | 否 | `false` | 禁用控件 |
| `readOnly` | `boolean` | 否 | `false` | 只读 |
| `required` | `boolean` | 否 | `false` | 必填约束 |
| `name` / `id` | `string` | 否 | — | 表单与可访问关联 |
| `autoComplete` / `maxLength` / `minLength` | 原生 input 类型 | 否 | — | 原生输入行为 |

`type` 被显式排除并固定为 `text`；`variant`、`loading`、`error`、`clearable` 均不是当前组件的专用 Props。

## Code Example

### 基础用法

```tsx
import { TextField } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function NameField() {
  return (
    <div data-theme="desktop">
      <TextField label="名称" placeholder="输入文件名" defaultValue="照片图库" />
    </div>
  )
}
```

### 受控输入

```tsx
import { useState } from 'react'
import { TextField } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function RenameField() {
  const [name, setName] = useState('Photos')
  return (
    <div data-theme="desktop">
      <TextField
        label="文件夹名称"
        name="folderName"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <output>当前名称：{name}</output>
    </div>
  )
}
```

### 原生必填与应用层错误信息

```tsx
import { useId, useState, type FormEvent } from 'react'
import { TextField } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function FolderForm() {
  const errorId = useId()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = name.trim()
    if (!next) { setError('请输入名称'); return }
    setError('')
  }
  return (
    <form data-theme="desktop" onSubmit={handleSubmit} noValidate>
      <TextField
        label="文件夹名称" name="folder" required
        value={name} onChange={(event) => { setName(event.currentTarget.value); setError('') }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId} role="alert">{error}</p>}
      <button type="submit">保存</button>
    </form>
  )
}
```

验证文字和 HTML 按钮属于演示应用层，不是 TextField 自带能力。生产代码应使用项目现有 Button 组件（如适用）。

## Design Specifications

### Desktop Design Tokens

| Token | 用途 |
| --- | --- |
| `--desktop-control-height` | 输入框高度，24px |
| `--desktop-control-radius` | 外轮廓圆角，6px |
| `--desktop-field-border` | 1px 轮廓线颜色 |
| `--desktop-content-surface` | 输入框背景 |
| `--desktop-label` | 输入文本及标签颜色 |
| `--desktop-text-secondary` | Placeholder 色 |
| `--desktop-regular-type` | 字体规格 |
| `--desktop-accent` / `--desktop-focus` | 聚焦强调色 |
| `--desktop-control-focus` | 双层 focus ring |
| `--desktop-control-transition` | 聚焦视觉变化的过渡时间 |

使用 `@cgpdesktopui/ui/styles.css`；将控件放入 `data-theme="desktop"` 容器。全站外观由根元素的 `.dark` 管理。Live Preview 默认跟随全站外观，每张卡片可通过 `data-appearance` 独立切换输入框与卡片的主题。

**来源等级：**布局与几何取自当前项目 Web CSS；24px / 6px 与第三方 Desktop 视觉规格对照。不是 Apple 官方 Figma 直接测量数据。

**设计审查重点：**输入框背景色、边框对比度、禁用可读性、focus ring、中文与英文标签长度、窄容器下的溢出处理。新增或调整 CSS 必须复用 Token，不建立新的硬编码配色体系。

## References

- [项目源码：TextField](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/AdditionalControls.tsx)
- [项目样式：Desktop Tokens](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/desktop-tokens.css)
- [项目设计规范](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [项目 Tokens 文档](https://github.com/devcgp/macos-components-react/blob/main/docs/tokens.md)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
