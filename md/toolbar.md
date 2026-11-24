# Toolbar｜工具栏

> 组件：`Toolbar` · 分类：Window & Navigation · 状态：已有实现，文档与预览待集成  
> 源码：`packages/ui/src/components/toolbar.tsx`  
> 样式：`packages/ui/src/styles/desktop-tokens.css`\
> 建议文档路径：`apps/docs/content/components/toolbar.md`  
> 页面：`#/desktop/toolbar`

## Overview

Toolbar 用于在应用窗口、文件浏览器或内容视图顶部组织**标题、辅助说明、筛选控件、操作控件和搜索控件**。它是一个**布局容器**，而不是带有内置搜索逻辑或操作按钮的完整业务工具栏。

典型使用场景：图片/文件管理、图库浏览、列表筛选、视图切换、常用操作入口。避免把大量无关操作塞入工具栏；控件名称与顺序应清晰且可预期。

当前实现使用语义化 `<header>`，并将 `filters`、`actions` 和 `search` 作为 ReactNode 插槽。只有传入实际子组件时才会提供交互；Toolbar 不生成这些功能。

## Anatomy

1. **Container**：`.desktop-toolbar`，水平布局，空间不足时允许换行。
2. **Title area**：`.desktop-toolbar-title`，必填 `title`，可选 `detail`（辅助说明）。
3. **Filters group**：可选 `filters` 插槽，使用 `role="group"` 包装。
4. **Actions group**：可选 `actions` 插槽，使用 `role="group"` 包装。
5. **Search slot**：可选 `search` 插槽，直接渲染传入的 ReactNode。

> 当前源码中筛选和操作分组的 `aria-label` 分别硬编码为“筛选”和“显示操作”。在英文文档场景下应由 Codex 核查国际化方案后改进，不能声称当前支持自定义分组名称。

## Live Preview

<!-- React 文档渲染器在此插入 Toolbar 的真实 Live Preview 卡片；Markdown 不存储交互 JSX。 -->

统一卡片结构：顶部标题与 `Light / Dark` Tab；内容区 `Preview / Code` Tab；`Code` 面板包含真实 TSX 代码、语法高亮和 `Copy Code`。两个 Tab 相互独立；主题切换仅影响当前卡片预览区域。

| 卡片 | 应展示的内容 | 预览要求 |
| --- | --- | --- |
| **01 · Toolbar Composition** | 仅标题；标题 + `detail`；包含 `filters`、`actions`、`search` 的完整工具栏 | 三种组合同时显示，区分必填项和可选插槽 |
| **02 · Filters & Actions** | 视图切换按钮、排序/筛选操作、普通/禁用操作 | 使用真实按钮或已有控件；选中状态由示例 React state 管理，不归 Toolbar 管理 |
| **03 · Search Slot** | 无搜索、带搜索、搜索输入交互 | 输入内容可编辑，示例页面可用本地数据过滤；不虚构 Toolbar 自带搜索 API |
| **04 · Responsive Layout** | 宽、中、窄容器 | 可调整预览容器宽度；验证换行和内容可达性，不假设系统自带溢出菜单 |
| **05 · Toolbar in Window** | Toolbar 与 Window / Sidebar / 内容区域组合 | 使用仓库现有实际组件；检验层级、背景、分隔线以及主题 |

不必创建 Sizes / Variants 卡片：Toolbar 目前没有 `size`、`variant` 属性。所有 Code 面板必须与卡片中的真实示例一致，不显示无效 props。

## Sizes

Toolbar 没有公开 `size` 属性。下列数值是**现有网站 CSS 布局规则**，不是通过 Props 切换的尺寸，也不是经 Apple 官方 Desktop 节点验证的尺寸。

| 指标 | 当前实现 | 来源 |
| --- | --- | --- |
| Toolbar 最小高度 | `52px` | `--desktop-toolbar-height`，CSS |
| 上下 / 左右内边距 | `8px / 12px` | `.desktop-toolbar`，CSS |
| 主布局元素间距 | `8px` | `.desktop-toolbar`，CSS |
| Controls 间距 | `6px` | `.desktop-toolbar-controls`，CSS |
| Group 内间距 | `2px` | `.desktop-toolbar-group`，CSS |
| 搜索区域建议宽度 | `150px`，最大 `100%` | `--desktop-toolbar-search-width`，CSS |
| 普通工具栏图标按钮示例宽度 | `24px` | `.desktop-toolbar-group .desktop-button`，CSS |

容器宽度由父布局决定；`flex-wrap: wrap` 在空间不足时允许控件转行。`min-height` 不是固定高度。

## Variants

目前没有 `variant` 属性，也没有内置 Compact / Expanded / Glass 等外观变体。

可通过提供不同插槽组合表达不同用途，例如基本标题栏、包含筛选与操作的工具栏、搜索工具栏。它们是**Composition 示例**，而非 Toolbar API 的 Variants。

主题和材质由 Desktop Design Tokens 与父容器决定；不要为示例自行添加未实现的 `material` 或 `theme` 属性。

## States

Toolbar 是布局组件，没有自有的 `selected`、`disabled`、`loading`、`open` 等状态。

| 状态 | 所属对象 | 当前实现 |
| --- | --- | --- |
| 默认布局 | Toolbar | 标题与传入插槽正常排布 |
| 窄容器 / 换行 | Toolbar CSS | `flex-wrap: wrap` |
| Hover / Pressed / Focus | 插槽中的 Button、Search 等 | 由子控件负责 |
| Selected / Active | 插槽中的交互控件或示例状态 | 不属于 Toolbar 本身 |
| Disabled | 子控件 | 由各组件自身 `disabled` 支持 |
| Light / Dark | 文档的主题容器 | CSS Token 驱动，非 Toolbar Prop |

交互预览不可使用静态“伪按钮”模拟可点击状态。

## Behavior

- `title` 始终渲染到 `<strong>`；`detail` 存在时渲染到 `<small>`。
- `filters`、`actions` 为真值时分别渲染一个带 `role="group"` 的容器。
- `search` 直接渲染，不附加默认搜索框、过滤器或搜索事件。
- 通过 Flex 布局自适应宽度，并允许标题区与控制区换行。
- 插槽子控件保留各自的鼠标事件、键盘行为和状态。
- 不提供自动隐藏、自动溢出、响应式汉堡菜单、工具栏拖动、系统窗口控制或原生 macOS Toolbar 能力。

## Accessibility

- 顶层 `<header>` 为语义容器；若文档中存在多个 header，应在整体页面语义中检查地标区分与名称。
- `filters` / `actions` 当前使用 `role="group"`，但其中文可访问标签是硬编码值，应在多语言支持时处理。
- 带图标但无可见文字的按钮必须由子组件提供 `aria-label` 或等价可访问名称。
- 搜索框必须有可访问名称（`label` 或 `aria-label`）；仅使用 `placeholder` 不够。
- Tab 顺序、Enter / Space 激活与焦点可见性由插入的原生可访问子控件提供。
- 窄容器和高放大倍率下，应保持焦点、操作和搜索功能可见、可用。
- 不要因为视觉组合将 `<header>` 自行改成 `role="toolbar"`；若确需 WAI-ARIA toolbar 模式，必须另外实现并验证其键盘模型。

## API Reference

当前源码的公开签名：

```tsx
import type { ReactNode } from 'react'

type ToolbarProps = {
  title: string
  detail?: ReactNode
  filters?: ReactNode
  actions?: ReactNode
  search?: ReactNode
}
```

| Prop | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | 无 | 主标题 |
| `detail` | `ReactNode` | 否 | 不渲染 | 副标题 / 辅助说明 |
| `filters` | `ReactNode` | 否 | 不渲染 | 筛选控件插槽 |
| `actions` | `ReactNode` | 否 | 不渲染 | 操作控件插槽 |
| `search` | `ReactNode` | 否 | 不渲染 | 搜索区插槽 |

当前组件不提供 `onSearch`、`onFilterChange`、`onAction`、`size`、`variant`、`theme` 等专用 Props。回调应由子组件自行处理。

## Code Example

### 最小示例

```tsx
import { Toolbar } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function SimpleToolbar() {
  return (
    <div data-theme="desktop">
      <Toolbar title="照片" detail="3 张照片" />
    </div>
  )
}
```

### 带操作及真实搜索输入的示例

```tsx
import { useState } from 'react'
import { Button, Toolbar } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export function GalleryToolbar() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div data-theme="desktop">
      <Toolbar
        title="图库"
        detail={`当前视图：${view}`}
        filters={
          <>
            <Button aria-pressed={view === 'grid'} onClick={() => setView('grid')}>网格</Button>
            <Button aria-pressed={view === 'list'} onClick={() => setView('list')}>列表</Button>
          </>
        }
        actions={<Button onClick={() => window.alert('导入操作示例')}>导入</Button>}
        search={
          <input
            className="desktop-toolbar-search"
            aria-label="搜索照片"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        }
      />
      <p>搜索内容：{query || '全部'}</p>
    </div>
  )
}
```

> 示例中的 `window.alert` 仅为消费端示例动作；真实应用应替换为导入流程。`desktop-toolbar-search` 是布局宽度类，并不自动创建完整的 Search Field 外观。若使用仓库现有搜索组件，先核对其真实 API。

## Design Specifications

**来源等级：Project-defined Web Approximation。** 下列是当前仓库的实现值，不能直接称为 Apple 官方 macOS 的精确规格。

| Token / 选择器 | 作用 |
| --- | --- |
| `--desktop-toolbar-height` | 52px 最小工具栏高度 |
| `--desktop-toolbar-search-width` | 150px 搜索区参考宽度 |
| `--desktop-toolbar-surface` | 工具栏背景，默认继承窗口表面 |
| `--desktop-separator` | 底部分隔线颜色 |
| `--desktop-label` | 默认文本颜色 |
| `--desktop-text-secondary` | `detail` 文字颜色 |
| `--desktop-accent` | 子控件焦点 / 强调色 |
| `--desktop-fills-tertiary` | 组合按钮 Hover 表面 |
| `--desktop-fills-primary` | 组合按钮选中表面 |
| `--desktop-font`、`--desktop-body` | 组件继承字体规则 |
| `.desktop-toolbar` | Flex 布局、内边距、最小高度、分隔线 |
| `.desktop-toolbar-group` | 控件组及组内间距 |
| `.desktop-toolbar-search` | 搜索插槽推荐宽度约束 |

遵循项目现有 `.dark` + `[data-theme="desktop"]` 的主题机制；Live Preview 若独立切换主题，需要验证 CSS 选择器确实能在卡片局部生效，不能修改整个站点主题或将颜色硬编码在卡片中。

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Toolbar 源码](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/toolbar.tsx)
- [Desktop Design Tokens](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/desktop-tokens.css)
- [Design 文档](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Tokens 文档](https://github.com/devcgp/macos-components-react/blob/main/docs/tokens.md)

> Apple HIG 为平台设计指导；具体的 52px、150px 与各 CSS 距离属于本项目网页实现，不代表 Apple 官方认证尺寸。
