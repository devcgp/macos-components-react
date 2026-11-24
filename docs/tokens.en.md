# Desktop Tokens

## Setup and scope

Import the package stylesheet and place components inside a `data-theme="desktop"` container. Appearance, size, and context can be set independently and overridden in nested scopes.

```tsx
import '@cgpdesktopui/ui/styles.css'

<div data-theme="desktop">
  <section data-appearance="dark" data-size="small" data-context="over-glass">
    {/* Read the scoped --desktop-* variables here. */}
  </section>
</div>
```

| Axis | Attribute | Values |
| --- | --- | --- |
| Appearance | `data-appearance` | `light`, `dark`. The root `.dark` class still controls site-wide appearance. |
| Size | `data-size` | `mini`, `small`, `medium`, `large`, `xl`. Medium is the default. |
| Context | `data-context` | `content-area`, `over-glass`. Content Area is the default. |

There are five size modes with 64 geometry values each. Each component's API defines its existing size props and defaults. The context attribute exposes token metadata, while `data-material` selects the glass treatment separately.

## Variables and sources

| Use | Examples | Source |
| --- | --- | --- |
| Palette | `--desktop-accents-blue`, `--desktop-vibrant-fills-secondary` | Light and Dark mappings in `tokens.json`. Browse them in [System Colors](#/desktop/foundations/color). |
| Semantic colors | `--desktop-window-background-figma`, `--desktop-miscellaneous-scrollbar` | Generated from the same color source. |
| Size and type | `--desktop-global-height`, `--desktop-type-body-regular-size` | Geometry and text styles normalized from the source exports into CSS. |
| Existing component variables | `--desktop-accent`, `--desktop-label`, `--desktop-control-height` | Components retain their existing variables and web geometry rules. |
| Materials | `--desktop-figma-liquid-glass-*` | Raw Liquid Glass reference values. Set `data-material` to choose a web material. |

Run `pnpm tokens` to regenerate palette and semantic-color CSS from `tokens.json`. Use `pnpm tokens --check` to verify the generated files and compatibility swatches.

Available `data-material` values are `solid`, `vibrant`, `glass-regular`, and `glass-clear`. The web implementation uses `backdrop-filter` where supported and a solid surface when reduced transparency is enabled. Some material parameters from the source export are retained as design reference data.

## Component development

Build new components and update existing components against the latest Desktop Design Tokens. Where a token covers a color, size, radius, inset, type or icon specification, reference its CSS variable or semantic alias. Add any new design value to the token definitions before using it in a component.

Preserve existing public props during migration. For example, Button's public `regular` size maps to the `medium` token mode. The component documentation and Live Preview should reflect the same tokens and their rendered Light and Dark appearances.

## Documentation boundaries

This page owns token data, references, scope, themes and exports. Visual specifications live in [Foundations](#/desktop/foundations/control-geometry). Interactive previews read the existing JSON/CSS sources and do not define a separate set of values. JSON and built CSS are available in the downloads section.
