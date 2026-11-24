import { expect, test } from '@playwright/test'

test('renders token scopes and typography from the active CSS on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/?lang=en#/tahoe/foundations/control-geometry')
  await expect(page.getByRole('heading', { name: 'Control Geometry', level: 1 })).toBeVisible()

  const sample = page.locator('.tahoe-token-sample')
  const control = sample.locator('.tahoe-token-control')
  await expect(control).toHaveCSS('height', '24px')
  const sizes = ['mini', 'small', 'medium', 'large', 'xl'] as const
  expect(await page.getByRole('combobox', { name: 'Size', exact: true }).locator('option').evaluateAll(options =>
    options.map(option => (option as HTMLOptionElement).value),
  )).toEqual(sizes)
  await page.getByRole('combobox', { name: 'Size', exact: true }).selectOption('xl')
  await page.getByRole('combobox', { name: 'Appearance', exact: true }).selectOption('dark')
  await page.getByRole('combobox', { name: 'Context', exact: true }).selectOption('over-glass')
  await expect(control).toHaveCSS('height', '36px')
  await expect(sample).toHaveCSS('background-color', 'rgb(30, 30, 30)')
  await expect(sample.getByText('80px')).toBeVisible()
  expect(await sample.evaluate(element =>
    getComputedStyle(element).getPropertyValue('--tahoe-context-is-over-glass').trim(),
  )).toBe('1')

  await page.goto('/?lang=en#/tahoe/foundations/typography')
  const typography = page.getByRole('region', { name: 'Typography comparison' })
  await expect(typography.getByRole('row')).toHaveCount(12)
  await expect(typography.getByText('Sample text', { exact: true })).toHaveCount(22)
  await expect(typography.getByText('Sample text', { exact: true }).first()).toHaveCSS('font-size', '26px')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)

  await page.getByRole('combobox', { name: 'Site language' }).selectOption('zh-CN')
  await expect(page.getByRole('heading', { name: '字体排印' })).toBeVisible()
  await page.locator('.docs-nav').getByRole('link', { name: '色彩', exact: true }).click()
  await expect(page.getByRole('heading', { name: '色彩', level: 1 })).toBeVisible()
})

test('shows all 62 system colors with stable Light and Dark swatches', async ({ page }) => {
  await page.goto('/?lang=en#/tahoe/colors')
  await expect(page.getByRole('heading', { name: 'Color', level: 1 })).toBeVisible()
  await expect(page).toHaveURL(/#\/tahoe\/foundations\/color$/)
  await expect(page.locator('.tahoe-color-grid > li')).toHaveCount(62)
  await expect(page.locator('.tahoe-color-grid > li').first()).toHaveCSS('list-style-type', 'none')
  await expect(page.getByRole('heading', { name: 'Semantic Colors', exact: true })).toBeVisible()
  const card = page.locator('#tahoe-color-vibrant-fills li').filter({
    has: page.getByText('--tahoe-vibrant-fills-secondary', { exact: true }),
  })
  await expect(card.getByText('#E6E6E6', { exact: true })).toBeVisible()
  await expect(card.getByText('#141414', { exact: true })).toBeVisible()
  const light = card.locator('[data-appearance="light"] .tahoe-color-swatch')
  const dark = card.locator('[data-appearance="dark"] .tahoe-color-swatch')
  await expect(light).toHaveCSS('background-color', 'rgb(230, 230, 230)')
  await expect(dark).toHaveCSS('background-color', 'rgb(20, 20, 20)')
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await expect(light).toHaveCSS('background-color', 'rgb(230, 230, 230)')
  await expect(dark).toHaveCSS('background-color', 'rgb(20, 20, 20)')
  await page.getByRole('button', { name: 'Grayscale', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Grayscale', exact: true })).toBeInViewport()
})
