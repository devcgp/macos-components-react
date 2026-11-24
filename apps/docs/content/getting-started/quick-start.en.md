# Quick Start

Import the component and stylesheet, then render the button inside a theme container.

```tsx
import { Button } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Actions() {
  return <div data-theme="desktop"><Button variant="accent">Save</Button></div>
}
```
