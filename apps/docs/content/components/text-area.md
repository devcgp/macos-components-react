# Text Area

## Overview

录入多行说明。

## Anatomy

标签与原生 textarea。

## Live Preview

## Sizes

最小高度 64px。

## Variants

默认、焦点、禁用。

## States

默认、焦点、禁用。

## Behavior

保留多行编辑与表单语义。

## Accessibility

保留多行编辑与表单语义。

## API Reference

label 及原生 textarea 属性。

## Code Example

```tsx
import { TextArea } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <TextArea label="备注" rows={3} />
    </div>
  )
}
```

## Design Specifications

最小高度 64px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Text Area](https://developer.apple.com/design/human-interface-guidelines/text-fields)
