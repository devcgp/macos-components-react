# Component documentation

每个组件使用 `<route-id>.md` 和 `<route-id>.en.md`，对应简体中文、英文及现有 `#/desktop/<route-id>` 路由。页面标题、正文、规格表、代码示例和参考资料都在 Markdown 中维护。导航标题和 HIG 分类仍来自 `src/app/catalog.ts`。

两个语言版本使用相同的章节名称与顺序。站点按所选语言显示标题，并保留固定的章节锚点。尚未核实的内容可以在对应章节标注 TODO。

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

在 `## Live Preview` 下可以写说明或链接。交互示例由站点按组件路由挂载，从 `@cgpdesktopui/ui` 导入实际控件。`## Code Example` 下使用 TSX 代码围栏保存可复制的示例，安装命令由页面模板提供。

## 本地替换文档

可以直接覆盖 `button.md` 和 `button.en.md` 之类的文件。文件名对应原有路由与语言，保留当前的 12 个二级标题及顺序。使用 `pnpm dev` 时保存后可查看更新。使用构建预览时，先运行 `pnpm build`，再刷新预览页面。

## 提供新原稿

把待采用的 Markdown 放到仓库根目录的 `md/`。后续开发以这些原稿为入口，将文案替换到本目录对应的语言文件，同时按最新版 Desktop Design Tokens 更新控件和 Live Preview。具体步骤见[开发与发布流程](../../../../docs/development-workflow.md)。
