# Quick Start

Import the UI package and stylesheet, then wrap your interface with the Tahoe theme.

```tsx
import { Button } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Actions() {
  return <div data-theme="tahoe"><Button variant="accent">Save</Button></div>
}
```
