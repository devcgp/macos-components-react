import { useState } from 'react'
import { Button, Checkbox } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

export const formLabels = {
  legend: "Photo details",
  filenames: "File names",
  extensions: "File extensions",
  sizes: "Image sizes",
  submit: "Submit options",
  empty: "No options selected",
}

export function CheckboxForm({ labels = formLabels }: { labels?: typeof formLabels } = {}) {
  const [submitted, setSubmitted] = useState<string[] | null>(null)

  return (
    <form data-theme="tahoe" style={{ display: 'grid', gap: 'var(--tahoe-gap)', justifyItems: 'start' }}
      onSubmit={event => {
        event.preventDefault()
        setSubmitted(new FormData(event.currentTarget).getAll('photo-details').map(String))
      }}>
      <fieldset style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tahoe-gap)' }}>
        <legend>{labels.legend}</legend>
        <Checkbox label={labels.filenames} name="photo-details" value="filenames" defaultChecked/>
        <Checkbox label={labels.extensions} name="photo-details" value="extensions"/>
        <Checkbox label={labels.sizes} name="photo-details" value="sizes"/>
      </fieldset>
      <Button type="submit">{labels.submit}</Button>
      <output>{submitted && (submitted.join(', ') || labels.empty)}</output>
    </form>
  )
}
