import { expect, test } from '@playwright/test'

test('toggles uncontrolled, controlled, and native form samples without React warnings', async ({ page }) => {
  const warnings: string[] = []
  page.on('console', message => {
    if (['warning', 'error'].includes(message.type()) && /controlled|warning:.*checked/i.test(message.text())) {
      warnings.push(message.text())
    }
  })
  await page.goto('/?lang=en#/tahoe/checkbox')
  await expect(page.getByRole('heading', { name: 'Checkbox', exact: true, level: 1 })).toBeVisible()
  await expect(page.locator('.tahoe-preview-card')).toHaveCount(4)

  const selection = page.getByRole('region', { name: 'Checkbox Selection', exact: true })
  const unchecked = selection.getByRole('checkbox', { name: 'Unchecked', exact: true })
  const checked = selection.getByRole('checkbox', { name: 'Checked', exact: true })
  await expect(unchecked).not.toBeChecked()
  await expect(checked).toBeChecked()
  await selection.getByText('Unchecked', { exact: true }).click()
  await expect(unchecked).toBeChecked()
  await checked.focus()
  await page.keyboard.press('Space')
  await expect(checked).not.toBeChecked()

  const controlled = page.getByRole('region', { name: 'Controlled Checkbox', exact: true })
  const control = controlled.getByRole('checkbox', { name: 'Show filenames', exact: true })
  await expect(controlled.locator('output')).toHaveText('Checked = false')
  await controlled.getByText('Show filenames', { exact: true }).click()
  await expect(control).toBeChecked()
  await expect(controlled.locator('output')).toHaveText('Checked = true')

  const form = page.getByRole('region', { name: 'Checkbox Group / Form', exact: true })
  await form.getByText('File extensions', { exact: true }).click()
  await form.getByRole('button', { name: 'Submit options' }).click()
  await expect(form.locator('output')).toHaveText('filenames, extensions')
  await expect(form.getByRole('checkbox', { name: 'Image sizes' })).not.toBeChecked()
  expect(warnings).toEqual([])
})

test('uses fixed Medium tokens and shows native hover, press, focus, and disabled states', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' })
  await page.goto('/?lang=en#/tahoe/checkbox')
  const states = page.getByRole('region', { name: 'Checkbox States', exact: true })
  const initial = states.getByRole('checkbox', { name: 'Default', exact: true })
  const box = initial.locator('+ .tahoe-checkbox-box')
  const enabledChecked = states.getByRole('checkbox', { name: 'Checked', exact: true })
  const disabledUnchecked = states.getByRole('checkbox', { name: 'Disabled unchecked', exact: true })
  const disabledChecked = states.getByRole('checkbox', { name: 'Disabled checked', exact: true })

  await expect(initial).not.toBeChecked()
  await expect(enabledChecked).toBeChecked()
  await expect(disabledUnchecked).toBeDisabled()
  await expect(disabledChecked).toBeDisabled()
  await disabledUnchecked.evaluate(input => (input as HTMLInputElement).click())
  await disabledChecked.evaluate(input => (input as HTMLInputElement).click())
  await expect(disabledUnchecked).not.toBeChecked()
  await expect(disabledChecked).toBeChecked()
  await expect(disabledChecked.locator('+ span svg')).toHaveCSS('opacity', '1')
  await expect(disabledUnchecked.locator('+ span svg')).toHaveCSS('opacity', '0')

  await states.evaluate(card => { card.dataset.size = 'mini' })
  await expect(box).toHaveCSS('width', '16px')
  await expect(box).toHaveCSS('border-radius', '5.5px')
  await expect(box).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.05)')
  const labelText = states.getByText('Default', { exact: true })
  await labelText.hover()
  await expect(box).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.08)')
  await page.mouse.down()
  await expect(box).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.15)')
  await page.mouse.up()

  await initial.focus()
  await page.keyboard.press('Tab')
  await expect(enabledChecked).toBeFocused()
  await expect(enabledChecked.locator('+ span')).toHaveCSS('box-shadow', /3\.5px/)
  await page.emulateMedia({ forcedColors: 'active' })
  await expect(enabledChecked).toHaveCSS('opacity', '1')
  await expect(enabledChecked).toHaveCSS('outline-style', 'solid')
  await expect(enabledChecked.locator('+ span')).toBeHidden()
})

test('controls each Checkbox preview separately from site appearance and copies the matching code', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: async (source: string) => sessionStorage.setItem('copied-checkbox-code', source),
    })
  })
  await page.goto('/?lang=en#/tahoe/checkbox')
  const states = page.getByRole('region', { name: 'Checkbox States', exact: true })
  const selection = page.getByRole('region', { name: 'Checkbox Selection', exact: true })
  const selectionBox = selection.getByRole('checkbox', { name: 'Checked', exact: true }).locator('+ span')
  const statesBox = states.getByRole('checkbox', { name: 'Checked', exact: true }).locator('+ span')
  const light = selection.getByRole('button', { name: 'Light', exact: true })
  const dark = selection.getByRole('button', { name: 'Dark', exact: true })
  await expect(light).toHaveAttribute('aria-pressed', 'true')
  await expect(dark).toHaveAttribute('aria-pressed', 'false')
  for (const box of [selectionBox, statesBox]) {
    await expect(box).toHaveCSS('background-color', 'rgb(0, 136, 255)')
  }
  await selection.getByText('Unchecked', { exact: true }).click()
  await dark.focus()
  await page.keyboard.press('Space')
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await expect(dark).toHaveAttribute('aria-pressed', 'true')
  await expect(states.getByRole('button', { name: 'Light', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(selectionBox).toHaveCSS('background-color', 'rgb(0, 145, 255)')
  await expect(statesBox).toHaveCSS('background-color', 'rgb(0, 136, 255)')
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  await expect.poll(() => page.evaluate(() => localStorage.getItem('tahoe-appearance'))).toBeNull()
  await expect(selection.getByRole('checkbox', { name: 'Unchecked', exact: true })).toBeChecked()

  for (const [title, expression] of [
    ['Checkbox Selection', 'defaultChecked={false}'],
    ['Checkbox States', 'defaultChecked disabled'],
    ['Controlled Checkbox', 'useState<boolean>'],
    ['Checkbox Group / Form', 'new FormData'],
  ]) {
    const card = page.getByRole('region', { name: title, exact: true })
    await card.getByRole('tab', { name: 'Code', exact: true }).click()
    const code = card.locator('code.language-tsx')
    await expect(code).toContainText(expression)
    await expect(code.locator('.hljs-keyword').first()).toBeVisible()
    const source = await code.textContent()
    await card.getByRole('button', { name: 'Copy code', exact: true }).click()
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem('copied-checkbox-code'))).toBe(source)
  }
  await expect(selection.locator('.hljs-keyword').first()).toHaveCSS('color', 'rgb(226, 169, 239)')
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await expect(page.locator('html')).toHaveClass('dark')
  await light.click()
  await expect(page.locator('html')).toHaveClass('dark')
  await expect(light).toHaveAttribute('aria-pressed', 'true')
  await expect(states.getByRole('button', { name: 'Dark', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(() => page.evaluate(() => localStorage.getItem('tahoe-appearance'))).toBe('dark')
  await expect(selection.getByRole('tab', { name: 'Code', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(selection.locator('.hljs-keyword').first()).toHaveCSS('color', 'rgb(122, 41, 149)')
  await selection.getByRole('tab', { name: 'Preview', exact: true }).click()
  await expect(selectionBox).toHaveCSS('background-color', 'rgb(0, 136, 255)')
  await expect(selection.getByRole('checkbox', { name: 'Unchecked', exact: true })).toBeChecked()
  await dark.click()
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await expect(states.getByRole('button', { name: 'Light', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(dark).toHaveAttribute('aria-pressed', 'true')
  await expect(selectionBox).toHaveCSS('background-color', 'rgb(0, 145, 255)')
})

test('uses the same centered preview spacing for shared cards and standalone demos', async ({ page }) => {
  await page.setViewportSize({ width: 749, height: 852 })
  for (const [id, selector] of [
    ['checkbox', '.tahoe-preview-card .preview-content'],
    ['button', '.tahoe-preview-card .preview-content'],
    ['switch', '.live-preview .preview-content'],
  ]) {
    await page.goto('/?lang=zh-CN#/tahoe/' + id)
    const panel = page.locator(selector).first()
    await expect(panel).toHaveCSS('padding-block-start', '160px')
    await expect(panel).toHaveCSS('padding-block-end', '160px')
    await expect(panel).toHaveCSS('justify-content', 'center')
    const centerOffset = await panel.evaluate(element => {
      const panelBounds = element.getBoundingClientRect()
      const demoBounds = element.firstElementChild!.getBoundingClientRect()
      return Math.abs((panelBounds.left + panelBounds.right - demoBounds.left - demoBounds.right) / 2)
    })
    expect(centerOffset).toBeLessThan(1)
  }
})
