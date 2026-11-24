import { Button } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

const variants = [
  ['neutral', 'Neutral'],
  ['accent', 'Accent'],
  ['destructive', 'Destructive'],
] as const

export function ButtonVariants() {
  return (
    <div data-theme="desktop" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {variants.map(([variant, label]) => <Button key={variant} variant={variant}>{label}</Button>)}
    </div>
  )
}
