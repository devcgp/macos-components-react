# Tahoe 来源与公开审查

公开仓库以当前 Tahoe React 实现为初始版本。

| 范围 | 来源与发布条件 |
| --- | --- |
| 组件 | 当前组件位于 `packages/ui/src/components`，使用 React、Headless UI 与平台网页语义。Apple HIG 与第三方项目用于行为与尺寸参考，具体出处见 [设计规范](design.md)。 |
| 字体 | 当前源码使用系统字体栈，审查的 Git refs 未发现已提交的字体文件。日后分发字体文件须另核对条款。 |
| 图标 | 站点和组件通过 Font Awesome Free 包导入图标。图标按 CC BY 4.0、字体按 SIL OFL 1.1、代码按 MIT 分别处理。第三方许可与归属见 [Font Awesome 通知](../apps/docs/public/font-awesome-license.txt)。 |
| 图片与色板 | 项目维护者已确认可公开使用当前色板和 Token 数据。 |


- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Font Awesome Free License](https://fontawesome.com/license/free)
- 项目自有代码采用 [MIT](../LICENSE)。第三方内容遵循各自条款。
