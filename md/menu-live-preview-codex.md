# Codex 实施提示词 — Menu / DropdownMenu + Live Preview

## 目标

为 macOS Tahoe Components 文档站点的 **Menu** 页面完成真实、可交互的 Live Preview，并检查现有 `DropdownMenu` 组件与设计规范是否一致。

**以这两份文档为权威需求：**
- `apps/docs/content/components/menu.md`（中文）
- `apps/docs/content/components/menu.en.md`（English）

**优先读取现有仓库文件：**
- `packages/ui/src/components/navigation.tsx`
- `packages/ui/src/styles/tahoe-tokens.css`
- `packages/ui/src/styles/tahoe-materials.css`
- `packages/ui/src/index.ts`
- `docs/design.md` 和 `docs/tokens.md`
- `apps/docs/src/app/catalog.ts`
- 现有文档路由、Markdown 加载器、`ComponentDocPage`、`ComponentPreview`、已实现的 Preview Card。

## 0. 先审计再修改

确认现有导出名称为 `DropdownMenu`，而不是虚构的 `<Menu />`。当前 API：

```ts
type MenuAction = {
  id: string
  label: string
  disabled?: boolean
  onSelect: () => void
}

<DropdownMenu label="File" actions={actions} />
```

组件基于 Headless UI 的 `Menu` / `MenuButton` / `MenuItems` / `MenuItem`，菜单锚定 `bottom start`。

不要创建重复组件。不要给 `DropdownMenu` 无需求地增加 `size`、`variant`、`shortcut`、`icon`、`separator`、`submenu`、`open`、`onOpenChange` 等 Props。不要将 Context Menu 的右键行为混入 Menu。

## 1. 独立文档与页面

- 将中文和英文文件放到 `apps/docs/content/components/`。
- 使用现有的 `dropdown-menu` catalog key / 路由，验证真实路由；不要凭猜测修改 URL。
- 保留 12 个章节的统一顺序：Overview、Anatomy、Live Preview、Sizes、Variants、States、Behavior、Accessibility、API Reference、Code Example、Design Specifications、References。
- 文档语言切换使用现有文档系统；不能依靠开发者手动改 URL。
- Live Preview 区由 React 渲染；Markdown 不重复渲染静态假控件。

## 2. Live Preview 统一卡片规则

每张卡片使用项目现有共享 `ComponentPreview` 或 LivePreviewCard，尽量复用，不创建 Menu 专用的重复卡片框架。

卡片必须具有两组独立 Tab：

1. `Light / Dark`：只影响该卡片的真实预览和浮层，不改变整个文档页面；各卡片状态独立。
2. `Preview / Code`：默认 Preview，Code 展示对应真实 TSX，并有 Copy Code；保留当前主题选择。

Code 包含可复制的真实导入、Props 和必要状态；使用 React + TypeScript，并与对应 Preview 实例一致。Card 标题和说明跟随中英文文档语言。不要生成代码图片。

## 3. 四张 Menu 专属卡片

### Card 1 — Menu Basics

- File 菜单：Open、Rename、Duplicate。
- 操作后在旁边显示 `Last action: …`，不修改真实文件。
- 验证鼠标点击触发器、菜单项回调、选择后关闭。
- 代码示例采用 `DropdownMenu` 和真实 `MenuAction[]`。

### Card 2 — Menu States

- 至少包含两个 Enabled 和一个 Disabled Action。
- 真实展示 Closed / Open、Active / Focused、Disabled。
- Disabled 不能执行回调；如有提示信息，在示例层显示，不修改公开组件 API。
- 不使用假的 hover/focus 永久 class 作为交互测试替代。

### Card 3 — Keyboard Interaction

- 在卡片下方放简短的键盘操作提示。
- 验证 Tab 到触发器；Enter 或 Space 打开；上下方向键移动；Enter 激活；Escape 关闭；关闭后焦点返回。
- 使用 Headless UI 自带的键盘与焦点管理，禁止重新造一套键盘菜单系统。
- 状态反馈使用实际 `onSelect` 回调。

### Card 4 — Menu in Toolbar

- 在现有 `Toolbar` 或 `Window` 组件中展示 Menu。
- 模拟 Photos/Files 管理等现实场景。
- 在窄视口中检验菜单不被 `overflow` 裁剪，位置合理，不溢出屏幕。
- 业务操作通过本地状态反馈；不跳转、不删除真实数据。

## 4. Tahoe Design Tokens

从现有 CSS 中读取并复用：

- `--tahoe-control-height`
- `--tahoe-control`
- `--tahoe-label`
- `--tahoe-menu`
- `--tahoe-menu-rim`
- `--tahoe-menu-shadow`
- `--tahoe-focus`
- `--tahoe-accent`
- `--tahoe-font`、`--tahoe-body`

当前 menu CSS：面板最小宽 132px、圆角 10px、内边距 4px；菜单项最小高 24px、圆角 5px；触发器最小宽 84px。以实际代码为准，不复制另一套色板或硬编码主题变量。

### 浮层主题特别要求

Headless UI 的 `MenuItems` 可能渲染在 Portal 或脱离卡片 DOM 的浮层中。必须实际验证：

- 卡片选 Dark 时，Trigger **与打开后的 Menu 面板** 同时为 Dark。
- 同一页面其他卡片仍可保持 Light。
- 切换 Preview / Code 后卡片 Theme 不丢失。
- 切换语言或重新打开菜单后依旧一致。

优先沿用共享预览组件的 theme portal 方案。如果当前实现无法实现局部 Dark，先修复**共享**主题作用域，而不是向单个菜单写死 CSS 颜色。检查 portal 的主题挂载、变量继承与 z-index；必要时将主题作用域明确传递至浮层根节点，但不要影响其他卡片。

## 5. Accessibility 与行为

- Headless UI Menu 的 ARIA、按钮及禁用语义完整保留。
- Focus 样式清晰；禁用菜单项不执行 `onSelect`。
- Escape、外部点击关闭，关闭后焦点管理可用。
- 菜单层不被 Window、Toolbar 或卡片容器裁剪。
- 容器缩小时仍能可见、可操作。
- 避免使用颜色作为唯一状态提示。
- 遵循仓库的 `prefers-reduced-motion` 规则。

## 6. 不属于此次范围

- ContextMenu 的右键定位与指针定位。
- 新增菜单项图标、分隔线、快捷键、选中态或子菜单。
- 创建一个与 `DropdownMenu` 并行的新 `Menu` 组件。
- 修改 Button、Checkbox、Switch 等无关组件。
- 全局主题重构或调整文档站点的所有路由。

如果某项能力是文档中标注的“未实现”，保持现状并在结果中说明，而不是悄悄扩展 API。

## 7. 验收与交付

执行项目适用的：

- TypeScript typecheck
- Production build
- Menu 基础交互测试
- Keyboard / Focus / Disabled 测试
- Light / Dark 卡片隔离与浮层主题测试
- Preview / Code 与 Copy Code 测试
- 中英文文档与路由测试
- Toolbar / Window 中浮层可见性与窄屏测试

交付报告应列出：改动文件、组件 API 变化（如无则注明无）、四张卡片的实现、测试结果、遗留限制。只在本地完成并验证，不默认提交、推送或部署。
