# Switch

> macOS Components · 组件文档（中文）\
> 路由：`#/desktop/switch` · 对应英文：`switch.en.md`\
> 实现依据：`packages/ui/src/components/switch.tsx`、`packages/ui/src/styles/desktop-tokens.css`。以仓库实际代码与最新 Desktop Design Tokens 为准。

## Overview

Switch（开关）用于立即开启或关闭一项设置，例如显示文件名、通知或自动同步。它表达明确的 **On / Off** 状态；多个独立选项可各自使用 Switch。需要提交后统一生效的多项选择，通常更适合 Checkbox。

本项目 Switch 是基于原生 `input[type="checkbox"]` 的 React 组件，使用 `role="switch"` 表达开关语义。视觉采用 macOS 风格的轨道与滑块；这是 Web 实现，不应称作 Apple 官方原生控件。

## Anatomy

1. **Label**：必填文字 `label`，与原生输入处于同一 `<label>` 中。
2. **Input**：保留表单与键盘行为的原生 checkbox，声明 `role="switch"`。
3. **Track**：视觉轨道 `.desktop-switch-track`，由 CSS Tokens 控制。
4. **Thumb**：滑块 `.desktop-switch-thumb`，随选中状态移动。
5. **Focus Ring**：在键盘焦点状态下包围轨道的焦点指示器。

视觉轨道与滑块标记为 `aria-hidden="true"`，辅助技术以原生输入及标签为准。

## Live Preview

此章节由文档网站的 **真实 React Live Preview** 自动渲染，Markdown 不直接嵌入 JSX。每张预览卡片统一提供两组独立的 Tab：

- **Preview / Code**：实际可操作组件与对应可复制的 React + TypeScript 代码。
- **Light / Dark**：只切换当前卡片的主题；不改变整站主题，不重置预览中的开关状态。

第一阶段规划以下卡片：

| 卡片 | Preview 内容 | Code 内容 |
| --- | --- | --- |
| **Switch On / Off** | 同时展示默认 Off 与默认 On；均可点击切换 | `defaultChecked` 的非受控示例 |
| **Switch States** | Enabled Off、Enabled On、Disabled Off、Disabled On；焦点与按下通过真实交互测试 | `disabled` / `defaultChecked` 示例 |
| **Controlled Switch** | 开关与文本状态同步更新 | `checked` + `onChange` + `useState` |
| **Settings Example** | 多个独立开关的设置列表 | 真实的多个 `<Switch>` 使用示例 |

不新增虚构的 Size / Variant 卡片。Hover / Pressed / Focus 不应只靠静态视觉示意替代实际交互。若预览显示状态文字，它属于 Demo 容器，不属于 Switch 自身的 API。

## Sizes

当前 Switch **只有一种标准尺寸**，**没有 `size` Prop**。不可照搬 Button 的 Mini / Small / Regular / Large / XL。

| 部位 | 当前项目 CSS 尺寸 | Token / 依据 |
| --- | --- | --- |
| Track | 54 × 24 CSS px | `--desktop-switch-width`、`--desktop-switch-height` |
| Track Radius | 12 CSS px | `calc(var(--desktop-switch-height) / 2)` |
| Thumb | 32 × 20 CSS px | `--desktop-switch-thumb-width`；轨道高减去上下 2px 边距 |
| Thumb Inset | 2 CSS px | `--desktop-switch-inset` |
| Thumb Travel | 18 CSS px | 按现有轨道宽度、滑块宽度与内缩计算 |
| Label / Track Gap | 8 CSS px | 当前 `.desktop-switch` 规则 |
| Row Minimum Height | 24 CSS px | 当前 `.desktop-switch` 规则 |

以上为项目 CSS 与第三方尺寸参考，不代表 Apple 官方发布的 Desktop 测量规格。

## Variants

当前 Switch **没有 `variant` Prop**，只使用同一种 Desktop 视觉形式。Light / Dark 是主题，不是组件变体；On / Off 是交互状态，不是组件变体。

## States

| 状态 | 当前支持情况 | 行为与视觉 |
| --- | --- | --- |
| Off | 已实现 | 未选中，使用 `--desktop-switch-off` 轨道色 |
| On | 已实现 | 选中，轨道使用 `--desktop-accent`，滑块移至另一端 |
| Hover | 依赖浏览器的正常交互 | 不宣称存在独立 Hover 视觉样式；后续需核验，如需添加先修改组件 CSS |
| Pressed | 已有 CSS | 按住时轨道根据是否选中使用相应按下状态颜色 |
| Focus Visible | 已有 CSS | 键盘焦点显示 `--desktop-control-focus` |
| Disabled Off / On | 已实现 | 原生输入禁用；滑块透明度降低，无法切换 |
| Selected | 不适用 | 对 Switch 应称 `On / Off` 或 `Checked / Unchecked` |
| Loading / Indeterminate | 未实现 | 不显示为支持的 API |

## Behavior

- 点击轨道或关联标签可切换开关。
- 在控件获得焦点时按 **Space** 可切换；**Tab / Shift+Tab** 用于焦点导航。
- `checked` 配合 `onChange` 用于受控模式；`defaultChecked` 用于非受控初始值。
- `disabled` 阻止用户切换，同时保留原生禁用语义。
- 当前 Switch 不内置状态持久化、异步保存或 Loading 行为；这些由上层应用负责。
- 真实交互是否满足所有目标浏览器及触控设备，需通过测试验收。

## Accessibility

- 使用原生 `<input type="checkbox" role="switch">`；不另造无语义的点击 `div`。
- 必填 `label` 提供可访问名称；标签与输入原生关联。
- 原生控件提供 checked、disabled 状态及键盘操作。
- 自定义轨道和滑块设置 `aria-hidden="true"`，避免重复朗读。
- 焦点可视样式使用 `--desktop-control-focus`。
- 如显示附加帮助文字，需要由集成方建立合适的可访问关联；当前组件没有专门的 `description` Prop。
- 应检验屏幕阅读器、对比度、Forced Colors 和 Reduced Motion；未通过的测试不得宣称通过 WCAG。

## API Reference

实际导出：`Switch`。组件参数基于 `Omit<ComponentProps<'input'>, 'type' | 'role'> & { label: string }`。

| Prop | Type | 默认值 / 必填 | 描述 |
| --- | --- | --- | --- |
| `label` | `string` | **必填** | 开关的可见及可访问标签 |
| `checked` | `boolean` | 可选 | 受控状态，需由调用方更新 |
| `defaultChecked` | `boolean` | 可选 | 非受控初始状态 |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | 可选 | 原生输入变化事件，读取 `event.currentTarget.checked` |
| `disabled` | `boolean` | 可选 | 禁用输入 |
| `name` | `string` | 可选 | 原生表单字段名 |
| `value` | `string` 等原生输入类型 | 可选 | 原生表单值，不是开关的 On/Off 状态 |
| 其他原生 input Props | 依 React `ComponentProps<'input'>` | 可选 | 由组件转发，`type` 与 `role` 除外 |

**内部固定值**：`type="checkbox"`、`role="switch"`，不能作为公开 Props 修改。组件当前不提供 `size`、`variant`、`loading`、`onCheckedChange` 等定制 API。未在源码显式指定的默认值不应写成组件自定义默认值。

## Code Example

以下代码与当前组件公开 API 对应。项目的样式入口为 `@cgpdesktopui/ui/styles.css`，主题容器为 `data-theme="desktop"`。

### 非受控开关

```tsx
import { Switch } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function SimpleSwitch() {
  return (
    <div data-theme="desktop">
      <Switch label="显示文件名" defaultChecked />
    </div>
  )
}
```

### 受控开关

```tsx
import { useState } from 'react'
import { Switch } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div data-theme="desktop">
      <Switch
        label="同步收藏"
        checked={enabled}
        onChange={(event) => setEnabled(event.currentTarget.checked)}
      />
      <p>状态：{enabled ? '开启' : '关闭'}</p>
    </div>
  )
}
```

### 禁用状态

```tsx
<Switch label="禁用的开关" disabled defaultChecked />
```

以上简短禁用示例需放在已导入 `Switch` 的 TSX 文件与 Desktop 主题上下文中。

## Design Specifications

优先复用现有 Desktop Design Tokens，而非重复硬编码颜色、尺寸与阴影。

| 类别 | Token | 用途 |
| --- | --- | --- |
| Geometry | `--desktop-switch-width` | 轨道宽度：54px |
| Geometry | `--desktop-switch-height` | 轨道高度：24px |
| Geometry | `--desktop-switch-thumb-width` | 滑块宽度：32px |
| Geometry | `--desktop-switch-inset` | 滑块内缩：2px |
| Color | `--desktop-switch-off` | 关闭轨道背景；Light / Dark 不同 |
| Color | `--desktop-accent` | 开启轨道背景 |
| Color | `--desktop-switch-thumb-color` | 滑块背景；Light / Dark 不同 |
| Surface | `--desktop-switch-rim` | 轨道边缘 |
| Shadow | `--desktop-switch-thumb-shadow` | 滑块阴影 |
| State | `--desktop-button-pressed` / `--desktop-accent-pressed` | 按下轨道色 |
| Focus | `--desktop-control-focus` | 可见焦点环 |
| Motion | `--desktop-control-transition` | 滑块位移过渡；减少动态偏好下为 0ms |
| Typography | `--desktop-regular-type`、`--desktop-label` | 开关标签排印与颜色 |

主题约定：组件置于 `[data-theme="desktop"]` 下；深色主题通过祖先 `.dark` 生效。若文档卡片需要局部 Dark 模式，确保 `.dark` 作用范围隔离在该卡片内，同时不能破坏现有主题规则。当前组件的 HTML / CSS 并非原生 macOS 系统 Switch。

## References

- [项目 Switch 源码](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/switch.tsx)
- [项目 Desktop Design Tokens](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/desktop-tokens.css)
- [项目 Design 规范](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Apple Human Interface Guidelines — Switches](https://developer.apple.com/design/human-interface-guidelines/switches)（平台交互参考；不能据此宣称 CSS 像素尺寸为官方值）
- [第三方 macOS Components](https://github.com/tamnguyenvan/macos-components)（仓库中注明的第三方视觉尺寸参考）

> 状态：Phase 1 文档。Live Preview 由 React 实现；实际仓库实现及最新 CSS Tokens 优先于过时的文案。后续可继续补全更细致的视觉测量和可访问性验收记录。
