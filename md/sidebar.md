# Sidebar（侧边栏）

> 项目：macOS Tahoe Components  
> 组件：`Sidebar`  
> 文档状态：Phase 1 · 已核对仓库当前源码；设计与交互规范可持续完善  
> 页面路由：`#/tahoe/sidebar`  
> 源文件：`packages/ui/src/components/sidebar.tsx`  
> 设计源：`packages/ui/src/styles/tahoe-tokens.css`  
> 说明：以下“已实现”根据当前仓库源码；“建议改进”不是现有 API。

## Overview

Sidebar 用于在 macOS 风格的桌面 Web 应用中组织分组导航，例如照片图库、文件夹、收藏集和设置类别。它在主内容区域之外提供稳定的导航上下文，通过分组标题展开或折叠下级项目，并高亮当前项目。当前实现为**受控导航组件**，不直接管理业务路由或内容页面。

适用：窗口侧栏、媒体管理、文件目录、分组导航。不适用：需要复杂树形多层级、拖放排序或移动端抽屉的场景；这些行为并未内置。

## Anatomy

当前组件的真实结构：

1. **Navigation (`nav.tahoe-sidebar`)**：侧边栏导航容器，当前固定 `aria-label="图库目录"`。
2. **Group (`.tahoe-sidebar-group`)**：一组项目。
3. **Group Heading (`button.tahoe-sidebar-heading`)**：点击展开/折叠，对应 `aria-expanded`。
4. **Disclosure Chevron**：`ChevronRight` 箭头；展开时旋转 90°，装饰性 `aria-hidden`。
5. **Item List (`ul > li`)**：分组展开时渲染。
6. **Navigation Item (`button.tahoe-sidebar-row`)**：点击触发 `onSelect(item.id)`。
7. **Optional Icon (`.tahoe-sidebar-icon`)**：可选 `ReactNode`，仅作为装饰性图标（`aria-hidden`）。
8. **Item Label (`.tahoe-sidebar-label`)**：条目标题，宽度不足时省略号截断。
9. **Current Selection**：当 `item.id === selected` 时，设置 `aria-current="true"` 和选中背景。

当前没有搜索、拖动调整宽度、右键菜单、嵌套子分组或全局收起 Sidebar 的内置功能。

## Live Preview

由文档网站的 React 组件自动插入，不在 Markdown 中直接运行 JSX。每张卡片均使用真实 `Sidebar`，具备 **Preview / Code**、**Light / Dark** 两组互不干扰的 Tab，以及可复制的 React + TypeScript 示例。代码应能重现当前 Preview 体验。

建议的四张卡片：

| 卡片 | Preview 目标 | 核心交互 |
| --- | --- | --- |
| **Sidebar Navigation** | 多组目录、图标、当前项及右侧内容关联 | 点击条目切换当前项；右侧同步显示所选标题 |
| **Sidebar Groups** | 两个以上分组，呈现展开与折叠 | 点击组标题独立展开/折叠；显示箭头与 `aria-expanded` |
| **Sidebar States** | Current / Hover / Pressed / Focus / Expanded / Collapsed | 通过真实鼠标与键盘操作检查；不能假装存在独立 `disabled` 状态 |
| **Sidebar in Window** | Sidebar 与窗口内容并排，观察尺寸与适配 | 独立主题切换；窄宽度下验证现有容器布局，不添加虚构响应式 API |

**约束：**不为 Sidebar 添加虚构的 `size`、`variant`、`collapsedWidth`、`resizable` 等 Props。Preview 中的窗口和右侧内容只是**示例组合**，不是 Sidebar 内置元素。

## Sizes

当前 `Sidebar` **没有 `size` Prop**。下列值属于项目 CSS 布局规范，不是可选择的组件 Size Variant。

| 项目 | 当前值 | 来源 |
| --- | --- | --- |
| 默认侧栏宽度 Token | `220px` | `--tahoe-sidebar-width`，由父窗口布局使用 |
| 导航项目最小行高 | `28px` | `--tahoe-sidebar-row-height` |
| 导航行圆角 | `5px` | `--tahoe-sidebar-row-radius` |
| 侧栏内边距 / 行水平内边距 | `8px` | `--tahoe-sidebar-inset` |
| 分组间距 | `16px` | `--tahoe-sidebar-group-gap` |
| 图标占位宽度 | `16px` | `.tahoe-sidebar-icon` |
| 分组标题最小高度 | `16px` | `.tahoe-sidebar-heading` |
| 分组标题与项目间距 | `4px` | `.tahoe-sidebar-heading` |

`220px` 是用于窗口示例的布局默认值；独立 `Sidebar` 本身没有固定 `width` Prop。

## Variants

目前 **没有 `variant` Prop**。展示差异来自内容结构与主题，而非公开变体 API：带图标 / 不带图标、单组 / 多组、Light / Dark（主题切换）。不得将这些内容示例当作新的组件变体。

## States

| 状态 | 已实现方式 | 说明 |
| --- | --- | --- |
| Default | 默认导航条目 | 未选中时显示正常外观 |
| Hover | `.tahoe-sidebar-row:hover` | 使用 `--tahoe-fills-tertiary` |
| Pressed | `.tahoe-sidebar-row:active` | 使用 `--tahoe-fills-primary` |
| Focus | `.tahoe-sidebar-row:focus-visible` | `2px` 强调色焦点描边，偏移 `-2px` |
| Current / Selected | `aria-current="true"` | 由 `selected` 匹配项目 ID 决定，使用 `--tahoe-selection` |
| Expanded | `aria-expanded="true"` | 分组内容显示，箭头旋转 |
| Collapsed | `aria-expanded="false"` | 分组内容不渲染 |
| Disabled | **未实现 / N/A** | 当前没有 `disabled` Prop 或禁用项目数据结构 |
| Loading | **未实现 / N/A** | 当前无载入状态 |

Hover、Pressed、Focus 为交互伪类；在 Live Preview 中优先通过真实操作验证，而非展示无法触发的假状态。

## Behavior

- **选择项目**：点击项目按钮调用 `onSelect(item.id)`；父组件更新 `selected` 后视觉选中项改变。`Sidebar` 本身不执行页面跳转。
- **折叠分组**：点击组标题调用 `onToggle(group.id)`；父组件更新 `collapsed: string[]` 后展开/隐藏该分组条目。
- **默认状态**：由调用方提供 `selected` 和 `collapsed`；内部没有自动默认选择或独立状态。
- **键盘**：项目与组标题均为原生 `<button type="button">`，可通过 Tab 导航、Enter/Space 激活。没有树控件模式的上下方向键管理或 roving tabindex。
- **图标**：可选 `ReactNode`；应当传入装饰性图标，真实容器会 `aria-hidden`。
- **同名/冲突 ID**：调用方应保证每个组及条目的 ID 稳定，条目在导航内唯一，以便 `selected` 正确匹配。

## Accessibility

**当前实现：**

- 使用语义化 `nav`、`button`、`ul`、`li`。
- 组标题提供 `aria-expanded`；选中项目提供 `aria-current="true"`。
- Chevron 和项目装饰图标通过 `aria-hidden` 隐藏。
- 原生按钮支持 Tab、Enter 和 Space；焦点样式通过 `:focus-visible` 呈现。
- **已知限制：**`nav` 的 `aria-label` 被写死为中文“图库目录”；当前没有可覆盖此标签的公开 Prop。面向英文页面时需后续修复（例如新增可选 `ariaLabel` / `label`，但必须先实际实现并验证后再写入 API）。
- **注意：**`aria-current="true"` 标识当前项；若未来确定是页面导航，可评估 `aria-current="page"`，但当前代码不是此值。

## API Reference

来自 `packages/ui/src/components/sidebar.tsx`，全部参数均为必填：

| Prop | Type | Required | 说明 |
| --- | --- | --- | --- |
| `groups` | `SidebarGroup[]` | Yes | 渲染分组与项目 |
| `selected` | `string` | Yes | 当前项目 ID |
| `collapsed` | `string[]` | Yes | 已折叠的分组 ID 列表 |
| `onSelect` | `(id: string) => void` | Yes | 选择导航项时调用 |
| `onToggle` | `(id: string) => void` | Yes | 点击分组标题时调用 |

结构类型（当前在模块内部定义，**未单独 export**）：

```ts
type SidebarItem = {
  id: string
  label: string
  icon?: React.ReactNode
}

type SidebarGroup = {
  id: string
  label: string
  items: SidebarItem[]
}
```

**不支持的公开 API：**`size`、`variant`、`defaultSelected`、`defaultCollapsed`、`disabled`、`ariaLabel`、`resizable`、`onResize`、`children`、`className`、`ref`。不能在用法示例中使用。

## Code Example

以下为可在现有组件包环境使用的受控示例（示例数据及右侧内容由调用方提供）：

```tsx
import { useState } from 'react'
import { Folder, Star } from 'lucide-react'
import { Sidebar } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

const groups = [
  {
    id: 'library',
    label: '图库',
    items: [
      { id: 'all', label: '所有照片', icon: <Folder size={16} /> },
      { id: 'favorites', label: '收藏', icon: <Star size={16} /> },
    ],
  },
  {
    id: 'albums',
    label: '相册',
    items: [{ id: 'travel', label: '旅行' }],
  },
]

export function SidebarExample() {
  const [selected, setSelected] = useState('all')
  const [collapsed, setCollapsed] = useState<string[]>([])

  function toggleGroup(id: string) {
    setCollapsed(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id],
    )
  }

  return (
    <div data-theme="tahoe" style={{ display: 'flex', minHeight: 240 }}>
      <div style={{ width: 220, flexShrink: 0 }}>
        <Sidebar
          groups={groups}
          selected={selected}
          collapsed={collapsed}
          onSelect={setSelected}
          onToggle={toggleGroup}
        />
      </div>
      <main style={{ padding: 16, flex: 1 }}>
        当前项目：{selected}
      </main>
    </div>
  )
}
```

说明：示例用的 `style={{ width: 220 }}` 只是应用布局容器，不是 Sidebar Prop。示例图标来自 `lucide-react`，请确保使用方安装该包或替换为自己的 `ReactNode` 图标。

## Design Specifications

**Geometry**

- 侧栏内缩 `--tahoe-sidebar-inset`；行高 `--tahoe-sidebar-row-height`；圆角 `--tahoe-sidebar-row-radius`；组间距 `--tahoe-sidebar-group-gap`。
- 默认窗口侧栏宽度由 `--tahoe-sidebar-width` 和父布局控制。

**Typography**

- 主要文字使用 `--tahoe-font`、`--tahoe-body`；分组标题使用 `--tahoe-caption`，字重 600。

**Color**

- 文字 `--tahoe-label`；次要组标题 `--tahoe-text-secondary`。
- 侧栏表面 `--tahoe-sidebar-surface`；分隔线 `--tahoe-separator`。
- 图标与焦点 `--tahoe-accent`；当前项 `--tahoe-selection`。
- Hover `--tahoe-fills-tertiary`；Pressed `--tahoe-fills-primary`。

**Material / Theme**

- Light / Dark 通过项目现有 `data-theme="tahoe"` 与 `.dark` 主题上下文确定，不能通过不存在的 `Sidebar theme` Prop 切换。
- `--tahoe-sidebar-surface` 使用 Vibrant Fills 语义色；此处为 Web 实现，不应宣传为 Apple 官方原生材质参数。
- 本组件尺寸及外观属于项目 Web 设计规范/第三方参考，不是已验证的 Apple Tahoe 26 官方逐像素尺寸。

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [第三方 macOS Components 参考](https://github.com/tamnguyenvan/macos-components)
- 项目源码：`packages/ui/src/components/sidebar.tsx`
- 项目样式：`packages/ui/src/styles/tahoe-tokens.css`
- 项目规范：`docs/design.md`、`docs/tokens.md`

> 文档维护原则：任何新增 API（如可配置的导航 accessible name、键盘方向键支持或可调整侧栏宽度）应在源码实现、类型检查和交互测试通过后，再更新本文件与英文版。
