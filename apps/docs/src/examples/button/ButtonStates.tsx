import { useState } from 'react'
import { Button } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

export const stateLabels = {
  save: "Save",
  hover: "Hover",
  pressed: "Pressed",
  focus: "Focus",
  disabled: "Disabled",
  loading: "Loading…",
  done: "Saved",
  hint: "Move the pointer over Hover, hold down Pressed, or reach Focus with the Tab key.",
}

export function ButtonStates({ labels = stateLabels }: { labels?: typeof stateLabels } = {}) {
  const [message, setMessage] = useState('')
  const activate = () => setMessage(labels.done)

  return (
    <div data-theme="desktop">
      <p>{labels.hint}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <Button onClick={activate}>{labels.save}</Button>
        <Button onClick={activate}>{labels.hover}</Button>
        <Button onClick={activate}>{labels.pressed}</Button>
        <Button onClick={activate}>{labels.focus}</Button>
        <Button onClick={activate} disabled>{labels.disabled}</Button>
        <Button onClick={activate} variant="accent" loading>{labels.loading}</Button>
        <output>{message}</output>
      </div>
    </div>
  )
}
