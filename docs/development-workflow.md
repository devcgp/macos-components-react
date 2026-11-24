# macOS Tahoe Components 开发与发布流程

## 当前基线

- 文档框架已覆盖 42 个组件和 84 份中英文 Markdown。Sidebar、页面目录和现有组件路由可沿用。
- 本地 Button 和 IconButton 已有四张真实预览卡片。Button 仍有单独定义的尺寸、圆角、内边距和字号规则，下一批先迁移为直接引用 Tahoe Tokens。
- 本地文档站已统一磨砂顶栏、侧栏和标题位置。上次确认的生产版本为 `5a4d333`，发布时以 GitHub 提交和 Vercel 部署结果核对版本。

## Markdown 原稿

将本批控件的 Markdown 放到仓库根目录的 `md/`。文件名可以沿用控件路由，例如 `checkbox.md` 和 `checkbox.en.md`。如有单独的实施说明，也可放在同一目录。

处理时读取原稿和实施说明，按控件及语言匹配 `apps/docs/content/components/` 下的正式文档。把指定文案直接替换到对应文件，保留正式文件名、原有路由和 12 个章节。若只有一种语言的原稿，先替换对应语言，并同步另一版本中受实现变更影响的规格。交付时说明处理了哪些语言版本。

同一批次包含文档替换、控件开发和 Live Preview 开发。遇到原稿与最新版 Tahoe Design Tokens、实际 API 或交互有差异时，先核对再对齐，并在交付中说明。

## 每批开发步骤

| 步骤 | 工作内容 |
| --- | --- |
| 1. 核对范围 | 先读 `md/` 中的本批原稿和实施说明，再核对控件公开导出、现有实现和中英文文档。记录实际支持的尺寸、变体、状态和交互。 |
| 2. 确认 Token | 以 `packages/ui/src/styles/tokens/` 中的最新版 Tahoe Design Tokens 为准。将颜色、尺寸、圆角、内边距、排印及图标规格映射到对应 CSS 变量或语义别名。若缺少对应 Token，先记录来源并补入定义。 |
| 3. 修改组件 | 在 `packages/ui` 保留公开属性和默认值，文档沿用已有路由。例如 Button 的公开尺寸 `regular` 映射到 Token 的 `medium`。使用组件既有的原生或 Headless UI 交互。 |
| 4. 更新文档 | 按 `md/` 中的原稿替换 `apps/docs/content/components/` 下对应 `<id>.md` 和 `<id>.en.md` 的文案，保留文件名和 12 个二级标题。将测量值、来源和已知限制写入 Design Specifications。 |
| 5. 接入预览 | 复用共享 Live Preview Card。每个组件只展示已有的实际属性和行为，预览区居中，上下各留 160px。每张卡片独立切换 Preview / Code，卡片右上角的浅色 / 深色标签仅影响当前卡片。卡片默认跟随顶部外观按钮设置的全站主题，手动切换后保留卡片自己的选择。可复制的 TSX 与该卡片的组件配置一致。 |
| 6. 本地验收 | 比较浏览器计算值与 Token，核对浅深色、键盘、焦点和适用的禁用、选中或加载状态。验证两种语言、现有 URL、复制代码和窄屏布局。 |
| 7. 同步与上线 | 将已验收改动提交到公开仓库的独立分支并创建 PR。核对该提交的 CI 和 Vercel 预览后合并至 `main`，发布后用生产域名做回归检查。 |

构建与检查命令

```sh
pnpm tokens --check
pnpm build
pnpm typecheck
pnpm test
```

使用 `pnpm dev` 编辑 Markdown 时，保存后可看更新。使用 Vite 构建预览时，运行 `pnpm build` 后刷新页面。每次交付附本地预览、生产地址、测试结果及待确认项。若生产仍是上一版，应注明版本。

## 接下来的批次

| 批次 | 控件 | 交付重点 |
| --- | --- | --- |
| 第一批 | Button、IconButton | 完成直接引用 Token 的尺寸、圆角、内边距、排印和图标规格。核对五档尺寸和四张卡片，确认组件 API 与 Markdown 对齐。 |
| 第二批 | Checkbox、Switch、Text Field、Segmented Control | 迁移现有几何与状态 Token，保留原生输入和键盘行为，为实际支持的状态建立预览。 |
| 第三批 | Sidebar、Toolbar | 核对行高、分组间距、工具栏尺寸、图标与材质，验证真实窗口示例和窄屏行为。 |
| 后续 | 其余已有控件，再按需求补齐缺失控件 | 沿用同一套开发和验收流程。缺少正式资料的规格在对应文档中标注来源与待核对项。 |

- [Tahoe Tokens 规范](tokens.md)
- [组件审计](component-audit.md)
- [组件 Markdown 维护说明](../apps/docs/content/components/README.md)
- [本地预览](http://127.0.0.1:8897/)
- [Vercel 生产地址](https://macos-tahoe-components.vercel.app/)
