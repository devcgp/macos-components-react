# Installation

使用 React 19、Node.js 22.12+ 和 pnpm 11.25.0。从 GitHub 获取源码并在本地构建组件包。

```sh
git clone https://github.com/devcgp/macos-components-react.git
cd macos-components-react
pnpm install --frozen-lockfile
pnpm --filter @cgpdesktopui/ui build
pnpm --filter @cgpdesktopui/ui pack --pack-destination "$PWD"
```

`@cgpdesktopui/ui` 是仓库里的组件包名。`--filter` 选中该包，`pack` 把它的构建产物打成一个可安装的 `.tgz` 文件，并将文件写到当前目录。

切换到你的 React 项目目录，将示例路径替换为刚生成的文件路径，再运行：

```sh
pnpm add /path/to/cgpdesktopui-ui-0.1.0.tgz
```

[快速入门](#/desktop/getting-started/quick-start)
