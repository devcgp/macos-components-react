# macOS Components for React

macOS Tahoe 26 风格的 React UI 包和开发文档。本站为独立的 Web 项目。Apple HIG 提供设计与交互依据。网页实现的来源与限制见 [设计规范](docs/design.md)。

[正式文档](https://cgpdesktopui.com/) · [English documentation](https://cgpdesktopui.com/?lang=en)

## 安装与开发

使用 Node.js 22.12+ 和 pnpm 11.25.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm exec playwright install chromium
pnpm test
```

文档站默认运行在 http://127.0.0.1:8897/。独立构建和打包组件库：

```sh
pnpm --filter @macos-tahoe/ui build
pnpm --filter @macos-tahoe/ui pack
```

```tsx
import { Button, TextField } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function Settings() {
  return <div data-theme="tahoe">
    <TextField label="图库名称" defaultValue="照片图库" />
    <Button variant="accent">保存</Button>
  </div>
}
```

将 `.dark` 添加到宿主根元素可切换深色。部署使用仓库根目录配置，Vercel 输出为 `apps/docs/dist`。详见[架构文档](docs/architecture.md)。

后续组件批次、验收和上线步骤见[开发与发布流程](docs/development-workflow.md)。

产品对标与阶段范围见 [applecn 差距分析](docs/benchmark-gap-analysis.md)。

## 许可证

项目自有代码采用 [MIT](LICENSE)。第三方声明见[来源审查](docs/PROVENANCE.md)。

## 贡献与发布

网站提供双语设计规范、Token 和 AI 指引下载。Resources 导航包含 AI 集成与 Community 贡献页。贡献流程与第三方来源见[贡献指南](CONTRIBUTING.md)和[来源审查](docs/PROVENANCE.md)。
