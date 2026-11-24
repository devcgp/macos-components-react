# applecn 产品对标与差距

## 样本

- [产品首页](https://applecn.vercel.app/) 把组件、测量依据、基础规范与安装入口组织成一条使用路径。
- [Button](https://applecn.vercel.app/components/button) 在同页展示外观、各档尺寸、代码、安装命令和源码。[Switch](https://applecn.vercel.app/components/switch) 展示开、关、禁用与设置行场景。
- [GitHub 仓库](https://github.com/STiXzoOR/applecn) 使用 pnpm Monorepo，分离 docs app、UI 源码、研究文档与测试。组件源码可通过 registry 分发，主题 CSS 由结构化数据生成，并用测试防止漂移。
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) 和 [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) 指导 Tahoe 的分类与交互。applecn 同时覆盖 macOS、iOS 和 Apple Web，本项目采用 macOS 26 范围。

## 差距与阶段

| 能力 | applecn 的交付 | Tahoe 现状与计划 |
| --- | --- | --- |
| 工程边界 | 文档与组件分包，预览消费真实组件。 | 已有 apps/docs 与 packages/ui。当前分支运行时代码已移除旧体系。保留 Vite、React、Headless UI 与 Lucide。 |
| 安装与分发 | 网站提供组件级 registry 命令和依赖解析。 | 当前私有仓库支持从源码构建并打包，不提供公开 npm 或 registry。第一阶段在所有组件页面提供可复制的真实安装流程及对应的包导入。后续评估发布或 registry。 |
| 组件文档 | 独立页面并排提供可操作样例、规格和源码。 | 已有预览、状态、API、复制和搜索。第一阶段补 Button／Switch 可核查规格与实际交互状态测试。其余页面的视觉规格仍需逐项补测。 |
| Token 可追溯性 | 结构化数据生成 CSS，并有漂移测试。 | 现有 Figma 色板带有历史来源，组件语义 CSS 集中维护。先用浏览器断言锁定核心几何，下一阶段建立主题数据生成及漂移检查。 |
| 视觉和可访问性 | 按平台标注测量来源，并有组件测试。 | 已渲染四项控件的浅深色对照。当前 Button 和 Switch 的数据来自第三方记录和网页实测。后续还需官方 Tahoe 26 节点核对、扩充状态矩阵、自动无障碍和浏览器覆盖。 |

阶段验收以已实现的 API、可重现的测量及浅深色交互测试为准。组件数量和视觉还原按 macOS 26 的实际需求推进。
