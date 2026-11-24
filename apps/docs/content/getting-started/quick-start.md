# Quick Start

导入 UI 包与样式，再为界面设置 Tahoe 主题容器。

```tsx
import { Button } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Actions() {
  return <div data-theme="tahoe"><Button variant="accent">保存</Button></div>
}
```
