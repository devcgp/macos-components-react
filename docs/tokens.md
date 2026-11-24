# Desktop Tokens

## 接入与作用域

从组件包加载样式，将组件放在 `data-theme="desktop"` 容器中。颜色、尺寸和上下文可以独立设置，也可以在容器内嵌套覆盖。

```tsx
import '@cgpdesktopui/ui/styles.css'

<div data-theme="desktop">
  <section data-appearance="dark" data-size="small" data-context="over-glass">
    {/* 这里可以读取该作用域的 --desktop-* 变量 */}
  </section>
</div>
```

| 维度 | 属性 | 可用值 |
| --- | --- | --- |
| 外观 | `data-appearance` | `light`、`dark`。网页全局外观仍由根元素的 `.dark` 控制。 |
| 尺寸 | `data-size` | `mini`、`small`、`medium`、`large`、`xl`，默认 Medium。 |
| 上下文 | `data-context` | `content-area`、`over-glass`，默认 Content Area。 |

尺寸 Token 提供 5 档、每档 64 个几何参数。组件原有的尺寸属性和默认值由各自 API 定义。上下文属性提供 Token 标记，玻璃样式由 `data-material` 单独设置。

## 变量与来源

| 用途 | 示例 | 来源 |
| --- | --- | --- |
| 色板 | `--desktop-accents-blue`、`--desktop-vibrant-fills-secondary` | `tokens.json` 的浅色和深色映射，可在[系统色彩](#/desktop/foundations/color)查看。 |
| 语义色 | `--desktop-window-background-figma`、`--desktop-miscellaneous-scrollbar` | 由同一份颜色源生成。 |
| 尺寸、排印 | `--desktop-global-height`、`--desktop-type-body-regular-size` | 源文件的尺寸与文字样式，经归一化后写入 CSS。 |
| 组件已有变量 | `--desktop-accent`、`--desktop-label`、`--desktop-control-height` | 组件仍沿用原有调用方式与 Web 几何规则。 |
| 材质 | `--desktop-figma-liquid-glass-*` | 原始 Liquid Glass 参考参数。网页材质通过 `data-material` 选择。 |

运行 `pnpm tokens` 会从 `tokens.json` 生成色板与语义色 CSS。用 `pnpm tokens --check` 检查生成文件和兼容色板数据。

`data-material` 支持 `solid`、`vibrant`、`glass-regular` 和 `glass-clear`。网页在支持的浏览器中使用 `backdrop-filter`，并在减少透明度模式下使用实色表面。源文件中的部分材质参数仅作设计参考。

## 控件开发规范

所有新建和后续更新的控件都以最新版 Desktop Design Tokens 为准。已有 Token 覆盖的颜色、尺寸、圆角、内边距、字体和图标规格，应在 CSS 中直接引用对应变量或语义别名。需要新的设计值时，先补进 Token 定义，再由控件引用。

迁移时保留现有公开属性。例如迁移 Button 的尺寸规则时，公开 API 的 `regular` 对应 Token 的 `medium`。控件文档和 Live Preview 应反映同一套 Token 及其在浅色、深色中的渲染结果。

## 文档职责

本页负责 Token 数据、引用关系、作用域、主题与导出。详细视觉规范由 [Foundations](#/desktop/foundations/control-geometry) 维护。交互预览读取已有 JSON/CSS 数据源，不另建数值基准。JSON 和构建 CSS 在下载区提供。
