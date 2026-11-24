import { useId, useState } from 'react'
import { Button, TextField } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const formLabels = {
  field: "Folder name",
  submit: "Submit",
  missing: "Enter a folder name.",
  saved: "Submitted name",
}

export function TextFieldForm({ labels = formLabels }: { labels?: typeof formLabels } = {}) {
  const errorId = useId()
  const [invalid, setInvalid] = useState(false)
  const [submitted, setSubmitted] = useState('')

  return (
    <form data-theme="desktop" noValidate style={{ display: 'grid', gap: 'var(--desktop-gap)', justifyItems: 'start', overflowWrap: 'anywhere', minWidth: 0 }}
      onSubmit={event => {
        event.preventDefault()
        const name = String(new FormData(event.currentTarget).get('folder') ?? '').trim()
        setInvalid(!name)
        setSubmitted(name)
      }}>
      <TextField label={labels.field} name="folder" required aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined} onChange={() => setInvalid(false)}/>
      {invalid && <span role="alert" id={errorId}>{labels.missing}</span>}
      <Button type="submit">{labels.submit}</Button>
      <output>{submitted && <>{labels.saved}: {submitted}</>}</output>
    </form>
  )
}
