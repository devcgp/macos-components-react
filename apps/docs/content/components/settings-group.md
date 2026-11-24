# Settings Group

## Overview

组织可在网页中应用的偏好设置。

## Anatomy

分组边框、标题和设置行。

## Live Preview

## Sizes

随行内容。

## Variants

支持插入开关等控件。

## States

支持插入开关等控件。

## Behavior

用 fieldset 与 legend 表达设置关系。

## Accessibility

用 fieldset 与 legend 表达设置关系。

## API Reference

title、children。

## Code Example

```tsx
import { SettingsGroup, Switch } from "@macos-tahoe/ui"
import "@macos-tahoe/ui/styles.css"

export function Example() {
  return (
    <div data-theme="tahoe">
      <SettingsGroup title="图库"><Switch label="显示文件名" /></SettingsGroup>
    </div>
  )
}
```

## Design Specifications

随行内容。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](#/tahoe/design)

## References

[Apple HIG · Settings Group](https://developer.apple.com/design/human-interface-guidelines/settings)
