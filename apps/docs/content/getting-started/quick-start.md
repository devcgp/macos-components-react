# Quick Start

导入组件和样式，在主题容器内渲染按钮。

```tsx
import { Button } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Actions() {
  return <div data-theme="tahoe"><Button variant="accent">保存</Button></div>
}
```
