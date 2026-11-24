import { useState } from 'react'
import { Button, TextField } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const statesLabels = {
  initial: "Default",
  filled: "Filled",
  focus: "Focus with Tab",
  disabled: "Disabled",
  readOnly: "Read-only",
  required: "Required",
  value: "Photos",
  submit: "Check required field",
  passed: "Required field is valid.",
}

export function TextFieldStates({ labels = statesLabels }: { labels?: typeof statesLabels } = {}) {
  const [passed, setPassed] = useState(false)
  return (
    <form data-theme="tahoe" style={{ display: 'grid', gap: 'var(--tahoe-gap)', justifyItems: 'start' }}
      onSubmit={event => { event.preventDefault(); setPassed(true) }}>
      <TextField label={labels.initial}/>
      <TextField label={labels.filled} defaultValue={labels.value}/>
      <TextField label={labels.focus}/>
      <TextField label={labels.disabled} disabled defaultValue={labels.value}/>
      <TextField label={labels.readOnly} readOnly defaultValue={labels.value}/>
      <TextField label={labels.required} name="required-name" required onChange={() => setPassed(false)}/>
      <Button type="submit">{labels.submit}</Button>
      {passed && <output>{labels.passed}</output>}
    </form>
  )
}
