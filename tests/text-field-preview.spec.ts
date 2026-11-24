import { expect, test } from '@playwright/test'

test('keeps native TextField editing, focus, and validation in the live examples', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.goto('/?lang=en#/desktop/text-field')
  const basics = page.getByRole('region', { name: 'Text Field Basics', exact: true })
  const empty = basics.getByRole('textbox', { name: 'Empty', exact: true })
  await expect(empty).toHaveValue('')
  await expect(empty).toHaveCSS('height', '24px')
  await expect(empty).toHaveCSS('border-radius', '6px')
  await expect(empty).toHaveCSS('border-width', '1px')
  await expect(empty).toHaveCSS('padding-inline-start', '8px')
  await expect(empty).toHaveCSS('padding-inline-end', '4px')
  await expect(empty).toHaveCSS('font-size', '13px')
  await expect(basics.getByPlaceholder('Enter a name')).toHaveValue('')
  await expect(basics.getByRole('textbox', { name: 'Default value' })).toHaveValue('Photos')
  await basics.getByText('Empty', { exact: true }).click()
  await expect(empty).toBeFocused()

  const states = page.getByRole('region', { name: 'Text Field States', exact: true })
  const filled = states.getByRole('textbox', { name: 'Filled', exact: true })
  const focus = states.getByRole('textbox', { name: 'Focus with Tab' })
  const disabled = states.getByRole('textbox', { name: 'Disabled', exact: true })
  const readOnly = states.getByRole('textbox', { name: 'Read-only' })
  await filled.focus()
  await page.keyboard.press('Tab')
  await expect(focus).toBeFocused()
  await expect(focus).toHaveCSS('box-shadow', /3\.5px/)
  await expect(disabled).toBeDisabled()
  await page.keyboard.press('Tab')
  await expect(readOnly).toBeFocused()
  await expect(readOnly).not.toBeEditable()
  await readOnly.press('End')
  await page.keyboard.type(' extra')
  await expect(readOnly).toHaveValue('Photos')

  const required = states.getByRole('textbox', { name: 'Required', exact: true })
  const checkRequired = states.getByRole('button', { name: 'Check required field' })
  await checkRequired.click()
  await expect(required).toBeFocused()
  expect(await required.evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(true)
  await expect(states.locator('output')).toHaveCount(0)
  await required.fill('Travel')
  await checkRequired.click()
  await expect(states.locator('output')).toHaveText('Required field is valid.')
  await page.emulateMedia({ forcedColors: 'active' })
  await focus.focus()
  await expect(focus).toHaveCSS('outline-style', 'solid')
})

test('exercises controlled, validation, and settings TextField compositions', async ({ page }) => {
  await page.goto('/?lang=en#/desktop/text-field')
  const controlled = page.getByRole('region', { name: 'Controlled Text Field' })
  const name = controlled.getByRole('textbox', { name: 'Folder name' })
  await name.fill('旅行📷')
  await expect(controlled.locator('output')).toContainText('Current value: 旅行📷')
  await expect(controlled.locator('output')).toContainText('Character count: 3')
  await controlled.getByRole('button', { name: 'Reset' }).click()
  await expect(name).toHaveValue('Photos')

  const form = page.getByRole('region', { name: 'Form & Validation' })
  const input = form.getByRole('textbox', { name: 'Folder name' })
  const submit = form.getByRole('button', { name: 'Submit', exact: true })
  await submit.click()
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await expect(input).toHaveAccessibleDescription('Enter a folder name.')
  await expect(form.locator('output')).toBeEmpty()
  await input.fill('  Mountains  ')
  await expect(input).toHaveAttribute('aria-invalid', 'false')
  await expect(form.getByRole('alert')).toHaveCount(0)
  await input.press('Enter')
  await expect(form.locator('output')).toHaveText('Submitted name: Mountains')

  const settings = page.getByRole('region', { name: 'Text Field in Settings' })
  const save = settings.getByRole('button', { name: 'Save', exact: true })
  await expect(save).toBeDisabled()
  await settings.getByRole('textbox', { name: 'Folder name' }).fill('Landscapes')
  await expect(save).toBeEnabled()
  await save.click()
  await expect(settings.locator('output')).toHaveText('Saved folder name: Landscapes')
  await expect(save).toBeDisabled()
})

test('isolates card appearance, keeps typing state, and copies all localized TextField examples', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 800 })
  await page.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: async (source: string) => sessionStorage.setItem('text-field-source', source),
    })
  })
  await page.goto('/?lang=zh-CN#/desktop/text-field')
  const basics = page.getByRole('region', { name: '文本输入框基础', exact: true })
  const states = page.getByRole('region', { name: '文本输入框状态', exact: true })
  const input = basics.getByRole('textbox', { name: '空值' })
  await input.fill('我的照片')
  await input.evaluate(element => (element as HTMLInputElement).setSelectionRange(0, 1))
  const lightColor = await input.evaluate(element => {
    const style = getComputedStyle(element)
    return { background: style.backgroundColor, border: style.borderColor, text: style.color, focus: style.boxShadow }
  })
  await basics.getByRole('button', { name: '深色', exact: true }).click()
  await expect(input).toBeFocused()
  expect(await input.evaluate(element => {
    const field = element as HTMLInputElement
    return [field.selectionStart, field.selectionEnd]
  })).toEqual([0, 1])
  await expect(basics).toHaveAttribute('data-appearance', 'dark')
  await expect(states).toHaveAttribute('data-appearance', 'light')
  for (const [property, value] of Object.entries({
    'background-color': lightColor.background,
    'border-color': lightColor.border,
    color: lightColor.text,
    'box-shadow': lightColor.focus,
  })) await expect(input).not.toHaveCSS(property, value)

  await page.getByRole('button', { name: '打开文档导航' }).click()
  await page.getByRole('button', { name: '切换深色', exact: true }).click()
  await page.getByRole('button', { name: '关闭导航' }).click()
  await basics.getByRole('button', { name: '浅色', exact: true }).click()
  await expect(page.locator('html')).toHaveClass('dark')
  await expect(basics).toHaveAttribute('data-appearance', 'light')
  await expect(states).toHaveAttribute('data-appearance', 'dark')
  await expect(input).toHaveCSS('background-color', lightColor.background)
  await expect(input).toHaveCSS('border-color', lightColor.border)
  await expect(input).toHaveCSS('color', lightColor.text)

  for (const title of ['文本输入框基础', '文本输入框状态', '受控文本输入框', '表单与验证', '设置中的文本输入框']) {
    const card = page.getByRole('region', { name: title, exact: true })
    await card.getByRole('tab', { name: '代码', exact: true }).click()
    const code = card.locator('code')
    await expect(code).toContainText('@cgpdesktopui/ui/styles.css')
    await expect(code).toContainText(/\p{Script=Han}/u)
    await card.getByRole('button', { name: '复制代码', exact: true }).click()
    const source = await code.textContent()
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem('text-field-source'))).toBe(source)
    await card.getByRole('tab', { name: '预览', exact: true }).click()
  }
  await expect(input).toHaveValue('我的照片')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
})
