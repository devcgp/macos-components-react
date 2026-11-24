# Codex Prompt — Switch Component & Live Preview

## 目标

基于现有 `devcgp/macos-components-react` 项目，遵循 `apps/docs/content/components/switch.md`、`switch.en.md` 和 **最新 Desktop Design Tokens**，完善真实 React Switch 组件与 `#/desktop/switch` 文档页的 Live Preview。不得重新创建一套平行 Switch 组件。

## 一、先核对实际代码

读取并对照：

- `packages/ui/src/components/switch.tsx`
- `packages/ui/src/styles/desktop-tokens.css`
- `packages/ui/src/index.ts`
- `apps/docs/src/app/catalog.ts`
- 现有文档渲染、Live Preview、语言切换及主题切换代码
- `apps/docs/content/components/switch.md` 与 `switch.en.md`

**源码优先**。Switch 当前采用原生 `<input type="checkbox" role="switch">`，`label` 必填；允许 `checked`、`defaultChecked`、`onChange`、`disabled` 等原生 input props。没有 `size`、`variant`、`loading`、`onCheckedChange` 等自定义 API。不要展示或调用不存在的 API。必要的代码修复保持向后兼容。

## 二、Documentation 页面

- 每个语言一份独立 Markdown：`switch.md` / `switch.en.md`。
- 两份均保留统一的 12 个 Section，文档路由保持 `#/desktop/switch`。
- 11 个文字型 Section 由 Markdown 渲染，可逐步补全。
- **Live Preview Section** 由 React 自动插入真实控件预览；Markdown 不需要 MDX 或可执行 JSX。
- 如网站已有中英文切换，沿用现有机制，不引入重复语言框架。

## 三、统一 Preview Card 规范

每张卡片必须具备：

1. Header：左侧 Card Title，右侧 **Light / Dark** Segmented Tabs。
2. 内容区域：**Preview / Code** Segmented Tabs，默认 Preview。
3. Preview：真实 `@cgpdesktopui/ui` Switch，能被鼠标、键盘和触控操作。
4. Code：该卡片对应的完整、类型正确的 React + TypeScript (TSX) 示例，具有 Syntax Highlight 与 Copy Code 按钮。
5. 两组 Tabs 独立，切换任一 Tab 不重置开关状态或另一组 Tab 的当前选择。
6. 主题切换仅作用在该卡片。项目当前深色 Tokens 依赖祖先 `.dark`，所以必须在卡片预览内隔离 `.dark` 作用域并提供 `data-theme="desktop"` 容器；不能仅修改一个无效的 `data-mode` 属性，更不能切换整个站点的根 `.dark`。
7. 所有颜色、几何、阴影及动效使用现有 Desktop Design Tokens，不复制硬编码色值、轨道尺寸或滑块尺寸。相关 Tokens：`--desktop-switch-width`、`--desktop-switch-height`、`--desktop-switch-thumb-width`、`--desktop-switch-inset`、`--desktop-switch-off`、`--desktop-switch-thumb-color`、`--desktop-switch-rim`、`--desktop-switch-thumb-shadow`、`--desktop-accent`、`--desktop-control-focus`、`--desktop-control-transition`。
8. Dark / Light 对比展示必须基于同一套实际 CSS；不得为 Preview 重画假 Switch。

## 四、Switch 专属的 Preview Cards

### Card 1 — Switch On / Off

- 同屏展示默认关闭和默认开启两个 Switch，并标明 On / Off。
- 两个 Switch 均可独立切换。
- Code 展示 `defaultChecked` 与默认关闭的非受控示例。
- 不要在演示文案中将 On / Off 称为 Variant。

### Card 2 — Switch States

- 展示 Enabled Off、Enabled On、Disabled Off、Disabled On。
- 提供对真实开关的 Hover、Pressed、Focus Visible 交互测试提示；不能将视觉模拟伪装成真实焦点或按下。
- Disabled Switch 无法通过点击、Space 改变状态。
- Code 包含 `disabled`、`defaultChecked` 的真实示例。
- 当前 CSS 没有独立 Hover 专属外观，不应宣称已实现专属 Hover 色彩。若发现设计需求明确，再修改实际 CSS 和文档。

### Card 3 — Controlled Switch

- 使用 React `useState<boolean>` 管理状态。
- 使用 `checked={enabled}` 和 `onChange={(event) => setEnabled(event.currentTarget.checked)}`。
- 展示随交互实时更新的 On / Off 文本。
- Code 完整包含 `useState`、`Switch` Import 及主题上下文。

### Card 4 — Settings Example

- 模拟 macOS 设置列表的合理使用场景，如“显示文件名”“自动同步”“通知”。
- 每个 Switch 都是实际组件，具有独立状态与唯一清晰的 label。
- 不引入假的 `SettingsSwitch` 或新的 Switch Props；如使用现有 SettingsGroup，先验证其真实公开 API。
- Code 与实际预览结构一致。

### 不创建的卡片

- Sizes：目前只有唯一标准尺寸，没有 `size` Prop。
- Variants：目前没有 `variant` Prop。
- Loading、Indeterminate：当前 Switch 没有实现。

保留 Markdown 中的 Sizes 与 Variants Section，以文字记录现有实现。

## 五、组件与可访问性验收

- 实现沿用原生 input 和 `role="switch"`，`label` 关联输入。
- 点击 Label / Track 以及 Space 均可切换；Tab 可聚焦；Disabled 不可操作。
- 保持 `checked` 与 `defaultChecked` 受控/非受控语义正确。
- `aria-hidden` 的轨道与滑块不进入辅助技术语义树。
- Focus Visible 使用 `--desktop-control-focus`；测试实际焦点环。
- 支持 Reduced Motion、Forced Colors；检查 Light / Dark 下对比度。
- 不要把项目第三方测量的 54×24px / 32×20px 宣称为 Apple 官方认证规格。

## 六、完成后验证与交付

- 运行现有 TypeScript Typecheck、Build 及相关测试。
- 验证文档路由、中文/英文切换、12 Section 渲染。
- 验证每张卡片的 Preview / Code、Light / Dark 独立切换、代码复制。
- 检查代码示例使用真实公开 API 且 TypeScript 可以编译。
- 验证同屏多张卡片互不串扰，切换 Dark 不改变整站页面。
- 列出修改文件、实际完成内容、测试结果、任何未完成事项。

本次范围仅包括 Switch 组件与对应文档预览。保留现有 React + TypeScript、CSS、主题系统和路由，不重构无关组件。
