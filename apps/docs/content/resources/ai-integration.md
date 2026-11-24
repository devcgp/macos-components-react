# AI Integration · AI 集成

## 提供项目资料

向代码助手提供本页下方的设计规范、Token JSON 和随组件库构建的 CSS。需要修改组件时，附上对应组件文档与源码。以当前提交的导出和 TypeScript 类型为准。

## 集成与验收

1. 在项目中安装或链接组件包。按[安装指南](#/tahoe/getting-started/installation)从 Git 工作区构建 `@macos-tahoe/ui`。
2. 导入 `@macos-tahoe/ui/styles.css`，并在应用容器上设置 `data-theme="tahoe"`。下载的 CSS 可用于核对构建输出。
3. 指明所需的控件状态和交互。让助手使用现有组件 API 与语义变量，并核对浅色、深色、键盘焦点和禁用状态。

```text
先阅读 design.md 和 tokens.json，再检查本项目真实的组件类型。
使用 Tahoe 组件与语义变量。保留业务文案，验证键盘操作和浅深外观。
```

实现前引用[设计原则](/downloads/design.md)、[Tokens](#/tahoe/tokens)与对应[组件 API](#/tahoe/button)。详细视觉规范见 [Foundations](#/tahoe/foundations/control-geometry)，本页只维护操作流程。
