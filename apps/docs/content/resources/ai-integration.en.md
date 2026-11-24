# AI Integration

## Share project context

Give your coding assistant the design guidelines, token JSON and built component stylesheet below. For a component change, include its documentation and source. Use the exports and TypeScript types from the current commit.

## Integrate and verify

1. Follow the [installation guide](#/desktop/getting-started/installation) to build and link `@cgpdesktopui/ui` from the Git workspace.
2. Import `@cgpdesktopui/ui/styles.css` and set `data-theme="desktop"` on your app container. Use the downloadable CSS to inspect the build output.
3. Describe the interaction and states you need. Ask the assistant to reuse the component APIs and semantic tokens, and verify light and dark appearances, keyboard focus and disabled states.

```text
Read design.en.md and tokens.json, then inspect the component types in this project.
Use Desktop components and semantic variables. Preserve product copy and verify keyboard behavior and both appearances.
```

Read [Guidelines](/downloads/design.en.md), [Tokens](#/desktop/tokens) and the relevant [component API](#/desktop/button). Detailed visual specifications belong to [Foundations](#/desktop/foundations/control-geometry), not this workflow.
