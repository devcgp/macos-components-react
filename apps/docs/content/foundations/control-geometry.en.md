# Control Geometry

Project specification. Regular Button and Text Field are 24px high with 6px corners. Other components define their own geometry and states.

## Existing cross-control baseline

## Core controls

- Button sizes are 16, 20, 24, 28 and 36px. Regular horizontal padding is 16px. Focus uses a two-layer ring.
- Regular Text Field is 24px high with a 6px radius and a flat 1px border. The light surface is white; dark uses the content surface token.
- Checkbox is 16 × 16px with a 5.5px radius and retains a native HTML checkbox.
- Switch uses a 54 × 24px track and a 32 × 20px thumb inset by 2px. The thumb moves 18px when enabled.
- Radio retains browser form and keyboard semantics. Slider uses a 6px track and a 20 × 16px thumb.
- Regular Segmented Control is 24px high. Pop-up Button is at least 84 × 24px with a 6px radius. Menu items are at least 24px high.

## Desktop layout

Sidebar uses a 16px group gap, 28px rows, 5px corners and 8px insets. Group titles are 11px and item labels are 13px. The current item uses a gray background and aria-current. The Toolbar example is at least 52px high with a 150px search field and wraps in narrow containers. Window uses a 16px radius and web-based layering.

## Appearance and materials

Place components inside `data-theme="desktop"` and toggle `.dark` on the root. Colors and states share CSS variables. Content uses solid surfaces. Glass examples use backdrop-filter with a solid fallback. Focus and selection are distinct. Disabled controls retain native semantics and reduced motion removes decorative transitions.

See [Tokens](#/desktop/tokens) for usage and scope.

- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [Third-party macOS Components](https://github.com/tamnguyenvan/macos-components)
