# Context Menu｜上下文菜单

> macOS Tahoe Components · Component Documentation  
> 路由：`#/tahoe/context-menu`  
> 源码：`packages/ui/src/components/navigation.tsx`  
> 样式：`packages/ui/src/styles/tahoe-tokens.css`  
> 来源声明：当前仓库实现与 Tahoe Design Tokens；不是 Apple 官方 Tahoe 26 像素级复刻。

## 1. Overview

Context Menu（上下文菜单）提供与当前对象有关的操作，适用于文件、照片、列表等界面。当前组件基于 `@headlessui/react` 的 `Menu` 体系，复用 `DropdownMenu` 的菜单项呈现。

**现有行为：** 在菜单触发按钮上右键时阻止浏览器原生菜单，并在尚未打开时模拟点击，打开锚定在**触发按钮下方左侧**的菜单。普通点击、键盘激活按钮也能打开同一菜单。**不支持**根据鼠标坐标定位的真正原位右键菜单，也不支持对任意子元素右键触发。

建议用在明确的对象操作入口。不要把它当成系统级 Finder Context Menu；Web 版本的行为以浏览器、Headless UI 与现有组件实现为准。

## 2. Anatomy

| 部位 | 当前实现 | 说明 |
| --- | --- | --- |
| Root | Headless UI `Menu` | 管理菜单打开/关闭状态 |
| Trigger | `MenuButton.tahoe-menu-trigger` | 可见按钮，支持点击和右键 |
| Context handler | `onContextMenu` | `preventDefault()`；在关闭时调用按钮 `.click()` |
| Panel | `MenuItems.tahoe-menu` | `anchor="bottom start"`，非光标定位 |
| Item | `MenuItem` + `button` | 每项调用 `onSelect()` |
| Label | `action.label` | 文本命令名称 |
| Disabled item | `MenuItem disabled` 与原生 `button disabled` | 不可选、不可激活 |

当前 `MenuAction` 为 `{ id: string; label: string; disabled?: boolean; onSelect: () => void }`。现有组件没有图标、分组、分隔符、快捷键提示或子菜单的数据结构。

## 3. Live Preview

Live Preview 由文档站点的共享 React 预览卡片实现，本 Markdown 只记录预览需求，不嵌入重复的演示 JSX。

每张卡片包含两组**独立的 Tab**：`Preview / Code` 与 `Light / Dark`。默认 Preview；主题只作用于本卡的预览容器，弹出菜单（可能通过 portal 渲染）必须同步卡片主题。Code 显示可复制、可运行的 React + TypeScript 用例，不展示虚构的组件能力。

| Card | 展示内容 | 必须验证 |
| --- | --- | --- |
| Context Menu Basics | 单一对象触发器、打开/重命名/信息等真实命令 | 点击和右键均能打开；选择后操作反馈准确 |
| Context Menu States | 默认、菜单打开、当前焦点项、Disabled action | 禁用项不可执行；Esc 可关闭；Focus 可见 |
| Object Actions | 文件/照片对象的动作菜单与当前选中对象的反馈 | 示例层保留对象状态，操作只更新示例数据 |
| Keyboard Interaction | Tab 聚焦触发器、Enter/Space、上下方向键、Enter 与 Escape | 使用 Headless UI 的真实键盘语义，焦点返回正确 |
| Context Menu in Window | 放进 `Window` / `SplitView` 等真实上下文；窄容器测试 | 不被裁切，菜单浮层有正确层级；不把按钮锚定误称为光标定位 |

所有预览卡片须提供 Copy Code，代码和当前卡片的交互一致。Light / Dark 不改变整页主题，也不重置 Preview/Code 选项或业务状态。

## 4. Sizes

当前 `ContextMenu` **没有 `size` Prop**。菜单项 CSS 使用 `min-height: 24px`，菜单容器 `min-width: 132px`、`padding: 4px`、`border-radius: 10px`。触发器采用共享 `.tahoe-menu-trigger`，其 `min-width: 84px`、`min-height: 24px`。这些是现有 Web 实现规格，不表示已支持 Mini/Small/Large 变体。

## 5. Variants

当前 **没有 `variant` Prop**。Light / Dark 是主题维度；菜单项可以有正常/禁用状态，但不是 variant。暂不宣称支持危险红色命令、分组菜单、图标菜单或嵌套子菜单。

## 6. States

| 状态 | 实现 | 预期 |
| --- | --- | --- |
| Closed | Headless UI Menu 关闭 | 面板不显示 |
| Open | 触发按钮激活 | 显示锚定到按钮的面板 |
| Focused item | Headless UI `data-focus` | 使用 `--tahoe-focus` 显示背景 |
| Hovered item | Headless UI 菜单交互 | 聚焦/悬停反馈由底层库和 CSS 管理 |
| Disabled item | `disabled: true` | 不可选择、不调用回调 |
| Selected / Executed | 调用 `onSelect()` | 执行结果由调用方提供；组件没有选中持久态 |
| Dismissed | Escape / 外部点击 | 遵循 Headless UI 的关闭行为 |

未提供 `loading`、`checked`、`destructive`、`submenu` 等状态或配置接口。

## 7. Behavior

- **触发**：单击按钮可打开；在按钮上右键会阻止浏览器默认右键菜单，当菜单关闭时调用按钮的 click 打开它。
- **锚定**：`anchor="bottom start"`，依附触发器，不读取鼠标坐标。重新右键已打开的触发器并不会按当前代码主动关闭或重新定位菜单。
- **执行**：激活菜单项时调用对应 `onSelect`。示例可使用提示文字或本地对象更新演示结果，不能调用未实现的真实文件操作。
- **关闭**：键盘 Escape、外部交互及菜单项选择行为依赖 Headless UI；应在浏览器中验证。
- **焦点**：由 Headless UI 管理键盘导航和焦点返回；不要附加第二套独立的键盘菜单机制。
- **边界**：菜单定位与剪裁需在窄视口、页面滚动和 Window 容器中测试；与系统原生上下文菜单存在差异。

## 8. Accessibility

- `MenuButton` 为原生按钮语义；触发器 `label` 应明确说明对象或操作，例如“照片操作”。
- `MenuItem` / `MenuItems` 由 Headless UI 提供菜单语义和键盘导航；验证 Tab、Enter、Space、方向键及 Escape。
- `disabled` 同时应用于 Headless UI `MenuItem` 与原生按钮。
- 用 `data-focus` 和主题焦点色保证当前键盘项的可见反馈。
- 对用户可见的执行结果使用适当状态反馈；异步动作、错误和危险操作确认由调用方负责。
- 右键不是唯一打开路径；触发器必须能够通过键盘打开。

## 9. API Reference

### `ContextMenu`

```ts
type MenuAction = {
  id: string
  label: string
  disabled?: boolean
  onSelect: () => void
}

type ContextMenuProps = {
  label: string
  actions: MenuAction[]
}
```

| Prop | Type | Required | Default | 说明 |
| --- | --- | --- | --- | --- |
| `label` | `string` | Yes | — | 触发器文本 |
| `actions` | `MenuAction[]` | Yes | — | 菜单命令列表 |
| `actions[].id` | `string` | Yes | — | 列表稳定 key |
| `actions[].label` | `string` | Yes | — | 菜单项文本 |
| `actions[].onSelect` | `() => void` | Yes | — | 菜单项触发回调 |
| `actions[].disabled` | `boolean` | No | `undefined` | 禁用项目 |

`MenuAction` 已从 `navigation.tsx` 导出；`ContextMenu` 通过组件库根入口导出。当前 API 不提供可配置触发目标、坐标、`open/onOpenChange`、`placement`、icon、separator 或 nested actions。

## 10. Code Example

### 基础对象操作（真实 API）

```tsx
import { useState } from 'react'
import { ContextMenu } from '@macos-tahoe/ui'

export function PhotoContextActions() {
  const [message, setMessage] = useState('尚未执行操作')

  return (
    <div data-theme="tahoe">
      <ContextMenu
        label="照片操作"
        actions={[
          { id: 'open', label: '打开', onSelect: () => setMessage('已选择打开') },
          { id: 'info', label: '显示简介', onSelect: () => setMessage('已选择显示简介') },
          { id: 'rename', label: '重命名（不可用）', disabled: true, onSelect: () => setMessage('不应执行') },
        ]}
      />
      <p role="status">{message}</p>
    </div>
  )
}
```

在应用入口全局导入 `@macos-tahoe/ui/styles.css`。示例的状态反馈属于调用方逻辑，不是 `ContextMenu` 的内置 Props。

## 11. Design Specifications

| 属性 | 当前值 / Token | 来源等级 |
| --- | --- | --- |
| Trigger minimum height | `--tahoe-control-height`（24px） | Project-defined Web Approximation |
| Trigger minimum width | 84px | Project-defined Web Approximation |
| Menu minimum width | 132px | Project-defined Web Approximation |
| Menu padding | 4px | Project-defined Web Approximation |
| Menu corner radius | 10px | Project-defined Web Approximation |
| Menu item min height | 24px | Project-defined Web Approximation |
| Menu item radius | 5px | Project-defined Web Approximation |
| Menu surface | `--tahoe-menu` | Tahoe token / Web implementation |
| Menu border/rim | `--tahoe-menu-rim` | Tahoe token / Web implementation |
| Shadow | `--tahoe-menu-shadow` | Tahoe token / Web implementation |
| Focus fill | `--tahoe-focus` | Tahoe semantic token |
| Text | `--tahoe-label` | Tahoe semantic token |

使用 `data-theme="tahoe"` 容器与项目现有 `.dark` 主题机制。**Portal 的主题传递须单独验证**：不能仅在卡片内部增加 `.dark` 就假定浮层会自动继承；必要时通过项目现有主题方案将主题映射到 MenuItems，而不是全局切换 `.dark`。优先复用 Tokens，不另建硬编码深浅色。

菜单 CSS 的原始数字是当前实现值，不应声称经过 Apple Tahoe UI Kit 官方节点测量。若开发引入新的菜单交互或尺寸 Token，必须同步更新本章节及英文文档。

## 12. References

- [Component source](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/navigation.tsx)
- [Tahoe Tokens source](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/tahoe-tokens.css)
- [Project design guidelines](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Headless UI Menu](https://headlessui.com/react/menu)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

**未来增强（尚未实现）：** 将触发区域与按钮解耦，支持坐标定位、右键位置贴合、快捷键标签、图标、危险操作、分隔线及多级菜单。必须先制定 API/可访问性/主题适配，再将其纳入正式文档。
