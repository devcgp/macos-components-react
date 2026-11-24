# Codex Prompt — Checkbox Component & Live Preview

请在现有 `devcgp/macos-components-react` 仓库中完成 Checkbox 组件核查、必要修正及 Live Preview。**必须遵循最新 Tahoe Design Tokens**，保留现有 React + TypeScript 结构、主题机制、路由与其他组件功能。

## 文档输入

- 中文：`apps/docs/content/components/checkbox.md`
- 英文：`apps/docs/content/components/checkbox.en.md`
- 组件：`packages/ui/src/components/checkbox.tsx`
- Tokens：`packages/ui/src/styles/tahoe-tokens.css`
- 材质：`packages/ui/src/styles/tahoe-materials.css`
- 项目规范：`docs/design.md`、`docs/tokens.md`

先核对这些文件的**当前实际内容**。若项目 Tokens 已升级或更名，以最新可用的语义变量为准，更新中英文文档，不要沿用过期数值。文档是需求说明，组件源码和实际 Tokens 是现有功能的核实依据；不得把需求中尚未实现的 API 当作已实现。

## 任务 1 — Component

检查并改进现有 `Checkbox`，优先复用原生 `<input type="checkbox">` 与 `<label>`：

- 保留 `label`、`checked`、`defaultChecked`、`onChange`、`disabled` 及原生 Input Props。
- 保留正确的表单、键盘、焦点和无障碍语义。
- 确保 Unchecked、Checked、Hover、Pressed、Focus、Disabled 和 Disabled + Checked 的视觉反馈与交互准确。
- 根据现有 Tahoe Tokens 处理 Light / Dark；不要为 Checkbox 新增 `theme` Prop。
- 当前无 `size`、`variant`、`indeterminate` 专用 API，不要凭文档或其他 UI Kit 自行添加。需要新增时先报告需求差异。
- 保持公开 API 兼容。不要重新创建或重写无关组件。

## 任务 2 — Live Preview

`#/tahoe/checkbox` 页面由独立 Markdown 文件提供文字内容，`## Live Preview` 位置由 React 自动插入真实的预览卡片。保留文档统一的 12 个 Section。

### 所有预览卡片的统一结构

- 左侧 Card Title；右侧 `Light / Dark` 切换 Tab。
- 独立的 `Preview / Code` 切换 Tab；默认 Preview。
- 两组 Tab 相互独立，切换 Preview / Code 不重置主题。
- Preview 区域通过现有 `data-theme="tahoe"`、`.dark` 和 Tahoe Design Tokens 隔离主题，切换单张卡片不改变文档全局主题。
- Preview 中必须使用 `@macos-tahoe/ui` 真实导出的 `Checkbox`，允许实际点击和键盘操作。
- Code 模式提供语法高亮、`Copy Code`，显示与该卡片对应且能通过 TypeScript 检查的 TSX 代码。
- 不使用静态图片、仿制 Checkbox、虚构 Props、手写模拟的 Light/Dark 颜色。
- 复用项目现有的 `ComponentPreview` 和共享 Card 体系；不要为 Checkbox 单独搭一套不兼容的组件预览框架。

### Card 1 — Checkbox Selection

- 同时展示 Unchecked、Checked 两种初始配置（`defaultChecked`）。
- 两者均可由用户实际点击或键盘切换。
- Code 展示这两种真实配置。

### Card 2 — Checkbox States

- 展示 Default、Checked、Disabled Unchecked、Disabled Checked。
- 可通过真实 Hover、Pressed、Focus 检查状态。
- 不要将强制 CSS 模拟的状态标注成真实用户交互。
- 不要将 Indeterminate 列为当前已实现的专用状态。

### Card 3 — Controlled Checkbox

- 使用 `useState<boolean>`、`checked`、`onChange`。
- 显示当前勾选状态，确保点击后 UI 和状态同步。
- Code 是可复制的完整 React + TypeScript 组件，包含必要 import。

### Card 4 — Checkbox Group / Form

- 同时呈现多个独立 Checkbox，验证标签、勾选与表单语义。
- 这里只是组合使用现有 `Checkbox`；不能伪造 `CheckboxGroup` 导出。
- Code 与实际展示的组合一致。

**不要创建 Sizes 或 Variants 卡片**：当前 Checkbox 只有一种固定尺寸，没有公开 `size` / `variant` API。Markdown 的 Sizes / Variants 章节可继续保留，实现后再同步补充。

## 任务 3 — 文档同步

- `checkbox.md` 与 `checkbox.en.md` 具有相同的 12 个 Section 和相同事实，只是语言不同。
- 保持中英文 Code Example API 一致。
- 修正所有与最新 Tokens、源码和实际行为不一致的内容。
- 保留现有 `#/tahoe/checkbox` 路由；不要引入无必要的 Markdown 框架或重构。
- 不要把 Apple HIG 的原则误写成 Apple 官方认证的控件像素尺寸。

## 任务 4 — 验收

- TypeScript typecheck 和 Production build 通过。
- Checkbox 真正可选中 / 取消选中，label 点击和 Space 均生效。
- Controlled / Uncontrolled 例子无 React 警告。
- Disabled 无法操作，Checked 状态仍能正确显示。
- 真实 Light / Dark 主题准确应用于单张 Preview Card。
- Preview / Code Tabs 工作正常，Copy Code 内容准确。
- 代码例子仅使用真实公开 API 并通过类型检查。
- 中英文文档均可访问，路由不回归；其他组件不受影响。

最后输出：修改文件清单、完成的 4 张卡片、测试结果、发现并修复的源码/文档差异，以及仍待后续实现的事项。不要未经实际运行就宣称测试通过。
