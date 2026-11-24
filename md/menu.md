# Menu / Dropdown Menu — 组件设计规范（中文版）

> 组件：`DropdownMenu` · 文档路由：`#/desktop/dropdown-menu`（以网站现有路由映射为准） · 组件实现：`packages/ui/src/components/navigation.tsx` · 样式：`packages/ui/src/styles/desktop-tokens.css`\
> 状态：基于当前仓库已实现能力；设计目标为 macOS 风格的 Web 近似实现，不等同于 Apple 原生菜单。本文保持 12 个统一章节，Live Preview 由 React 渲染，Markdown 负责说明。

## 01. Overview

Menu 用于将与当前任务或对象有关的多条**离散命令**收纳在触发按钮下，减少常驻操作占用的空间。当前组件的公开名称为 `DropdownMenu`，由 Headless UI 的 `Menu`、`MenuButton`、`MenuItems` 和 `MenuItem` 实现，使用真实按钮与可访问的菜单交互。

**适用场景**：文件操作、图片处理、视图相关命令、工具栏的次级操作。不建议用作需要保持多个选中项的多选筛选器；当前 API 不支持复选菜单项、单选菜单项和层级子菜单。

**与 Context Menu 的区别**：`DropdownMenu` 由常规触发按钮激活，菜单在按钮下方左对齐；`ContextMenu` 可响应右键，但当前也锚定触发器，不按鼠标坐标定位。两个组件当前共用 `MenuAction` 数据结构及菜单样式。

## 02. Anatomy

| 部分 | 当前实现 | 职责 |
|---|---|---|
| Trigger | `MenuButton.desktop-menu-trigger` | 展示 `label`，点击或键盘激活菜单 |
| Menu Surface | `MenuItems.desktop-menu` | 承载菜单项，`anchor="bottom start"` |
| Menu Item | `MenuItem` 内的 `button` | 执行对应 `onSelect` |
| Disabled Item | `MenuItem disabled` + `button disabled` | 阻止执行，不应作为可用命令 |
| Focus / Active | Headless UI 焦点状态 + CSS `[data-focus]` | 指示键盘导航位置 |

当前组件**没有**公开的图标、分隔线、快捷键文本、子菜单、选中态或自定义触发器插槽。`MenuActions` 是文件内部辅助函数，不是独立公开组件。

## 03. Live Preview

此章节由文档站点 React 实际渲染，不在 Markdown 中重复静态按钮或图片。建议以下四张功能性卡片：

| Preview Card | 展示内容 | 关键验证 |
|---|---|---|
| **Menu Basics** | `File` 菜单，包括 Open、Rename、Duplicate | 真实触发、选择执行、菜单关闭、操作结果反馈 |
| **Menu States** | Enabled / Disabled Actions；展示活动项与焦点 | 禁用项不可执行，焦点可见 |
| **Keyboard Interaction** | 键盘打开并以方向键选择；Enter/Space 执行，Escape 关闭 | 焦点管理、关闭后焦点返回、不会触发其他业务动作 |
| **Menu in Toolbar** | 在 Desktop Toolbar 或 Window 中放置 `DropdownMenu` | 弹层不被裁剪，响应宽度变化，主题一致 |

**每张卡片的统一结构**：卡片标题；`Light / Dark`（只影响当前卡片及其浮层）；`Preview / Code`；TSX 代码高亮与 Copy Code。Preview 默认显示，代码应与实际卡片一致并能独立复制使用。实例数据应为本地示例，不操作真实文件。

**主题隔离**：Light / Dark 预览应覆盖 Headless UI 浮层（可能经 Portal 渲染），不能仅给触发器加 `.dark`。请沿用仓库现有主题方案并核查浮层 CSS 变量的作用域；不得改变整个文档网站主题。卡片独立维护 Theme 与 Preview/Code 状态。

## 04. Sizes

当前 `DropdownMenu` **没有** `size` Prop，不能为其虚构 Mini、Small、Large 等尺寸 API。实际几何由已有 Desktop CSS 定义：

| 元素 | 当前实现 |
|---|---|
| Trigger 最小高度 | `--desktop-control-height`（目前 24px） |
| Trigger 最小宽度 | 84px（CSS） |
| Menu 最小宽度 | 132px（CSS） |
| Menu 内边距 | 4px |
| Menu Item 最小高度 | 24px |
| Menu 圆角 | 10px |
| Menu Item 圆角 | 5px |

上述数值属于**仓库当前 Web 设计实现**，不宣称是经 Apple macOS UI Kit 官方节点实测的规格。

## 05. Variants

目前没有 `variant` Prop，也没有公开的 `primary`、`destructive`、`checkbox`、`radio`、`submenu` 等菜单变体。普通命令与禁用命令通过各 Action 的 `disabled` 区分。

如果未来确需危险命令视觉语义，应先提出 API 与可访问性设计，再在组件与文档同步实现；不要只在预览里绘制一个虚构的红色菜单项。

## 06. States

| 状态 | 支持情况 | 实际表现 |
|---|---|---|
| Closed | 已实现 | 默认不显示菜单面板 |
| Open | 已实现 | 菜单从按钮下方展开 |
| Focused / Active Item | 已实现 | 由 Headless UI 管理，`[data-focus]` 高亮 |
| Pressed Trigger | 已实现 | 触发器 `[data-open]` 的视觉变化 |
| Enabled Action | 已实现 | 可激活并调用 `onSelect` |
| Disabled Action | 已实现 | 菜单项不可激活 |
| Loading | 未实现 | 无 Loading Prop |
| Checked / Selected Action | 未实现 | 无选择状态 API |

Hover、Focus、Open 必须在真实交互中验证，不能通过永久附加示意 class 冒充逻辑支持。

## 07. Behavior

- 通过点击触发器或其可访问的键盘操作打开菜单。
- 菜单定位为 `bottom start`，相对于触发器，不是任意屏幕坐标。
- 通过鼠标或键盘选择可用命令，调用该 Action 的 `onSelect()`。
- 通过 Escape 关闭菜单，焦点恢复遵循 Headless UI 的管理机制；应在实际浏览器中验证。
- 禁用项 `disabled: true` 不执行命令。
- 点击菜单外部时，菜单的关闭由 Headless UI 管理。
- `onSelect` 是调用方的实际业务回调；库本身不提供文件操作、通知、Undo 或数据保存。

菜单命令应使用动词明确描述操作（例如 Open、Rename、Duplicate）。涉及破坏性行为时，确认或撤销机制由业务层负责。

## 08. Accessibility

- 复用 Headless UI 提供的 Menu 语义与焦点管理，不手工伪造 ARIA Menu。
- 触发器 `label` 是可见文本，应准确描述菜单用途。
- 菜单项使用原生 `button`；禁用命令需保持 `disabled` 语义。
- 逐项验证：Tab 到触发器，Enter/Space 打开，上下方向键导航，Enter 激活，Escape 关闭及焦点返回。
- 确认 Light / Dark、聚焦、禁用状态下仍能辨别文字与高亮。
- 不以颜色作为唯一状态提示。
- Portal / 浮层不应遮蔽焦点、被父容器 `overflow: hidden` 裁剪，或丢失主题变量。

## 09. API Reference

```ts
export type MenuAction = {
  id: string
  label: string
  disabled?: boolean
  onSelect: () => void
}

export function DropdownMenu(props: {
  label: string
  actions: MenuAction[]
}): JSX.Element
```

| Prop | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `label` | `string` | 是 | — | 触发器的可见文本 |
| `actions` | `MenuAction[]` | 是 | — | 菜单命令数组，按给定顺序展示 |
| `actions[].id` | `string` | 是 | — | React Key / 项目标识，建议唯一 |
| `actions[].label` | `string` | 是 | — | 命令名称 |
| `actions[].onSelect` | `() => void` | 是 | — | 执行命令 |
| `actions[].disabled` | `boolean` | 否 | `undefined` | 禁用该命令 |

没有 `size`、`variant`、`open`、`onOpenChange`、`icon`、`shortcut`、`separator`、`children` 等公开 Props。以上函数返回类型为说明性 TS 表达，实际以源码导出的推断类型为准。

## 10. Code Example

### 简单命令菜单

```tsx
import { DropdownMenu, type MenuAction } from '@cgpdesktopui/ui'

export function FileMenuExample() {
  const actions: MenuAction[] = [
    { id: 'open', label: '打开', onSelect: () => console.info('open') },
    { id: 'rename', label: '重命名', onSelect: () => console.info('rename') },
    { id: 'delete', label: '删除', disabled: true, onSelect: () => console.info('delete') },
  ]

  return (
    <div data-theme="desktop">
      <DropdownMenu label="文件" actions={actions} />
    </div>
  )
}
```

### 与工具栏组合

```tsx
import { DropdownMenu, Toolbar } from '@cgpdesktopui/ui'

export function PhotoToolbarExample() {
  return (
    <div data-theme="desktop">
      <Toolbar
        title="照片"
        actions={
          <DropdownMenu
            label="更多操作"
            actions={[
              { id: 'duplicate', label: '复制', onSelect: () => console.info('duplicate') },
              { id: 'export', label: '导出', onSelect: () => console.info('export') },
            ]}
          />
        }
      />
    </div>
  )
}
```

示例中的 `console.info` 仅代表调用方回调。实际项目请替换为业务逻辑；如果应用需要同时获得可视化反馈，Live Preview 可在卡片中显示“Last action”文本。

## 11. Design Specifications

### Desktop Tokens 与 CSS 映射

| 设计用途 | 现有 Token / 样式 | 来源级别 |
|---|---|---|
| 触发器高度 | `--desktop-control-height` | 项目 CSS |
| 触发器背景 | `--desktop-control` | 现有语义 Token |
| 文本 | `--desktop-label` | 现有语义 Token |
| 菜单背景 | `--desktop-menu` | 现有语义 Token |
| 菜单描边 | `--desktop-menu-rim` | 现有语义 Token |
| 菜单阴影 | `--desktop-menu-shadow` | 现有语义 Token |
| 焦点/活动高亮 | `--desktop-focus` | 现有语义 Token |
| 主题强调色 | `--desktop-accent` | 现有语义 Token |
| 文字排版 | `--desktop-font`、`--desktop-body` | 现有语义 Token |

现有样式使用 `backdrop-filter: blur(24px)` 作为网页材质近似效果。浮层浅深色通过主题规则变化；不创建单独的硬编码配色体系。若完善颜色、间距、透明度或菜单高度，应优先更新共享 CSS Token，并进行跨组件回归检查。

### 视觉验收

- 同一菜单在 Light / Dark 均保持可读。
- 浮层与触发器的视觉层级明确；边缘、背景与阴影遵循已有 Desktop CSS。
- 菜单项点击热区不小于当前设计规范；高亮与禁用区别清晰。
- 窄容器场景下，菜单不因父级裁剪而不可见。
- 不引入 Apple 原生系统菜单或声称官方逐像素还原。

## 12. References

- 实现：[`packages/ui/src/components/navigation.tsx`](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/navigation.tsx)
- 样式：[`packages/ui/src/styles/desktop-tokens.css`](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/desktop-tokens.css)
- 项目规范：`docs/design.md`、`docs/tokens.md`
- [Headless UI — Menu](https://headlessui.com/react/menu)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

> 文档维护原则：组件 API、Live Preview、代码示例与 CSS Tokens 必须保持同步。新增能力必须先实际实现并验证，再标记为“已支持”。
