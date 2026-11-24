# Codex 实施提示词 — Segmented Control + Live Preview

## 目标

基于 `devcgp/macos-components-react` 当前代码，以以下两份文档为需求基准，完善 Segmented Control 及其文档页面：

- `apps/docs/content/components/segmented-control.md`
- `apps/docs/content/components/segmented-control.en.md`

只处理 Segmented Control 与其展示依赖，避免其他控件的无关重构。先对照当前源码和 CSS 检查，再最小化改进。中文、英文文档的 12 个 Section 及技术内容保持一致。

## 先核对源码

- `packages/ui/src/components/controls.tsx` 内的 `SegmentedControl`
- `packages/ui/src/styles/desktop-tokens.css`
- `packages/ui/src/index.ts`
- `docs/design.md` / `docs/tokens.md`
- `apps/docs/src/app/catalog.ts`、现有 `ComponentDocPage` / `ComponentPreview` / 文档路由

现有公共 API：

```ts
{
  label: string
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
}
```

该组件使用 `role="radiogroup"` + 原生 radio。没有 `size`、`variant`、`disabled`、`defaultValue` 或 object options API。不得生成虚假的控制项或 TSX Props。

## Live Preview Card 统一结构

每张卡片：

- 卡片左上角标题；右上角 `Light / Dark` Tab。
- 内容区域独立 `Preview / Code` Tab，默认 Preview。
- Preview 用真实导出的 `SegmentedControl`；Code 展示与该卡片一致的完整 React + TypeScript 示例。
- Code 语法高亮 + `Copy Code` 按钮；复制内容包含真实 import、有效 props、必要的 `useState` 和主题容器。
- 两组 Tab 独立工作；切换 Code/Preview 不应重置当前选中项。
- 主题只作用于该卡片 Preview，不应意外影响整页其他卡片。
- 当前项目通过 `.dark` 祖先配合 `[data-theme="desktop"]` 实现深色，不能仅写 `data-theme="dark"`。复用既有主题机制，并验证 CSS 变量确实生效。
- 预览必须可点击、可键盘操作，不得以图片、假 DOM 或另外写一套外观替代真实组件。

## 四张预览卡片

### Card 1 — Basic Selection

- Grid / List 两段，真实受控状态。
- 点击切换后，下方状态或内容立即更新。
- Code 展示 `useState`、`options`、`value`、`onChange` 的完整示例。

### Card 2 — Option Counts

- 同时展示 2、3、4 选项的独立实例，每个都可真实选择。
- 标注 `Two options` / `Three options` / `Four options`。
- 示例分别使用独立的 `name`，避免 radio 相互影响。
- 不把选项数量误称为 `size` 或 `variant`。

### Card 3 — Selection & Keyboard

- 演示选中项及焦点可视状态。
- 使用 Tab 进入单选组，测试方向键切换、空格键行为，并保留原生 radio 语义。
- 不通过强制 focus 或写死 CSS 类伪装 `focus-visible`；聚焦必须真实可操作。
- 不宣称已实现当前 CSS 不存在的 Hover/Pressed 专项视觉效果。

### Card 4 — Practical Example

- 使用 `All / Photos / Videos`，结合内存中的演示数据切换实际内容。
- 过滤逻辑由示例父组件实现，而非伪装 `SegmentedControl` 内建功能。
- Code 展示完整可独立使用的应用示例。

## Design Tokens

严格使用当前 Desktop CSS Tokens：

- `--desktop-control`：分段组背景。
- `--desktop-accent`：选中态及焦点轮廓。
- `[data-theme="desktop"]` + `.dark` 祖先：主题范围。
- 当前几何：外框 min-height 24px、radius 6px、padding 2px、段间 gap 1px、单段 radius 4px、padding-inline 10px。

现有选中文字采用 `#111`，需要检查两种主题下的实际对比度；如修改，应遵循已有语义 Token，必要时先定义经过审查的新 Token，不允许散落硬编码色值。

不得将 Web 近似规格冒充 Apple 官方精确测量值。

## 文档集成

- 每种语言分别读取对应 Markdown 文件，展示既定 12 Sections。
- 在 Live Preview Section 插入上述四张真实 React 卡片。
- Markdown 仍是规范文本来源，Live Preview 内容由 React 实现。
- 保留现有 `#/desktop/segmented-control` 路由；若网站已具备中英文切换，确保读入对应文档。
- 复用现有 Preview Card 基础框架，不复制整套独立 CSS/逻辑。
- 若完成后实际 API、交互或 Token 有变化，须同步更新中英文文档。

## 测试与验收

1. `SegmentedControl` 的现有公开 API 不被破坏。
2. 四张卡片均渲染真实组件，交互状态相互独立。
3. Preview/Code 和 Light/Dark 均正常，主题隔离正确。
4. Code 可复制、TSX 正确，可在项目中编译使用。
5. Radio 的组名、选择语义、Tab 与方向键行为通过验证。
6. 颜色对比度、Light/Dark、窄宽度布局通过检查。
7. 构建与 TypeScript 检查通过，无已有文档路由回归。
8. 明确报告实际修改文件、测试命令、通过项与剩余问题。

只在真实验收完成后标注已实现，不虚构 `disabled`、`size`、`variant` 等当前不存在的功能。
