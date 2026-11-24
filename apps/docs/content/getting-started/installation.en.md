# Installation

Use React 19, Node.js 22.12+ and pnpm 11.25.0. Clone the public repository and build the UI package.

```sh
git clone https://github.com/devcgp/macos-components-react.git
cd macos-components-react
pnpm install --frozen-lockfile
pnpm --filter @macos-tahoe/ui build
pnpm --filter @macos-tahoe/ui pack --pack-destination "$PWD"
```

From your React project, install the generated archive using its actual path.

```sh
pnpm add /path/to/macos-tahoe-ui-0.1.0.tgz
```

[Quick Start](#/tahoe/getting-started/quick-start)
