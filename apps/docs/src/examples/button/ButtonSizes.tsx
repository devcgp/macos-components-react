import { Button } from '@cgpdesktopui/ui'
import '@cgpdesktopui/ui/styles.css'

const sizes = [
  ['mini', 'Mini'],
  ['small', 'Small'],
  ['regular', 'Medium'],
  ['large', 'Large'],
  ['xl', 'XL'],
] as const

export function ButtonSizes() {
  return (
    <div data-theme="desktop" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
      {sizes.map(([size, label]) => <Button key={size} size={size}>{label}</Button>)}
    </div>
  )
}
