# Tahoe 第一阶段组件与文档审计

本轮范围是文档框架。检查了 `packages/ui/src/index.ts`、公开组件源码、现有样式和 Token、组件路由配置以及已有 React 预览。控件实现继续沿用当前组件包。

## 状态

| 状态 | 结果 |
| --- | --- |
| Complete | 42 个现有控件对应 42 个独立文档路由。每个路由包含简体中文和英文 Markdown，各有统一的 12 个章节及实际 React 预览。 |
| Needs Improvement | Button 已在本地验证多卡片、独立主题、Preview / Code 和代码高亮。其他控件按批次接入共享预览。具体控件的无障碍、视觉与 Tahoe 26 UI Kit 规格仍需逐项核对。 |
| Missing | 导航清单仍有 36 个 HIG 控件主题缺少实现或文档。见[导航迁移清单](navigation-migration.md)。 |

`Radio` 已在组件包公开导出，本轮为它补上 `#/tahoe/radio` 文档与示例。`ProgressIndicator` 和 `Progress` 指向同一实现，沿用 `#/tahoe/progress-indicator` 并在 API 章节记录两个导出名。

## 首批预览所依据的现有接口

| 控件 | Sizes / Variants | 可展示的实际状态和交互 |
| --- | --- | --- |
| Button | `mini`、`small`、`regular`、`large`、`xl`。 `neutral`、`accent`、`destructive`。 | 默认、悬停、按下、键盘焦点和禁用。 `loading` 会停用按钮并设置 `aria-busy`。 |
| Checkbox | 使用当前统一几何规格。 | 未选中、选中、禁用与键盘焦点。鼠标、标签和空格可切换。 |
| Switch | 使用当前统一轨道与滑块规格。 | 开、关、禁用与键盘焦点。使用原生 checkbox 交互和 switch 语义。 |
| TextField | 保留现有尺寸和原生 input 属性。 | 输入、占位、聚焦与禁用。 |
| SegmentedControl | 由 `options`、`value`、`onChange` 管理选择。 | 选中项、焦点和同组方向键切换。 |
| Radio | 保留原生 radio 属性。通过共享 `name` 自定义分组。 | 默认选中、未选中、禁用和原生键盘选择。 |

其他控件的 Sizes、Variants、States 和 API 概览在[组件 Markdown 目录](../apps/docs/content/components/)中维护。规格页沿用当前 Web 实现的记录及来源。

## 后续工作

Button 的共享预览卡片已在本地完成并验证，接下来将 Button、IconButton 的实现直接绑定最新版 Tahoe Design Tokens，再将同一流程扩展到其他控件。批次顺序、每批验收项和上线步骤见[开发与发布流程](development-workflow.md)。
