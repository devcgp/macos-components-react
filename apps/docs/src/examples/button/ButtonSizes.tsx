import { Button } from '@macos-tahoe/ui'
import '@macos-tahoe/ui/styles.css'

const sizes = [
  ['mini', 'Mini'],
  ['small', 'Small'],
  ['regular', 'Regular'],
  ['large', 'Large'],
  ['xl', 'XL'],
] as const

export function ButtonSizes() {
  return (
    <div data-theme="tahoe" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
      {sizes.map(([size, label]) => <Button key={size} size={size}>{label}</Button>)}
    </div>
  )
}
