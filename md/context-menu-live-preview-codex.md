# Codex 实施提示词｜Context Menu + Live Preview

## 任务目标

在现有 `devcgp/macos-components-react` React + TypeScript 仓库内，依据以下文档完成 **Context Menu 的现有功能核查、必要修正，以及文档站点的真实 Live Preview**：

- `apps/docs/content/components/context-menu.md`
- `apps/docs/content/components/context-menu.en.md`
- `packages/ui/src/components/navigation.tsx`
- `packages/ui/src/styles/tahoe-tokens.css`
- `docs/design.md`
- `docs/tokens.md`

先检查仓库当前状态，**不要创建与已有 `ContextMenu` 重复的组件**。不要为了展示效果制造不存在的 API。

## 1. 源码事实与边界（必须遵守）

现有 API：

```ts
export type MenuAction = {
  id: string
  label: string
  disabled?: boolean
  onSelect: () => void
}

ContextMenu({ label, actions }: {
  label: string
  actions: MenuAction[]
})
```

现有实现复用 Headless UI `Menu`、`MenuButton`、`MenuItems`、`MenuItem`；通过触发按钮的 `onContextMenu` 阻止默认菜单并在未打开时 `.click()`；菜单仍使用 `anchor="bottom start"`，**不是**光标坐标定位。

本轮不引入或伪造 `trigger`、`children`、`position`、`placement`、`open`、`onOpenChange`、`icon`、`shortcut`、`separator`、`submenu`、`variant`、`size`、`loading` 等 Props。若实测源码已有更新，先依据最新实现修正文档及预览约束。

## 2. 页面文档结构

使用已有路由 `#/tahoe/context-menu`。保留 12 个统一 Section 顺序：

1. Overview
2. Anatomy
3. Live Preview
4. Sizes
5. Variants
6. States
7. Behavior
8. Accessibility
9. API Reference
10. Code Example
11. Design Specifications
12. References

中文读取 `context-menu.md`，英文读取 `context-menu.en.md`。继续复用现有 `ComponentDocPage`、`ComponentPreview`、文档解析和目录架构。Markdown 负责描述，React 负责交互；不要在 Markdown 重复插入静态假预览。

## 3. 统一 Live Preview Card

所有卡片必须复用现有共享预览系统，不能单独复制一个外观不同的新卡片。

- 卡片标题在左上；右上 `Light / Dark` 切换。
- 卡片内容提供 `Preview / Code` 两个 Tab，默认 Preview。
- 两组 Tab 彼此独立。切换 Preview/Code 保留 Light/Dark，切换主题不重置菜单业务状态。
- Light/Dark 只作用于当前卡片的预览区域，包括 **Headless UI 通过 portal 渲染的 MenuItems**；不得通过修改页面根 `.dark` 使整个站点切换。
- Code 提供真正可运行的 TSX、真实 Import、调用方的 `useState`/action handlers；按钮 Copy Code 复制可直接使用的代码。
- 用户可以用鼠标和键盘操作真实组件，绝不使用图片或伪装按钮模拟菜单。

## 4. 本组件的 Live Preview 卡片

**Card 1 — Context Menu Basics**

展示一个 `ContextMenu`，带 Open、Get Info、Rename 等示例命令。普通点击与右键按钮均能打开菜单；执行菜单项后更新组件外部的状态提示。操作必须真实影响本地演示状态，而不是伪造操作成功的消息。

**Card 2 — Context Menu States**

展示默认、已打开、键盘焦点项和 disabled action；禁用项不可执行。可以通过真实 hover/focus 展示状态，不允许将视觉截图、CSS 静态类标为真实键盘状态。

**Card 3 — Object Actions**

创建少量静态本地照片/文件记录，并为选中记录提供操作菜单。命令更新本地名称、详情或列表排序等示例数据。注意：目前 `ContextMenu` 仍只有按钮触发器；**不得声明对文件缩略图任意区域右键就会打开菜单**，除非另行实现并同步记录为新增 API（本任务不要求）。

**Card 4 — Keyboard Interaction**

真实测试 Tab 到触发器、Enter/Space 打开、箭头键移动、Enter 执行、Escape 关闭、焦点返回。尽量复用 Headless UI 自带行为，不制造第二套菜单管理状态机。

**Card 5 — Context Menu in Window**

将真实 `ContextMenu` 放入现有 `Window`、`SplitView` 或列表场景，验证弹层 z-index、portal、窄视口、滚动、窗口边界，确保不被父容器裁切，Light/Dark 正确。展示的菜单按按钮锚定，不标为鼠标原位菜单。

## 5. Tahoe Design Tokens

复用现有 CSS/Token：

- `--tahoe-control-height`
- `--tahoe-menu`
- `--tahoe-menu-rim`
- `--tahoe-menu-shadow`
- `--tahoe-label`
- `--tahoe-focus`
- `--tahoe-accent`

现有 `MenuItems` 参考：min-width 132px、padding 4px、radius 10px；menu item min-height 24px、radius 5px；触发器 min-width 84px、min-height 24px。不得以固定十六进制颜色替代上述语义 Token。当前仓库如果有新的 Token 定义，以实际源码为准并同步中英文文档。

## 6. 可访问性与主题隔离

- 原生触发按钮可用键盘激活；不要求用户必须右键。
- Disabled 项必须完全不可执行。
- 当前菜单项具有可见焦点提示；关闭后焦点恢复合理。
- 确保每个示例的触发器 label 具体且有意义。
- 如果 Headless UI 的 MenuItems portal 离开卡片 DOM 树，设计可扩展的**卡片级主题上下文 / portal class / token scope**。不要通过全局加 `.dark` 解决一个卡片的主题问题；不要让其他卡片受到影响。
- 所有视觉样式遵循 Tahoe Tokens，平台语义参考 HIG，但不要宣称 Apple 官方像素级认证。

## 7. 实施顺序

1. 核查现有源码、类型和菜单样式、已存在文档路由及共用 Preview Card。
2. 接入双语 Markdown，保留统一 Section 结构。
3. 实现 Card 1，再复用架构完成 Card 2–5。
4. 检查 portal 的独立主题问题；必要时修复基础 Preview Card 或菜单容器的样式作用域。
5. 对实际实现与中英文文档同步检查，不一致时如实修复。
6. 执行 typecheck、build、实际交互/主题/复制代码验收。

## 8. 验收清单

- [ ] `#/tahoe/context-menu` 正常访问，所有 12 个 Section 完整。
- [ ] 中英文内容可切换且 API、设计数值保持一致。
- [ ] 五张 Live Preview 卡片均使用真正的 `ContextMenu`。
- [ ] Preview/Code、Light/Dark 两组 Tab 独立工作。
- [ ] Code 是可复制、可 Typecheck 的 React + TypeScript。
- [ ] 普通点击、右键、Enter/Space、方向键、Escape 可正确工作。
- [ ] disabled action 无法执行。
- [ ] 每张卡片的 Light/Dark 和菜单浮层主题一致，不污染其他卡片和整页。
- [ ] 未虚构指针定位、子菜单、快捷键标签、尺寸/变体 API。
- [ ] 不影响已有 `DropdownMenu`、其他组件和路由。
- [ ] TypeScript typecheck 和 production build 通过。

完成后仅汇报实际修改文件、功能清单、验证结果、仍然存在的限制，不需开展无关的全站重构。
