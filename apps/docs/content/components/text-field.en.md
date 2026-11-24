# Text Field

> Component: `TextField` · Category: Selection and Input · Language: English\
> Documentation route: `#/tahoe/text-field` · Source: `packages/ui/src/components/AdditionalControls.tsx`\
> Design source: `packages/ui/src/styles/tahoe-tokens.css` · Status: current repository implementation (2026-11-17)

## Overview

Text Field is a **single-line plain-text input** styled for the macOS Tahoe-inspired UI library. Use it for file names, project names, short labels, and other brief editable text. It renders a native `<input type="text">` within a visible `<label>`. It is not a complete validation form or a specialized search component.

**Use for:** file and folder names, titles, short notes, concise settings. **Use alternatives for:** multiline content (TextArea), search-specific affordances (SearchField), or dedicated date and numeric controls.

**Implementation boundary:** `TextField` is exported from `AdditionalControls.tsx`; `label` is required; the input `type` is always `text`. Other native input props are forwarded, except `type`. Do not document proposed features as existing props.

## Anatomy

| Part | Implementation | Purpose |
| --- | --- | --- |
| Label | `<label className="tahoe-field-label">` | Visible, associated text that can focus the field |
| Input | `<input type="text">` | Native text editing and form behavior |
| Surface | `.tahoe-text-input.tahoe-field-control` | Solid surface, border and rounded corners |
| Placeholder | Native `placeholder` | Optional hint, not a replacement for a label |
| Focus ring | `:focus` / `:focus-visible` | Visible focus feedback |

The default layout is horizontally compact, with an `8px` gap from `--tahoe-gap`. Width is controlled by layout, input `className`, or the native `size` attribute.

## Live Preview

This section is rendered by **real React + TypeScript components** in the documentation application. Markdown describes the cards and acceptance rules; it does not execute JSX by itself.

### Preview cards

| Card | Preview content | Interaction requirements |
| --- | --- | --- |
| **Text Field Basics** | Empty, Placeholder and Default Value examples shown together | Edit, select and clear text; isolated instances |
| **Text Field States** | Default, Filled, Focused, Disabled, Read-only and Required | Genuine keyboard/mouse focus; disabled prevents editing; read-only allows selection |
| **Controlled Text Field** | `value` and `onChange` with live output | Live value updates and Reset; never use a visual imitation |
| **Form & Validation** | Text field, submit action and feedback | Native `required` plus application-level error text; working validation |
| **Text Field in Settings** | Rename a file or edit a setting | Compose with real Button/window/settings components without inventing TextField props |

Each card has two **independent tab sets**: `Preview / Code` and `Light / Dark`. Preview is the default. Code shows complete, copyable TSX. Theme and view changes must not reset the entered text or internal demo state.

Hover, Focus, and Editing must be tested through actual interaction, not simulated screenshots. Error text in a composed example does not imply a built-in `error` or `invalid` component prop.

## Sizes

The field uses one visual size, **Regular**. The native numeric `size` attribute is forwarded and specifies the input width in characters.

| Dimension | Current CSS specification | Source |
| --- | --- | --- |
| Height | `24px` | `--tahoe-control-height` |
| Corner radius | `6px` | `--tahoe-control-radius` |
| Left padding | `8px` | `.tahoe-field-control.tahoe-text-input` |
| Right padding | `4px` | `.tahoe-field-control.tahoe-text-input` |
| Border | `1px` | `--tahoe-field-border` |
| Text size | `13px` | `--tahoe-regular-type` |
| Label/input gap | `8px` | `--tahoe-gap` |

These measurements describe the current project's CSS/web implementation, not verified measurements from an official Apple Tahoe 26 Figma asset. Do not invent Mini/Small/Large variants.

## Variants

There is no `variant` prop. Placeholder, read-only, disabled and required are content/native states, **not** visual variants.

The component fixes `type="text"`; it does not expose `password`, `email`, `number` or `search` types. Use an appropriate separate component for other input semantics rather than claiming unsupported variants.

## States

| State | Trigger | Behavior |
| --- | --- | --- |
| Empty | Empty value | Blank field |
| Placeholder | `placeholder` | Hint appears while value is empty |
| Filled | `value` / `defaultValue` | Displays entered text |
| Focused | Click or Tab | Focus styling uses `--tahoe-control-focus` |
| Disabled | `disabled` | Native editing and focus are unavailable; styling is muted |
| Read-only | `readOnly` | Text can be focused, selected and copied but not edited |
| Required | `required` | Participates in native constraint validation; no built-in message |
| Invalid | Native form or application validation | Browser may validate; no built-in error presentation |

Do not claim a specialized hover border effect unless verified in CSS. IME, clipboard and undo behavior remain browser-native.

## Behavior

- Clicking the input or its wrapping label focuses the field.
- Editing, selecting, copying, pasting and caret movement use native input behavior.
- Controlled use requires `value` and `onChange`; uncontrolled use can use `defaultValue`.
- `onChange` receives a React event, not a new string. Read `event.currentTarget.value`.
- `name`, `required`, `maxLength`, `minLength` and `autoComplete` are forwarded as native input attributes.
- No automatic saving, asynchronous validation, clear button or form submission is built into the component.
- Width and overflow behavior are governed by layout, native input behavior and consumer styles.

## Accessibility

- A real native text input preserves keyboard and text-editing semantics.
- Required `label` is visibly associated via a wrapping `<label>`.
- Use `aria-describedby` for external hint/error content, and `aria-invalid` for application-side invalid states.
- `id` and `name` remain available for form association and submission.
- Preserve visible focus in both Light and Dark themes.
- Placeholder text must not replace the label.
- Disabled and read-only must be tested separately.
- Check zoom, high-contrast rendering, translated labels and keyboard navigation.

## API Reference

Current public signature:

```tsx
export function TextField(
  { label, className = '', ...props }:
  Omit<React.ComponentProps<'input'>, 'type'> & { label: string }
)
```

| Prop | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | `string` | Yes | — | Visible accessible label |
| `className` | `string` | No | `''` | Appended to input, not the wrapping label |
| `value` | Native React input value | No | — | Controlled value |
| `defaultValue` | Native React input value | No | — | Uncontrolled initial value |
| `onChange` | `React.ChangeEventHandler<HTMLInputElement>` | No | — | Receives a React event |
| `placeholder` | `string` | No | — | Hint text |
| `size` | `number` | No | Browser default | Native character-width hint. Height and corner radius use Regular geometry. |
| `disabled` | `boolean` | No | `false` | Disables editing and focus |
| `readOnly` | `boolean` | No | `false` | Prevents editing |
| `required` | `boolean` | No | `false` | Native required constraint |
| `name` / `id` | `string` | No | — | Form/association attributes |
| `autoComplete`, `maxLength`, `minLength` | Native input props | No | — | Browser behavior |

`type` is explicitly omitted and set to `text`. There are no custom `variant`, `loading`, `error` or `clearable` props.

## Code Example

### Basic

```tsx
import { TextField } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function NameField() {
  return (
    <div data-theme="tahoe">
      <TextField label="Name" placeholder="Enter a folder name" defaultValue="Photo Library" />
    </div>
  )
}
```

### Controlled

```tsx
import { useState } from 'react'
import { TextField } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function RenameField() {
  const [name, setName] = useState('Photos')
  return (
    <div data-theme="tahoe">
      <TextField
        label="Folder name"
        name="folderName"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <output>Current name: {name}</output>
    </div>
  )
}
```

### Native required constraint and application validation

```tsx
import { useId, useState, type FormEvent } from 'react'
import { TextField } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export function FolderForm() {
  const errorId = useId()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) { setError('Enter a name'); return }
    setError('')
  }
  return (
    <form data-theme="tahoe" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Folder name" name="folder" required
        value={name} onChange={(event) => { setName(event.currentTarget.value); setError('') }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId} role="alert">{error}</p>}
      <button type="submit">Save</button>
    </form>
  )
}
```

Validation text and submit button are application-level example content, not TextField features. Prefer the project's existing Button component where appropriate.

## Design Specifications

### Tahoe Design Tokens

| Token | Role |
| --- | --- |
| `--tahoe-control-height` | Input height, 24px |
| `--tahoe-control-radius` | Corner radius, 6px |
| `--tahoe-field-border` | 1px border color |
| `--tahoe-content-surface` | Input background |
| `--tahoe-label` | Input and label text |
| `--tahoe-text-secondary` | Placeholder color |
| `--tahoe-regular-type` | Typeface settings |
| `--tahoe-accent` / `--tahoe-focus` | Focus accents |
| `--tahoe-control-focus` | Layered focus ring |
| `--tahoe-control-transition` | Focus transition |

Import `@macos-tahoe/ui/styles.css` and render within a `data-theme="tahoe"` container. The root `.dark` class controls the site theme. Live Preview cards follow it by default and use `data-appearance` when a card's theme is selected.

**Source classification:** dimensions derive from the current web CSS and third-party comparisons; there is no verified measurement of the official Apple Tahoe 26 Figma component.

Review background/border contrast, disabled legibility, focus ring, long translated labels, narrow layout and overflow. CSS changes should reuse Tahoe semantic tokens, not introduce hard-coded color values.

## References

- [Project source: TextField](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/components/AdditionalControls.tsx)
- [Project CSS: Tahoe Tokens](https://github.com/devcgp/macos-components-react/blob/main/packages/ui/src/styles/tahoe-tokens.css)
- [Project design guidelines](https://github.com/devcgp/macos-components-react/blob/main/docs/design.md)
- [Project token documentation](https://github.com/devcgp/macos-components-react/blob/main/docs/tokens.md)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

> Maintenance rule: when Codex changes the component API, CSS geometry or behavior, update both `text-field.md` and `text-field.en.md` and validate the real-component previews.
