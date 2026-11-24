# Codex Prompt — Sidebar Component & Live Preview (Phase 1)

## Goal

Implement and verify the existing macOS `Sidebar` component and its interactive documentation. Use `apps/docs/content/components/sidebar.md` and `sidebar.en.md` as the requirements and documentation sources, while treating actual React/TypeScript/CSS code as the authoritative source for implemented APIs. Preserve existing working functionality and routes.

## Read first

- `packages/ui/src/components/sidebar.tsx`
- `packages/ui/src/styles/desktop-tokens.css`
- `packages/ui/src/styles/desktop-materials.css`
- `packages/ui/src/index.ts`
- `docs/design.md` and `docs/tokens.md`
- `apps/docs/src/app/catalog.ts`
- Existing `ComponentDocPage` / `ComponentPreview` rendering, language toggle, and Light/Dark implementations
- `apps/docs/content/components/sidebar.md` and `sidebar.en.md`

## Current implementation contract (verify again before editing)

```ts
type SidebarItem = { id: string; label: string; icon?: React.ReactNode }
type SidebarGroup = { id: string; label: string; items: SidebarItem[] }

Sidebar({ groups, selected, collapsed, onSelect, onToggle })
```

- All five props are required.
- Selection and collapsed groups are parent-controlled.
- Group heading calls `onToggle(id)`; item button calls `onSelect(id)`.
- Group heading exposes `aria-expanded`; current item exposes `aria-current="true"`.
- No `size`, `variant`, `disabled`, `defaultSelected`, `resizable`, or `theme` prop.
- Current `nav` accessible name is hardcoded Chinese `图库目录`; document this limitation. Only add localization support if it is deliberately implemented and tested, then update both MD files and API examples together.

## Documentation framework

- One page at `#/desktop/sidebar`, backed by `sidebar.md` (zh) and `sidebar.en.md` (en).
- Retain all 12 section headings: Overview, Anatomy, Live Preview, Sizes, Variants, States, Behavior, Accessibility, API Reference, Code Example, Design Specifications, References.
- All prose/spec tables/code outside Live Preview come from Markdown and remain independently editable.
- Live Preview renders real React components at the `## Live Preview` location; Markdown does not execute JSX.
- Do not overwrite substantial existing documentation with placeholders.

## Live Preview card system

Each card MUST have two independently working tab groups:

1. `Preview / Code` — default `Preview`; `Code` shows matching copyable, syntax-highlighted React + TypeScript, including imports, state, and event callbacks; a working **Copy Code** button.
2. `Light / Dark` — controls the **current card only**, preserving selected tab, selected sidebar item, and expanded/collapsed groups. Use the current Desktop theme mechanism; avoid changing the entire documentation site's theme. If CSS depends on `.dark` ancestors, implement card-local dark theme scoping (and test it) instead of assuming `data-theme="dark"` is a valid existing API.

Use the shared Preview Card foundation already used for Button/Checkbox/Slider/Switch when possible. Do not fork duplicate card UI.

### Card 1 — Sidebar Navigation

- Show 2–3 groups containing realistic items, some with Lucide ReactNode icons.
- Render real `<Sidebar groups={...} selected={selected} collapsed={collapsed} onSelect={...} onToggle={...} />`.
- Clicking an item updates selection, `aria-current`, and a companion content panel. The content panel is demo scaffolding, not a Sidebar prop.
- Code reproduces functional selection and group toggling using `useState`.

### Card 2 — Sidebar Groups

- Display at least two groups; one starts expanded, another collapsed.
- Allow independent expansion/collapse. Verify chevron rotation, list mount/unmount, `aria-expanded`, and state persistence while switching Preview/Code and Light/Dark.
- Code shows correct controlled `collapsed: string[]` state updates.

### Card 3 — Sidebar States

- Show Current/Selected and Expanded/Collapsed through genuine state.
- Verify Hover, Pressed, Focus via real pointer/keyboard interactions. A state instruction or dedicated test control is allowed; do not render a fake Sidebar for visual comparison.
- Do NOT show Disabled/Loading as implemented: they are not part of the current API.

### Card 4 — Sidebar in Window

- Compose Sidebar with a real content region and existing Desktop window layout primitives when available.
- Test width, 220px parent-layout width token, 28px row geometry, truncated labels, and narrow-card overflow.
- The viewport/window wrapper is an example composition, not intrinsic Sidebar functionality. Do not add `width`, `size`, `variant`, `resizable`, `onResize`, or `collapsedWidth` props merely to make the demo look comprehensive.

## Desktop Design Tokens

Reuse current tokens; do not add arbitrary hex color palettes or independently hardcode component dimensions:

- `--desktop-sidebar-width` (parent layout default 220px)
- `--desktop-sidebar-row-height` (28px)
- `--desktop-sidebar-row-radius` (5px)
- `--desktop-sidebar-inset` (8px)
- `--desktop-sidebar-group-gap` (16px)
- `--desktop-sidebar-surface`
- `--desktop-selection`
- `--desktop-accent`
- `--desktop-label`, `--desktop-text-secondary`
- `--desktop-fills-tertiary`, `--desktop-fills-primary`
- `--desktop-separator`
- `--desktop-font`, `--desktop-body`, `--desktop-caption`

Use `@cgpdesktopui/ui/styles.css`, `data-theme="desktop"`, and the existing `.dark` class theme resolution. Preserve the distinction between project Web approximation and official Apple HIG.

## Component quality checks

- Maintain React + TypeScript types and exported API compatibility.
- Functional semantics: `nav` + group buttons + `ul/li` + item buttons.
- Confirm Tab, Enter, Space, visible focus, `aria-expanded`, and `aria-current`.
- Check decorative icon accessibility.
- Audit that English documentation doesn't falsely imply an English accessible nav label is already supported.
- If code/test identifies a real defect, fix narrowly, then update both docs to match actual implementation.
- Do not add unsupported API based solely on desired screenshot appearance.

## Validation

1. Typecheck and production build.
2. Visit `#/desktop/sidebar` in both languages; verify Markdown sections are present and the correct translation loads.
3. Test all four cards, both tab groups, and working Copy Code.
4. Confirm each Code tab's sample typechecks with the real public API.
5. Test card-local Light/Dark on two cards independently, without altering the overall docs theme.
6. Test group/selection state persistence while switching tabs.
7. Test keyboard/mouse interactions and responsive/narrow layouts.
8. Ensure Button, Checkbox, Slider, Switch previews and existing links do not regress.

## Deliverable report

Summarize modified files, four implemented cards, design-token usage, typecheck/build/test results, known limitations, and any actual API changes (if made). No unrelated refactor or bulk generation of other components.
