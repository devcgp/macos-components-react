# Quick Start

Import the component and stylesheet, then render the button inside a theme container.

```tsx
import { Button } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Actions() {
  return <div data-theme="tahoe"><Button variant="accent">Save</Button></div>
}
```
