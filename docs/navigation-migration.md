# 文档导航迁移报告

## 结构变化

旧侧栏分别显示 5 个文档主题、8 个组件分类和「规范与验证」。各分组直接链接到页面。新侧栏以 Apple HIG 的 6 个主题作为第一级，将组件分类放到第二级，并把「规范与验证」归入 Foundations。页面显示在第三级，路由仍使用原有的 `#/tahoe/…`。参考 [Apple HIG Components](https://developer.apple.com/design/human-interface-guidelines/components.md)。

```text
Getting Started — 入门指南
└── Start Here — 开始使用（5 页）
Foundations — 设计基础
├── Design Principles — 设计原则（12 页）
└── Specifications and Verification — 规范与验证（4 页）
Patterns — 交互模式
└── Interaction Patterns — 常用交互（9 页）
Components — 界面组件
├── Content — 内容组件（2 页）
├── Layout and Organization — 布局与组织（6 页）
├── Menus and Actions — 菜单与操作（7 页）
├── Navigation and Search — 导航与搜索（3 页）
├── Presentation — 内容呈现（9 页）
├── Selection and Input — 选择与输入（9 页）
├── Status — 状态反馈（4 页）
└── System Experiences — 系统级体验（1 页）
Inputs — 输入方式
└── Input Methods — 输入方法（4 页）
Technologies — 技术与平台
└── Web Implementation — 网页实现（5 页）
```

## 映射结果

| 状态 | 结果 |
| --- | --- |
| Matched | 80 个现有文档路由全部映射，含 35 个主题页、41 个组件页和 4 个规范与验证页。28 个标准组件主题对应 36 个现有组件页，另有 5 个现有组件页保留在最接近的类别。 |
| Unclassified | 0 |
| Missing | 64 个标准组件主题中有 36 个暂无对应文档。清单保留，侧栏和搜索只显示可访问页面。 |
| Conflict | 0 个重复路由。部分 HIG 主题对应多个现有组件页面，分别保留原有 URL。|

35 个主题页保留原主题和路由前缀。`design`、`tokens`、`colors` 移入 Foundations 下的「规范与验证」，保留原有短路径。

### Components 路由映射

右栏列出已有组件的原路径后缀。路径前缀均为 `#/tahoe/`。

| 二级目录 | 标准主题 → 原路由 |
| --- | --- |
| Content | Image Views → `image-view`<br>Text Views → `text-view` |
| Layout and Organization | Disclosure Controls → `disclosure-control`<br>Lists and Tables → `table`、`list`<br>Outline Views → `outline-view`<br>Split Views → `split-view`<br>Tab Views → `tabs` |
| Menus and Actions | Buttons → `button`、`icon-button`<br>Context Menus → `context-menu`<br>Menus → `dropdown-menu`<br>Pop-up Buttons → `dropdown`、`select`<br>Toolbars → `toolbar` |
| Navigation and Search | Path Controls → `breadcrumb`<br>Search Fields → `search-field`<br>Sidebars → `sidebar` |
| Presentation | Alerts → `alert`<br>Panels → `inspector-panel`<br>Popovers → `popover`<br>Scroll Views → `scroll-view`<br>Sheets → `sheet`<br>Windows → `window`、`title-bar`、`traffic-lights` |
| Selection and Input | Combo Boxes → `combo-box`<br>Segmented Controls → `segmented-control`<br>Sliders → `slider`<br>Steppers → `stepper`<br>Text Fields → `text-field`、`text-area`<br>Toggles → `checkbox`、`switch` |
| Status | Progress Indicators → `progress-indicator`、`spinner` |
| System Experiences | 暂无标准主题文档 |

独立保留的现有组件页包括 Presentation 的 `dialog`，Selection and Input 的 `radio-group`，Status 的 `tooltip`、`badge`，以及 System Experiences 的 `settings-group`。

### 暂无文档的标准主题

| 二级目录 | Missing |
| --- | --- |
| Content | Charts、Web Views |
| Layout and Organization | Boxes、Collections、Column Views、Labels、Lockups |
| Menus and Actions | Activity Views、Dock Menus、Edit Menus、Home Screen Quick Actions、Ornaments、Pull-down Buttons、The Menu Bar |
| Navigation and Search | Tab Bars、Token Fields |
| Presentation | Action Sheets、Page Controls |
| Selection and Input | Color Wells、Digit Entry Views、Image Wells、Pickers、Virtual Keyboards |
| Status | Activity Rings、Gauges、Rating Indicators |
| System Experiences | App Shortcuts、Complications、Controls、Live Activities、Notifications、Snippets、Status Bars、Top Shelf、Watch Faces、Widgets |

## 配置与兼容性

- `apps/docs/src/app/navigation.ts` 定义标准主题和路由映射。新增控件文档时，在 `catalog.ts` 设置对应的 HIG `reference`，它会进入相应目录。独立页面可补充明确的归类元数据。
- 侧栏、站内搜索和文档前后页导航使用同一份可访问页面清单。页面标题、文档内目录、组件示例、语言参数和原有路由别名延续现有实现。
- 站点、窗口示例和组件运行时使用 Font Awesome Free。旧文档正文和示例文案保持原样，其中对 Lucide 的技术说明仍反映迁移前的实现。参考 [Font Awesome React 官方文档](https://docs.fontawesome.com/web/use-with/react/add-icons)。

## 修改文件

- 导航与路由目录：`apps/docs/src/app/navigation.ts`、`apps/docs/src/app/catalog.ts`、`apps/docs/src/app/App.tsx`
- 侧栏与样式：`apps/docs/src/layouts/DocsNavigation.tsx`、`apps/docs/src/layouts/DocsLayout.tsx`、`apps/docs/src/styles/app.css`
- 文档站示例图标：`apps/docs/src/components/TahoeExtraPreview.tsx`、`apps/docs/src/components/TahoeWindowDemo.tsx`
- 组件运行时图标：`packages/ui/src/components/AdditionalControls.tsx`、`packages/ui/src/components/controls.tsx`、`packages/ui/src/components/feedback.tsx`、`packages/ui/src/components/sidebar.tsx`、`packages/ui/src/styles/tahoe-tokens.css`
- 依赖与打包：`apps/docs/package.json`、`packages/ui/package.json`、`packages/ui/vite.config.ts`、`pnpm-lock.yaml`
- 回归测试与报告：`tests/docs.spec.ts`、`tests/navigation.spec.ts`、`docs/navigation-migration.md`

## 验证结果

`pnpm typecheck`、`pnpm tokens --check`、`pnpm build` 和 9 项 Playwright 测试通过。浏览器验证覆盖双语文档、原有短路径和入口别名、键盘折叠、独立展开状态、当前页高亮、站内搜索、移动端滚动和 Font Awesome 图标。

## 后续新增

第一阶段文档框架增加了已公开导出的 Radio 文档，路径为 `#/tahoe/radio`，收录于 Selection and Input。上述统计记录的是导航迁移时的基线。
