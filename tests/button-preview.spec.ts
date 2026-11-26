import { expect, test } from '@playwright/test'

test('shows all Button geometries and variants together', async ({ page }) => {
  await page.goto('/?lang=en#/desktop/button')
  const sizes = page.getByRole('region', { name: 'Button Sizes', exact: true })
  const geometry = [
    ['Mini', '16px', '4px', '7px', '10px'],
    ['Small', '20px', '5px', '10px', '11px'],
    ['Medium', '24px', '6px', '16px', '13px'],
    ['Large', '28px', '999px', '16px', '13px'],
    ['XL', '36px', '999px', '16px', '13px'],
  ] as const
  for (const [label, height, radius, padding, fontSize] of geometry) {
    const button = sizes.getByRole('button', { name: label, exact: true })
    await expect(button).toBeVisible()
    await expect(button).toHaveAttribute('data-size', label === 'Medium' ? 'regular' : label.toLowerCase())
    await expect(button).toHaveCSS('height', height)
    await expect(button).toHaveCSS('border-radius', radius)
    await expect(button).toHaveCSS('padding-inline-start', padding)
    await expect(button).toHaveCSS('font-size', fontSize)
  }
  const variants = page.getByRole('region', { name: 'Button Variants', exact: true })
  for (const label of ['Neutral', 'Accent', 'Destructive']) {
    const button = variants.getByRole('button', { name: label, exact: true })
    await expect(button).toBeVisible()
    await expect(button).toHaveAttribute('data-variant', label.toLowerCase())
    await expect(button).toHaveAttribute('data-size', 'regular')
  }
})

test('exercises native hover, press, focus, keyboard activation, disabled and busy states', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/?lang=en#/desktop/button')
  const states = page.getByRole('region', { name: 'Button States', exact: true })
  const result = states.locator('output')
  const disabled = states.getByRole('button', { name: 'Disabled', exact: true })
  const busy = states.getByRole('button', { name: 'Loading…', exact: true })
  await expect(disabled).toBeDisabled()
  await expect(busy).toBeDisabled()
  await expect(busy).toHaveAttribute('aria-busy', 'true')
  await disabled.evaluate(button => (button as HTMLButtonElement).click())
  await busy.evaluate(button => (button as HTMLButtonElement).click())
  await expect(result).toHaveText('')

  const hover = states.getByRole('button', { name: 'Hover', exact: true })
  await expect(hover).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.05)')
  await hover.hover()
  await expect(hover).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.08)')

  const pressed = states.getByRole('button', { name: 'Pressed', exact: true })
  await pressed.hover()
  await page.mouse.down()
  await expect(pressed).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)')
  await page.mouse.move(0, 0)
  await page.mouse.up()
  await expect(result).toHaveText('')

  const focus = states.getByRole('button', { name: 'Focus', exact: true })
  await pressed.focus()
  await page.keyboard.press('Tab')
  await expect(focus).toBeFocused()
  await expect.poll(() => focus.evaluate(button => button.matches(':focus-visible'))).toBe(true)
  await expect(focus).toHaveCSS('outline-style', 'none')
  await page.emulateMedia({ forcedColors: 'active' })
  await expect(focus).toHaveCSS('outline-style', 'solid')
  await expect(focus).toHaveCSS('outline-width', '2px')
  await focus.press('Space')
  await expect(result).toHaveText('Saved')

  const icon = page.getByRole('region', { name: 'IconButton', exact: true })
  const refresh = icon.getByRole('button', { name: 'Refresh', exact: true })
  await expect(refresh).toHaveAttribute('title', 'Refresh')
  await refresh.press('Enter')
  await expect(icon.locator('.preview-content output')).toHaveText('Refreshed')
})

test('follows global appearance while keeping card views and copy actions independent', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: async (source: string) => sessionStorage.setItem('copied-preview-code', source),
    })
  })
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/?lang=en#/desktop/button')
  const sizes = page.getByRole('region', { name: 'Button Sizes', exact: true })
  const variants = page.getByRole('region', { name: 'Button Variants', exact: true })
  await expect(sizes.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
  await expect(sizes.getByRole('button', { name: 'Medium' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.05)')
  await expect(variants.getByRole('button', { name: 'Neutral' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.05)')

  await page.getByRole('button', { name: 'Open documentation menu' }).click()
  await page.getByRole('button', { name: 'Switch to dark mode', exact: true }).click()
  await page.getByRole('button', { name: 'Close menu' }).click()
  await expect(sizes.getByRole('button', { name: 'Medium' })).toHaveCSS('background-color', 'rgba(255, 255, 255, 0.07)')
  await expect(variants.getByRole('button', { name: 'Neutral' })).toHaveCSS('background-color', 'rgba(255, 255, 255, 0.07)')
  await expect(variants.getByRole('button', { name: 'Accent' })).toHaveCSS('background-color', 'rgb(0, 145, 255)')

  const snippets = [
    ['Button Sizes', ['mini', 'small', 'regular', 'large', 'xl']],
    ['Button Variants', ['neutral', 'accent', 'destructive']],
    ['Button States', ['disabled', 'loading', 'useState']],
    ['IconButton', ['IconButton', 'label={labels.refresh}']],
  ] as const
  for (const [title, expected] of snippets) {
    const card = page.getByRole('region', { name: title, exact: true })
    await card.getByRole('tab', { name: 'Code', exact: true }).click()
    const code = card.locator('code.language-tsx')
    await expect(code.locator('.hljs-keyword').first()).toBeVisible()
    await expect(code).toContainText('@cgpdesktopui/ui/styles.css')
    for (const value of expected) await expect(code).toContainText(value)
    const source = await code.textContent()
    await card.getByRole('button', { name: 'Copy code', exact: true }).click()
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem('copied-preview-code'))).toBe(source)
    await expect(card.getByText('Copied', { exact: true })).toBeVisible()
  }

  await page.getByRole('button', { name: 'Open documentation menu' }).click()
  await page.getByRole('button', { name: 'Switch to light mode', exact: true }).click()
  await page.getByRole('button', { name: 'Close menu' }).click()
  await expect(sizes.getByRole('tab', { name: 'Code', exact: true })).toHaveAttribute('aria-selected', 'true')
  await sizes.getByRole('tab', { name: 'Preview', exact: true }).click()
  await expect(sizes.getByRole('button', { name: 'Medium' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.05)')
  await expect(variants.getByRole('tab', { name: 'Code', exact: true })).toHaveAttribute('aria-selected', 'true')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
})
