# Progress Indicator

## Overview

让用户了解任务进度。

## Anatomy

进度轨道和填充。

## Live Preview

## Sizes

常规高 10px。

## Variants

确定进度与等待状态。

## States

确定进度与等待状态。

## Behavior

确定值用 0–100，等待省略 value。

## Accessibility

确定值用 0–100，等待省略 value。

## API Reference

label、value。

组件包同时导出 ProgressIndicator 和兼容别名 Progress。

## Code Example

```tsx
import { Progress } from "@cgpdesktopui/ui"
import "@cgpdesktopui/ui/styles.css"

export function Example() {
  return (
    <div data-theme="desktop">
      <Progress label="导入进度" value={45} />
    </div>
  )
}
```

## Design Specifications

常规高 10px。

当前为网页实现规格，官方节点与各状态参数仍待逐项核对。

[设计规范与来源](/downloads/design.md)

## References

[Apple HIG · Progress Indicator](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
