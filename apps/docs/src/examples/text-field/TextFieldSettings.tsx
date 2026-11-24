import { useState } from 'react'
import { Button, SettingsGroup, TextField } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const settingsLabels = {
  title: "Folder settings",
  field: "Folder name",
  initial: "Photo Library",
  save: "Save",
  saved: "Saved folder name",
}

export function TextFieldSettings({ labels = settingsLabels }: { labels?: typeof settingsLabels } = {}) {
  const [draft, setDraft] = useState(labels.initial)
  const [saved, setSaved] = useState(labels.initial)
  const nextName = draft.trim()

  return (
    <form data-theme="tahoe" style={{ minWidth: 0, maxWidth: '100%', overflowWrap: 'anywhere' }}
      onSubmit={event => {
        event.preventDefault()
        if (nextName) setSaved(nextName)
      }}>
      <SettingsGroup title={labels.title}>
        <div style={{ display: 'grid', gap: 'var(--tahoe-gap)', justifyItems: 'start' }}>
          <TextField label={labels.field} name="folder" required value={draft}
            onChange={event => setDraft(event.currentTarget.value)}/>
          <Button type="submit" disabled={!nextName || nextName === saved}>{labels.save}</Button>
          <output>{labels.saved}: {saved}</output>
        </div>
      </SettingsGroup>
    </form>
  )
}
