import { useState, type ReactNode } from 'react'
import { Button } from '@cgpdesktopui/ui'
import { useLocale } from '../app/locale'

export default function CopyCode({ source, label, children }: { source: string; label: string; children: ReactNode }) {
  const { tr } = useLocale()
  const [feedback, setFeedback] = useState('')
  return <div>
    <Button onClick={async () => {
      try {
        await navigator.clipboard.writeText(source)
        setFeedback(tr('已复制', 'Copied'))
      } catch {
        setFeedback(tr('复制不可用，可手动选择文本', 'Clipboard unavailable. Select and copy the text manually.'))
      }
    }}>{label}</Button>
    {' '}<output>{feedback}</output>
    {children}
  </div>
}
