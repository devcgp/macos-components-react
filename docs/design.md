# macOS Tahoe 26 设计规范

设计目标为 macOS 26 Tahoe。Apple HIG 用于平台交互与信息架构。组件尺寸、边框与材质必须记录来源等级。

| 来源等级 | 当前应用 |
| --- | --- |
| Apple HIG Confirmed | 目录导航、键盘可达性、窗口组织和清晰焦点。 |
| Tahoe UI Kit Verified | 四项核心组件未直接测量官方 Tahoe 26 节点，当前无官方节点验收记录。 |
| Third-party Measured | 常规 Button 与 Text Field 24px 高、6px 圆角，Checkbox 16 × 16px / 5.5px，Switch 54 × 24px。参见第三方 README。 |
| Project-defined Web Approximation | CSS 材质、窗口装饰、固定比例分栏、工具栏和文档场景。已导入色板保留来源，不作为 Tahoe 26 官方认证色值。 |

## 设计原则

保持内容可读、交互可预期、焦点清晰。明确区分 Apple 指南、第三方测量和项目自定义网页近似，不将网页近似称为 Apple 官方认证。

## 跨组件规则

复用语义变量与实际组件 API，保留键盘语义，区分焦点、选中和禁用状态。设计变更先在系统确认，再向下游应用；核对浅深外观和减少动态效果。

## Foundations 详细规范

具体数值与预览集中在[色彩](#/tahoe/foundations/color)、[字体](#/tahoe/foundations/typography)、[控件几何](#/tahoe/foundations/control-geometry)、[布局](#/tahoe/foundations/layout)和[材质](#/tahoe/foundations/materials)。各组件精确尺寸与 API 见对应组件文档。

## 实现入口

数据、作用域和导出见 [Design Tokens](#/tahoe/tokens)，AI 操作流程见 [AI Integration](#/tahoe/resources/ai-integration)。数值仍使用现有 Token 定义；本次结构整理不改变组件行为。
