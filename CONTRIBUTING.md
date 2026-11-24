# Contributing · 贡献指南

欢迎提交文档、Tokens、组件和无障碍改进。阅读[来源审查](docs/PROVENANCE.md)，仅提交你有权提供的内容。修改文档时同步中文和英文。组件改动应覆盖键盘、浅深外观和响应式行为。

Contributions to documentation, tokens, components and accessibility are welcome. Read the [provenance review](docs/PROVENANCE.md) and submit material you have permission to share. Update both document languages. For component changes, verify keyboard behavior, light and dark appearance, and responsive layout.

```sh
pnpm install --frozen-lockfile
pnpm tokens --check
pnpm build
pnpm typecheck
pnpm exec playwright install chromium
pnpm test
```

提交 PR 时提供问题、改动、验收证据和 Vercel 预览。维护者核对同一提交的 `validate` 检查和预览后审核，合并后验证生产域名与下载。通过公开分支或 fork 提交 PR。独立维护者可复核后合并。

Open a PR with the problem, changes, verification evidence and Vercel preview. Maintain the review gate until the `validate` check and preview pass for the same commit. After merge, confirm the production domain and downloads. Contribute on a topic branch or fork and request independent maintainer review.
