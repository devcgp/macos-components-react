# Codex 实施提示词 — Text Field Component & Live Preview

## 开发目标

在现有 `devcgp/macos-components-react` 仓库中，根据以下文档完善真实 TextField 控件及其 Documentation Page：

- `apps/docs/content/components/text-field.md`（中文）
- `apps/docs/content/components/text-field.en.md`（英文）
- `packages/ui/src/components/AdditionalControls.tsx`（实际源码）
- `packages/ui/src/styles/tahoe-tokens.css`（当前 Tahoe Design Tokens）
- `docs/design.md`、`docs/tokens.md`

**只处理 Text Field 及其文档预览。优先局部修正现有实现，保留兼容 API、现有项目架构与 `#/tahoe/text-field` 路由。** 不新增一个重复的 TextField 组件，不重写其他控件。

## 1. Source-of-truth Audit

开始编码前阅读以上源文件，核对组件类型、CSS 和 Markdown。当前已核实的组件如下：

```tsx
export function TextField({ label, className = '', ...props }:
  Omit<ComponentProps<'input'>, 'type'> & { label: string }) {
  return <label className="tahoe-field-label">{label}
    <input {...props} type="text" className={`tahoe-text-input tahoe-field-control ${className}`}/>
  </label>
}
```

- 必填 `label: string`。
- `type` 被固定为 `text`，不接受覆盖。
- 原生 Props：`value`、`defaultValue`、`onChange`、`placeholder`、`disabled`、`readOnly`、`required`、`id`、`name` 等。
- `onChange` 传入 React event，使用 `event.currentTarget.value`。
- **没有**独立的 `size`、`variant`、`loading`、`clearable`、`error` Props。
- 若仓库当前代码已更新，优先以实际源码为准，对照双语 Markdown 同步修正文档；不得虚构 API。

## 2. Documentation & Preview Architecture

沿用已有独立 Markdown 页面、统一 12 Section，以及项目共享的 Preview Card 实现。

每张卡片统一：

- Header 左侧：Card Title；右侧：`Light / Dark` 两个 Tab。
- 内容切换：`Preview / Code` 两个 Tab，彼此状态独立。
- Preview：真实 `@macos-tahoe/ui` 的 `TextField`，可直接输入、聚焦与键盘操作。
- Code：语法高亮的完整 React + TypeScript / TSX 示例，含真实 import；有 **Copy Code** 按钮。
- Preview 默认激活；切换到 Code 再返回，不应丢失用户正在输入的内容。
- 切换 Light/Dark 不应重置值、焦点或其他 demo 状态。
- 每张卡片的主题切换只作用于当前卡片，不能修改整个文档页面。
- 避免不同卡片间使用重复的 DOM ID；表单字段与错误说明的 `id` 应唯一。

请复用仓库已有 Preview Card / Markdown 渲染机制，不为 TextField 重复制造一套新框架。

## 3. Live Preview Cards

### Card 1 — Text Field Basics

**同一 Preview 展示三个独立实例**：

- Empty：`<TextField label="Empty" />`
- Placeholder：`<TextField label="Placeholder" placeholder="Enter a name" />`
- Filled：`<TextField label="Default value" defaultValue="Photos" />`

这些字段可真实编辑；各示例代码与显示一致。若需要同步演示当前值，可在应用层提供显示区域。

### Card 2 — Text Field States

展示 Default、Filled、Focused、Disabled、Read-only、Required。

- Focus 状态通过真实点击/Tab 验证，不用截屏或伪造光圈。
- Disabled 不可输入或聚焦。
- Read-only 可选择/复制但不可修改。
- Required 由原生属性控制；在无效提交场景验证约束。
- 可在卡片内补充真实 Tab 顺序说明，不引入假的 `state` Prop。
- Hover 不要声称有 CSS 专用高亮，除非仓库真实实现。

### Card 3 — Controlled Text Field

- 使用 `useState` 管理 `value` 与 `onChange`。
- 下方实时显示当前值与字符数。
- 提供 Reset 按钮还原默认值。
- 输入法组合输入正常；不要通过自定义键盘事件破坏原生文字编辑。
- Code 与当前演示状态或明确的整体案例对应，不使用不可运行的伪代码。

### Card 4 — Form & Validation

- 完整表单示例，使用 `name`、`required`、`aria-invalid`、`aria-describedby`。
- 允许模拟用户提交空值，显示**应用层**错误提示。
- 可使用 `noValidate` 接管校验，避免原生弹窗阻止自定义错误信息显示；同时保留并说明 `required` 语义。
- 提交有效值后显示结果，且具备可清除错误的行为。
- 不要给 `TextField` 添加不存在的 `error` 或 `helperText` Props。

### Card 5 — Text Field in Settings

- 用文件夹重命名或项目设置作为真实组合场景。
- 展示 TextField 与现有 Button / Window / 设置组件的组合（仅使用实际导出的 API）。
- 用户修改名称后点击保存，当前卡片的设置状态同步更新；避免空操作按钮。
- 在小宽度下验证标签、控件、操作区域不会溢出。

**不创建 Sizes / Variants 预览卡片**：当前 TextField 只有 Regular 样式，且无这两种 API。Markdown 保留 Sizes 与 Variants 文字说明即可。

## 4. Tahoe Design Tokens — 强制遵循

检查当前 CSS 实现，并使用现有语义变量：

| Token | 预期用途 |
| --- | --- |
| `--tahoe-control-height` | 24px 输入框高度 |
| `--tahoe-control-radius` | 6px 圆角 |
| `--tahoe-field-border` | 1px 边框颜色 |
| `--tahoe-content-surface` | 浅/深主题输入框背景 |
| `--tahoe-label` | 正文字色 |
| `--tahoe-text-secondary` | Placeholder |
| `--tahoe-regular-type` | 13px 输入文字 |
| `--tahoe-accent`、`--tahoe-focus`、`--tahoe-control-focus` | 焦点反馈 |
| `--tahoe-control-transition` | 交互动效 |

当前主要几何：height 24px、border radius 6px、border 1px、padding-left 8px、padding-right 4px、label gap 8px。

已有主题由 `[data-theme="tahoe"]` 与 `.dark` 祖先定义。开发独立卡片主题时应**正确限定 CSS 变量作用域**（必要时仅对预览卡根部引入 scoped 主题标记与变量覆盖），验证祖先页面为 Dark 时，卡片可以独立显示 Light，反之亦然。不可只变更背景而不变更输入框和焦点样式。不要引入第二套硬编码配色。

## 5. Component Quality & Accessibility

- 保留真实 `input type="text"` 与可点击聚焦的 label 结构。
- 正确支持受控与非受控用法，不触发 React 警告。
- 保留原生键盘、选择、复制/粘贴、撤销/重做、IME 组合输入。
- Focus/Disabled/Read-only 在两种主题下视觉及行为区分明确。
- Error 消息通过可访问 ID 与 `aria-describedby` 关联；测试屏幕阅读器语义。
- 默认输入框是单行文本，不能悄悄修改为多行或搜索组件。
- CSS 仅在确有必要时做最小修改，保留已有公共类名和导出。

## 6. Documentation Integration

- 中文 Markdown 与英文 Markdown 各有 12 个 Section，页面应根据实际语言载入对应文件。
- Live Preview 卡片由 React 动态渲染，不直接作为字符串 JSX 嵌入 Markdown。
- Markdown 的 Sizes、Variants 描述规范，不重复开发另一个尺寸/变体组件区。
- 确保页面路由 `#/tahoe/text-field`、文档目录、Code Copy 与导航可用。
- 若双语文档与实际源代码不一致，在同一次变更中同步修正。

## 7. 验收测试

1. `typecheck`、构建与现有相关测试通过；修复与本任务直接相关的问题。
2. 所有五张 Live Preview 卡片渲染真实 TextField；操作功能有效。
3. Preview / Code、Light / Dark 两组 Tab 独立切换；状态保留。
4. 全部 Code 示例 TSX 可编译、可复制、与对应 Preview 一致。
5. Controlled 输入、Reset、有效/无效表单提交、Disabled、Read-only、Tab Focus 正常。
6. Dark 页面下 Light 卡片、Light 页面下 Dark 卡片都使用正确背景、边框、文字、Focus Tokens。
7. 窄宽度下不卡死、不裁剪且不出现不合理横向滚动。
8. 文档的 12 Sections 都存在，中文/英文的结构一致。

完成后报告：修改的文件、实现的卡片、验证命令与结果、发现但未处理的问题。不要在未执行测试时声称通过。
