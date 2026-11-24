# Segmented Control｜分段控制器

> 组件：`SegmentedControl` · macOS Tahoe Components  
> 文档状态：基于当前仓库源码核对；Live Preview 为实施要求，尚不代表已验收  
> 对应文件：`packages/ui/src/components/controls.tsx`  
> 建议路由：`#/tahoe/segmented-control`

## 1. Overview

Segmented Control（分段控制器）用于在**少量互斥选项**中切换当前选择，例如网格/列表视图、内容筛选模式或设置面板。任一时刻至多选择一个选项。当前组件采用受控 React 模式，选择状态由父组件管理。

适用于同一上下文内的视图或模式切换；不要将它误用为多选控件。切换是否改变路由、列表内容或其他业务状态，由调用方负责；组件本身不含路由、数据筛选或内容管理逻辑。

## 2. Anatomy

1. **Container**：`.tahoe-segments`，包含整个分段组。
2. **Segment**：每个选项由一个 `<label>` 包裹原生 `input[type="radio"]` 与视觉文字 `<span>`。
3. **Selected segment**：由 `checked={value === option}` 控制的单选项。
4. **Focus indicator**：焦点可视化施加于对应视觉 `span`。
5. **Accessible group name**：父容器使用 `role="radiogroup"` 与 `aria-label={label}`。

当前 `options` 是 `string[]`，显示文案与提交值是同一字符串，不支持独立的 `{value,label}` 对象、图标插槽或每项禁用属性。

## 3. Live Preview

在文档中以真实 React `SegmentedControl` 渲染 **多张 Live Preview 卡片**，按下列顺序展示：

| 卡片 | 展示内容 | 必须验证 |
| --- | --- | --- |
| **Basic Selection** | `Grid / List` 两选项；点击后下方状态/内容同步 | `value`、`onChange` 真实生效 |
| **Option Counts** | 2、3、4 个选项的独立受控示例 | 全部选项可切换；无需 Size/Variant API |
| **Selection & Keyboard** | 当前选中状态、Tab 焦点、方向键在 radio 组内移动 | 原生 radio 键盘行为、可见焦点 |
| **Practical Example** | `All / Photos / Videos` 视图筛选，使用演示数据 | 真实 React 状态联动，而非静态示意 |

**所有卡片统一结构：**标题位于左侧；右侧为 `Light / Dark` Tab；卡片内容提供独立的 `Preview / Code` Tab。`Preview` 是默认页，`Code` 提供对应完整 TSX 示例、语法高亮与 `Copy Code` 按钮。切换 Tab 不应意外清除当前示例选择；复制的代码应可通过项目 TypeScript 检查。

主题必须使用当前 Tahoe 变量和正确的 `.dark` 祖先作用域。只添加 `data-theme="dark"` 不属于现有主题机制，不得将其当作有效实现。

Live Preview 由文档站 React 渲染；本 Markdown 定义内容与验收标准，不包含假冒真实组件的静态 HTML 预览。

## 4. Sizes

当前组件**没有 `size` Prop**，只支持一套默认几何规格；不要创建 Mini/Small/Regular/Large 的虚构切换项。

| 属性 | 当前实现 | 来源 |
| --- | --- | --- |
| 外框最小高度 | 24px | `--tahoe-control-height` 在项目设计规范中；当前 `.tahoe-segments` 直接声明 `min-height: 24px` |
| 外框圆角 | 6px | `.tahoe-segments` |
| 外框内边距 | 2px | `.tahoe-segments` |
| 分段间距 | 1px | `.tahoe-segments` |
| 分段圆角 | 4px | `.tahoe-segments span` |
| 分段水平内边距 | 10px | `.tahoe-segments span` |

可通过选项文案自然决定宽度；组件当前没有内置全宽均分 Prop。

## 5. Variants

当前组件**没有 `variant` Prop**。`Light` 与 `Dark` 是文档预览的主题环境，不是 SegmentedControl 的 Variant；两选项/三选项仅为不同内容配置，也不是变体。

## 6. States

| 状态 | 当前实现/行为 |
| --- | --- |
| Unselected | 未选中单选项显示未激活外观 |
| Selected | `input:checked + span` 使用强调色背景 |
| Focus-visible | `input:focus-visible + span` 显示强调色轮廓 |
| Hover / Pressed | 原生输入可响应指针；当前 CSS 未提供独立分段 Hover/Pressed 视觉规则，不得宣称已有专项样式 |
| Disabled | 组件不公开禁用 Prop，也未为每项提供 `disabled`；不得做成已支持的状态 |
| Loading | 未实现 |

## 7. Behavior

- 控件是**受控组件**：父级传入 `value`，并在 `onChange(nextValue)` 中更新状态。
- 选择任一项时，对应 radio 的 `onChange` 调用父组件回调，传入该项的字符串。
- 同组 radio 使用相同 `name`，避免与页面其他独立单选组共用 `name`。
- 默认通过点击分段标签改变选择；Tab、方向键、空格键等由原生 radio 行为支持，需在目标浏览器实际验证。
- 传入不属于 `options` 的 `value` 时，可能没有选中分段；调用方应保证初值有效。
- `options` 应是稳定、互不重复的非空字符串集合；当前实现以 option 字符串为 React `key`。

## 8. Accessibility

- `role="radiogroup"` + `aria-label={label}` 提供组名。
- 采用真实 `input[type="radio"]`，保留原生可访问单选语义。
- 每个 radio 的文字由外层 `<label>` 与视觉 `<span>` 关联。
- `:focus-visible` 必须清晰可见，并在 Light/Dark 下测试。
- 预览卡片自身的 `Preview / Code` 和 `Light / Dark` Tabs 也应满足键盘访问；其状态不得污染被展示控件的 radio `name`。
- 当前不支持单项禁用、图标专用项和额外辅助说明；如需扩展，先修改公共 API 与测试，再更新文档。

## 9. API Reference

```ts
type SegmentedControlProps = {
  label: string
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
}
```

| Prop | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `label` | `string` | 是 | radio 组可访问名称 |
| `name` | `string` | 是 | 同组 radio 的表单名称 |
| `value` | `string` | 是 | 当前选中选项 |
| `options` | `string[]` | 是 | 字符串选项列表 |
| `onChange` | `(value: string) => void` | 是 | 选项发生变更时回调 |

当前无 `defaultValue`、`size`、`variant`、`disabled`、`options: {label,value}[]` 等 API；也没有默认 Props 值。

## 10. Code Example

以下示例基于当前导出及 API，展示完整可控的 React + TypeScript 用法：

```tsx
import { useState } from 'react'
import { SegmentedControl } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

const views = ['Grid', 'List']

export function ViewSwitcher() {
  const [view, setView] = useState('Grid')

  return (
    <div data-theme="tahoe">
      <SegmentedControl
        label="View layout"
        name="view-layout"
        options={views}
        value={view}
        onChange={setView}
      />
      <p>Current view: {view}</p>
    </div>
  )
}
```

深色主题由项目约定的 `.dark` 祖先控制，不能通过 `SegmentedControl` 的不存在的 `theme` Prop 设置。

## 11. Design Specifications

**Tahoe Design Tokens 为单一来源**：遵循 `packages/ui/src/styles/tahoe-tokens.css` 和 `docs/tokens.md`，不复制第二套硬编码配色。

| 视觉角色 | 当前样式/Token |
| --- | --- |
| 背景 | `--tahoe-control` |
| 已选分段背景 | `--tahoe-accent` |
| 选中分段文字 | 当前 CSS 为 `#111`，属于已有实现，建议后续评审深浅色对比度；修改前不得擅称已用语义文字 Token |
| 焦点边框 | `--tahoe-accent`，2px，outline-offset 2px |
| 主题范围 | `[data-theme="tahoe"]` 及 `.dark` 祖先 |
| 字体 | 继承项目 Tahoe 字体系统 |

**来源等级**：24px 外框及 6px 圆角属于仓库网页实现/项目参考规范，不应描述为 Apple 官方 Tahoe 26 精确认证尺寸。

实现改进应优先复用现有 Token；如需新增专用语义 Token，须同步 Token 定义、组件 CSS、中英文文档和视觉验证。

## 12. References

- 实现源码：`packages/ui/src/components/controls.tsx`
- CSS：`packages/ui/src/styles/tahoe-tokens.css`
- 总规范：`docs/design.md`
- Tokens：`docs/tokens.md`
- 目录：`apps/docs/src/app/catalog.ts`
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [MDN — radio input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)

> 待办：完成实际 Live Preview、跨浏览器键盘验收和色彩对比度检查后，更新本页状态；不要提前标注“已验收”。
