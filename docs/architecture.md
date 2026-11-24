# Architecture

`apps/docs` 是 Vite 文档站，使用 Workspace 协议依赖 `@macos-tahoe/ui`。`packages/ui` 直接基于 React、CSS 和无样式交互原语。UI 包的依赖方向不会指向 app。

## 构建

根目录 `pnpm build` 先生成 UI 的 ESM、声明文件、CSS 和色板数据，再构建文档站。文档站从 UI 的公共导出消费组件。UI 可以在没有文档站的情况下单独构建与打包。Vercel 以仓库根目录运行构建，产物位于 `apps/docs/dist`。

## 重构基线


## 验证边界

Playwright 运行实际文档站，覆盖工作区公共导出、浮层键盘行为、显示设置和截图。Web 窗口没有系统窗口管理能力。原始色板来自用于早期窗口的 Figma 文件，版本与 Tahoe 26 官方模板的关系尚无可核验记录。
