import { expect, test } from '@playwright/test'
import { documentationTabs } from '../apps/docs/src/app/component-headings'
import { localizeTitle } from '../apps/docs/src/app/locale'
import { componentDocs, topicGroups, slug } from '../apps/docs/src/app/catalog'

for (const locale of ['zh-CN', 'en'] as const) test('opens every component and topic in ' + locale, async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const item of componentDocs) {
    await page.goto('/?lang=' + locale + '#/tahoe/' + item.id)
    await expect(page.getByRole('heading', { name: item.title, exact: true, level: 1 })).toBeVisible()
    await expect(page.locator('.preview-content > *').first()).toBeVisible()
    for (const tab of documentationTabs) {
      await page.getByRole('tab', { name: locale === 'en' ? tab.label : tab.zh, exact: true }).click()
      await expect(page.locator('main > article').getByRole('heading', { level: 2 })).toHaveText(
        tab.sections.map(title => localizeTitle(title, locale)),
      )
    }
    await expect(page.locator('.docs-nav [aria-current="page"]')).toHaveAttribute("href", "#/tahoe/" + item.id)
    if (locale === 'en') await expect(page.locator('main')).not.toContainText(/[\u3400-\u9fff]/)
  }
  for (const group of topicGroups) for (const title of group.items) {
    await page.goto('/?lang=' + locale + '#/tahoe/' + group.folder + '/' + slug(title))
    await expect(page.getByRole('heading', { name: localizeTitle(title, locale), exact: true, level: 1 })).toBeVisible()
    if (locale === 'en') await expect(page.locator('main')).not.toContainText(/[\u3400-\u9fff]/)
  }
  expect(errors).toEqual([])
})

test('search, toggle appearance, and use keyboard controls', async ({ page }, info) => {
  await page.goto('/design-system/tahoe')
  await expect(page.getByRole('heading', { name: '简介', level: 1 })).toBeVisible()
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await page.getByRole('searchbox').fill('Checkbox')
  await page.getByRole('dialog').getByRole('link', { name: 'Checkbox' }).click()
  const checkbox = page.getByRole('region', { name: '复选框选择' }).getByRole('checkbox', { name: '已选中', exact: true })
  await expect(checkbox).toBeChecked()
  await checkbox.press('Space')
  await expect(checkbox).not.toBeChecked()
  await expect(checkbox.locator('+ span')).toHaveCSS('border-radius', '5.5px')
  await page.goto('/#/tahoe/sidebar')
  const sidebar = page.getByRole('region', { name: '侧边栏导航', exact: true }).getByRole('navigation', { name: '备忘录目录' })
  const folders = sidebar.getByRole('button', { name: '文件夹' })
  await folders.press('Space')
  await expect(folders).toHaveAttribute('aria-expanded', 'false')
  await folders.press('Enter')
  await sidebar.getByRole('button', { name: '工作' }).click()
  await expect(sidebar.getByRole('button', { name: '工作' })).toHaveAttribute('aria-current', 'true')
  await expect(sidebar.getByRole('button', { name: '工作' })).toHaveCSS('height', '28px')
  await page.screenshot({path: info.outputPath('sidebar-light.png')})
  await page.getByRole('button', { name: '切换深色' }).click()
  await expect(page.locator('html')).toHaveClass('dark')
  await page.screenshot({path: info.outputPath('sidebar-dark.png')})
  await page.goto('/#/tahoe/sheet')
  const opener = page.getByRole('button', { name: '查看详情' })
  await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(opener).toBeFocused()
})

test('installation and measured geometry are present in both themes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/#/tahoe/button')
  await page.getByRole('tab', { name: 'API', exact: true }).click()
  await expect(page.getByRole('heading', { name: '安装', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '复制安装命令' })).toBeVisible()
  await page.getByRole('tab', { name: '概览', exact: true }).click()
  const sizes = page.getByRole('region', { name: '按钮尺寸', exact: true })
  await expect(sizes.getByRole('button', { name: 'Regular' })).toHaveCSS('height', '24px')
  for (const dark of [false, true]) {
    await page.goto('/#/tahoe/switch')
    await expect(page.locator('html')).toHaveClass(dark ? 'dark' : '')
    const toggle = page.getByRole('switch', { name: '同步收藏' })
    await expect(toggle).toBeChecked()
    await expect(page.locator('.tahoe-switch-track')).toHaveCSS('width', '54px')
    await expect(page.locator('.tahoe-switch-thumb')).toHaveCSS('height', '20px')
    await toggle.press('Space')
    await expect(toggle).not.toBeChecked()
    await page.getByLabel('禁用控件').check()
    await expect(toggle).toBeDisabled()
    if (!dark) {
      await page.getByRole('button', { name: '切换深色' }).click()
      await page.goto('/#/tahoe/button')
    }
  }
})

test('switches language in place and remembers it', async ({ page }) => {
  await page.goto('/design-system/tahoe#/tahoe/button')
  await page.getByRole('combobox', { name: '网站语言' }).selectOption('en')
  await expect(page).toHaveURL(/lang=en#\/tahoe\/button$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.getByRole('tab', { name: 'API', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
  await page.getByRole('tab', { name: 'Overview', exact: true }).click()
  await page.getByRole('button', { name: 'Save', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Button States' }).locator('.preview-content output')).toHaveText('Saved')
  await page.reload()
  await expect(page.getByRole('combobox', { name: 'Site language' })).toHaveValue('en')
  await page.goto('/#/tahoe/design')
  await expect(page.getByRole('heading', { name: 'Control Geometry', level: 1 })).toBeVisible()
  await expect(page).toHaveURL(/#\/tahoe\/foundations\/control-geometry$/)
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('searchbox', { name: 'Search documentation' }).fill('排版')
  await page.getByRole('dialog').getByRole('link', { name: 'Typography', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Typography', exact: true, level: 1 })).toBeVisible()
  await page.getByRole('combobox', { name: 'Site language' }).selectOption('zh-CN')
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  await expect(page.getByRole('heading', { name: '排版', exact: true, level: 1 })).toBeVisible()
})

test('copies the Markdown example and keeps the preview interactive', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/?lang=en#/tahoe/radio')
  const preview = page.locator('.preview-content')
  await expect(preview.getByRole('radio', { name: 'Grid' })).toBeChecked()
  await preview.getByRole('radio', { name: 'Grid' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(preview.getByRole('radio', { name: 'List' })).toBeChecked()

  await page.getByRole('tab', { name: 'API', exact: true }).click()
  await page.getByRole('button', { name: 'Copy code', exact: true }).click()
  await page.getByRole('tab', { name: 'Overview', exact: true }).click()
  const code = await page.locator('pre code.language-tsx').textContent()
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(code?.trimEnd())
  await expect(preview.getByRole('radio', { name: 'List' })).toBeChecked()
})


test('restores documentation tabs from section links and browser history', async ({ page }) => {
  await page.goto('/?lang=en#/tahoe/button#design-specifications')
  const guidelines = page.getByRole('tab', { name: 'Guidelines', exact: true })
  await expect(guidelines).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: 'Design Specifications', exact: true })).toBeVisible()
  await guidelines.press('ArrowRight')
  const accessibility = page.getByRole('tab', { name: 'Accessibility', exact: true })
  await expect(accessibility).toHaveAttribute('aria-selected', 'true')
  await expect(page).toHaveURL(/tab=accessibility$/)
  await page.reload()
  await expect(accessibility).toHaveAttribute('aria-selected', 'true')
  await page.goBack()
  await expect(guidelines).toHaveAttribute('aria-selected', 'true')
  await page.goForward()
  await expect(accessibility).toHaveAttribute('aria-selected', 'true')
})
