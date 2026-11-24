# Installation

Use React 19, Node.js 22.12+ and pnpm 11.25.0. Clone the public repository and build the UI package.

```sh
git clone https://github.com/devcgp/macos-components-react.git
cd macos-components-react
pnpm install --frozen-lockfile
pnpm --filter @macos-tahoe/ui build
pnpm --filter @macos-tahoe/ui pack --pack-destination "$PWD"
```

`@macos-tahoe/ui` is the workspace package name. The `--filter` flag selects that package, and `pack` creates an installable `.tgz` archive from its build output in the current directory.

From your React project directory, replace the example path with the path to the generated archive and run:

```sh
pnpm add /path/to/macos-tahoe-ui-0.1.0.tgz
```

[Quick Start](#/tahoe/getting-started/quick-start)
