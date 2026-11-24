# Installation

使用 React 19、Node.js 22.12+ 和 pnpm 11.25.0。克隆公开仓库并构建组件包。

```sh
git clone https://github.com/devcgp/macos-components-react.git
cd macos-components-react
pnpm install --frozen-lockfile
pnpm --filter @macos-tahoe/ui build
pnpm --filter @macos-tahoe/ui pack --pack-destination "$PWD"
```

在你的 React 项目中安装生成的压缩包，将示例路径替换为实际路径。

```sh
pnpm add /path/to/macos-tahoe-ui-0.1.0.tgz
```

[快速入门](#/tahoe/getting-started/quick-start)
