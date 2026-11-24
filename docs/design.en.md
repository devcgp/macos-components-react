# macOS Design Guide

The library targets macOS 26 Desktop. Apple HIG informs platform interactions and information architecture. Record where component dimensions, borders and materials come from.

| Evidence | Current use |
| --- | --- |
| Apple HIG | Navigation, keyboard access, window organization and visible focus. |
| macOS UI Kit | The four core controls have not been measured directly against official macOS 26 nodes. |
| Third-party measurements | Regular Button and Text Field are 24px high with 6px corners, Checkbox is 16 × 16px with a 5.5px radius, and the Switch track is 54 × 24px. |
| Web approximations | CSS materials, window decoration, fixed-proportion panes, toolbars and documentation examples. Imported swatches retain their provenance. |

## Principles

Keep content legible, interactions predictable and focus clear. Record whether a rule comes from Apple guidance, third-party measurement or a project-defined web approximation. Do not present web approximations as Apple certification.

## Cross-component rules

Reuse semantic variables and actual component APIs. Maintain keyboard semantics and distinct focus, selected and disabled states. Confirm changes in the design system before downstream adoption. Preserve light/dark appearance and reduced-motion behavior.

## Foundations

Detailed values and previews belong to [Color](#/desktop/foundations/color), [Typography](#/desktop/foundations/typography), [Control Geometry](#/desktop/foundations/control-geometry), [Layout](#/desktop/foundations/layout) and [Materials](#/desktop/foundations/materials). For exact component dimensions, use the corresponding component documentation.

## Implementation

Use [Design Tokens](#/desktop/tokens) for data, scope and exports, and [AI Integration](#/desktop/resources/ai-integration) for assistant instructions. Values remain sourced from the existing token definitions; this restructuring does not change component behavior.
