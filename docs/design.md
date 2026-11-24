# macOS Tahoe 26 设计规范

设计目标为 macOS 26 Tahoe。Apple HIG 用于平台交互与信息架构。组件尺寸、边框与材质必须记录来源等级。

| 来源等级 | 当前应用 |
| --- | --- |
| Apple HIG Confirmed | 目录导航、键盘可达性、窗口组织和清晰焦点。 |
| Tahoe UI Kit Verified | 四项核心组件未直接测量官方 Tahoe 26 节点，当前无官方节点验收记录。 |
| Third-party Measured | 常规 Button 与 Text Field 24px 高、6px 圆角，Checkbox 16 × 16px / 5.5px，Switch 54 × 24px。参见第三方 README。 |
| Project-defined Web Approximation | CSS 材质、窗口装饰、固定比例分栏、工具栏和文档场景。已导入色板保留来源，不作为 Tahoe 26 官方认证色值。 |

## 核心控件

- Button 使用 16 / 20 / 24 / 28 / 36px 尺寸。常规左右内边距 16px，围绕焦点使用双层光环。
- Text Field 常规高 24px，圆角 6px，单像素平面边框。浅色内容白，深色使用内容表面。
- Checkbox 使用 16 × 16px 色盒与 5.5px 圆角，保留实际 HTML 复选框。
- Switch 使用 54 × 24px 轨道、32 × 20px 滑块、2px 边距；开启后滑块移动 18px。
- Radio 保留浏览器的表单与键盘语义。Slider 采用 6px 轨道和 20 × 16px 滑块。
- Segmented Control 常规外框 24px，Pop-up Button 最小 84 × 24px、6px 圆角，菜单项至少 24px。

## 桌面布局

Sidebar 组间距 16px，行高 28px、圆角 5px、内缩 8px。组标题 11px，目录文字 13px。当前项使用灰色背景与 aria-current。Toolbar 示例最小高 52px，搜索宽 150px，窄容器允许换行。Window 的 16px 圆角与窗口层级使用网页实现。

## 外观与材质

组件位于 `data-theme="tahoe"` 容器中，深色通过根节点 `.dark` 切换。颜色和状态使用同一份 CSS 变量。内容采用实色，Glass 示例通过浏览器 backdrop-filter 近似并有实色回退。焦点和选中采用独立的样式。禁用控件保留原生语义，减少动态模式关闭装饰性过渡。

更多见 [Tokens](#/tahoe/tokens)。

- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [第三方 macOS Components](https://github.com/tamnguyenvan/macos-components)
