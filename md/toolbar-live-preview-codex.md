# Codex — Implement Toolbar Documentation & Live Preview

## Goal

Improve the existing **Toolbar** component and implement real, reusable Live Preview cards on its documentation page. Work in the existing `devcgp/macos-components-react` React + TypeScript repository. **Do not recreate the project or introduce unrelated components.**

## Required sources and precedence

1. `apps/docs/content/components/toolbar.md` — Chinese spec.
2. `apps/docs/content/components/toolbar.en.md` — English equivalent.
3. `packages/ui/src/components/toolbar.tsx` — current implementation and public API.
4. `packages/ui/src/styles/desktop-tokens.css`, related existing style files — authoritative project Design Tokens.
5. `docs/design.md`, `docs/tokens.md`, `apps/docs/src/app/catalog.ts` — documentation and navigation conventions.
6. Existing Button, Search, Window and Sidebar components **only after checking their real exports and props**.

If the local repository differs from these documents, inspect the current source and reconcile with the documents. Do not manufacture APIs to make examples look complete. Keep the Chinese/English documentation aligned with any approved implementation changes.

## Current component contract

```tsx
type ToolbarProps = {
  title: string
  detail?: React.ReactNode
  filters?: React.ReactNode
  actions?: React.ReactNode
  search?: React.ReactNode
}
```

Toolbar renders a semantic `<header>`; its filter/action wrappers use `role="group"`, and slots receive **caller-supplied** React elements. It has no `size`, `variant`, `theme`, `onSearch`, `loading`, or toolbar-owned selection state.

Existing CSS uses `--desktop-toolbar-height` (52px minimum), `--desktop-toolbar-search-width` (150px reference), `--desktop-toolbar-surface`, `--desktop-separator`, `--desktop-label`, and the shared Desktop fills and typography. Prefer these tokens; do not create a new palette, hardcode theme colors, or call project approximations Apple-official measurements.

## Documentation requirements

- Chinese `toolbar.md` and English `toolbar.en.md` each retain **the same 12 sections** in this order: Overview, Anatomy, Live Preview, Sizes, Variants, States, Behavior, Accessibility, API Reference, Code Example, Design Specifications, References.
- Render Markdown as documentation prose. Insert real React preview cards at the Live Preview section through the existing documentation infrastructure.
- Retain the existing `#/desktop/toolbar` route. Support the English document through the site's existing locale approach; if no locale routing exists, do not invent a new routing framework just for Toolbar.
- Avoid duplicating the preview JSX inside Markdown source.

## Shared Live Preview Card (all cards)

**Header:** card title on left; independent `Light / Dark` segmented tabs on right.

**Body:** independent `Preview / Code` tabs. Preview is the default.

**Preview:** render the actual exported `Toolbar`, with actual exported child controls. Mouse/keyboard interaction must work.

**Code:** show corresponding runnable React + TypeScript (TSX), with syntax highlighting and `Copy Code`. Include accurate imports, local state, and necessary styles. Copy text exactly as displayed. The code example must reflect the card's real composition and current demo state where relevant.

- Theme switching must affect **only the current preview card** (not the global docs page or another card). Verify existing `.dark` and `[data-theme="desktop"]` selector behavior and introduce only the minimal scoped adaptation needed.
- Switching Preview/Code must not reset Light/Dark state. Preserve demo interaction state where reasonable.
- Reuse the shared card already used by Button/Checkbox/Slider/Switch/Sidebar if present; extend it instead of copying infrastructure.
- No fake buttons, fake search functionality, static screenshots, or unsupported Toolbar props.

## Toolbar-specific cards

### Card 01 — Toolbar Composition

Render **three examples at the same time** using the real Toolbar:
1. Title only.
2. Title + detail.
3. Title + filters + actions + search.

Label each example. Code shows three actual compositions. Distinguish optional slots from built-in Toolbar features.

### Card 02 — Filters & Actions

Include working view-switch buttons, actionable buttons, and a disabled example using verified existing components. The example app owns its selection state (e.g. `useState<'grid'|'list'>`). If a selected button is represented with `aria-pressed`, ensure its value matches the actual state. Do not add fake `selected` or `onFilterChange` props to Toolbar. Demonstrate relevant keyboard and focus interactions.

### Card 03 — Search Slot

Render a toolbar with a real editable search field, then optionally filter a **small local demo dataset** below it to prove interaction. Confirm SearchField/Search API before using it; otherwise use a semantically labeled native `<input type="search">` inside the `search` slot with appropriate styling. Show a contrasting toolbar without search. Do not present this as Toolbar's own search implementation.

### Card 04 — Responsive Layout

Add UI controls outside the component to change **the preview container width** (e.g. Wide / Medium / Narrow). Render the same Toolbar inside the selected width; validate wrapping, non-clipping of actions, readable titles, and reachable search input. These preview controls are documentation-only—not Toolbar props. Do not invent an overflow menu or a breakpoint API.

### Card 05 — Toolbar in Window

Compose Toolbar with the repository's real Window / Sidebar / content components **only after verifying their signatures**. Demonstrate surfaces and separators, layout hierarchy, and an interactive action. Avoid duplicating a second title bar incorrectly. If the actual Window API cannot accommodate this composition cleanly, use a simple CSS parent shell and explicitly describe it as a demonstration wrapper.

## Accessibility & i18n audit

- Existing Toolbar hardcodes the filter and action `aria-label` values in Chinese. Confirm and address this for English previews in the smallest backward-compatible way; if an API extension is needed, update both documents and examples, then test it. Do not claim the extension exists until implemented.
- Icon-only actions must have accessible names; search inputs must have labels.
- Keep `<header>` semantics. Do **not** add `role="toolbar"` casually: that pattern has its own keyboard model and is not already implemented.
- Verify keyboard focus visibility and child interactions in both themes, including at narrow widths.
- If long text, tooltip, disabled, or overflow cases are only supported by slotted controls, document them as child behavior.

## Tokens and visual fidelity

- Use the current **Desktop Design Tokens** for background, separators, text, accents, focus, hover, and selection.
- Layout: minimum height 52px; 8px/12px padding; 8px main gap; 6px controls gap; 2px group gap; 150px default search width, based on the checked CSS. Width may grow/shrink with parent layout.
- Support both Light/Dark without hardcoding new colors.
- Treat these values as project Web implementation, not verified Apple macOS 26 official geometry.

## Validation and deliverables

1. TypeScript typecheck and production build pass.
2. Existing Toolbar consumers and route still work; no breaking API changes.
3. Every card shows real Preview/Code, independent Light/Dark and Copy Code.
4. Composition, filter/action interaction, input editing, responsive wrapping and window scene all work.
5. Copied code typechecks with the actual package exports and has correct imports.
6. Chinese/English docs preserve all 12 headings and match the implementation.
7. Report changed files, tests performed, and any remaining limitations. Do not silently mark an unimplemented requirement complete.

**Scope:** Toolbar component, its documentation, and its Live Preview only. Do not refactor the whole design system.
