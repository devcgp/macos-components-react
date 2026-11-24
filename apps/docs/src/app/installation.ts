export const installCommands = `git clone https://github.com/devcgp/macos-components-react.git
cd macos-components-react
pnpm install --frozen-lockfile
pnpm --filter @cgpdesktopui/ui build
pnpm --filter @cgpdesktopui/ui pack --pack-destination .
# 在你的 React 19 项目目录运行，路径指向刚生成的文件
pnpm add /path/to/cgpdesktopui-ui-0.1.0.tgz`
