import { expect, test } from '@playwright/test'

for (const language of ['zh-CN', 'en']) {
  const suffix = language === 'en' ? '.en.md' : '.md'
  const pages = {
    design: ['design' + suffix],
    tokens: ['tokens' + suffix, 'tokens.json', 'styles.css'],
    'resources/ai-integration': ['ai-integration' + suffix, 'design' + suffix, 'tokens.json', 'styles.css'],
  }
  for (const [route, files] of Object.entries(pages)) {
    test(`serves ${route} downloads in ${language}`, async ({ page }) => {
      await page.goto('/?lang=' + language + '#/tahoe/' + route)
      for (const file of files) {
        const link = page.locator('.page-downloads').getByRole('link', { name: file, exact: true })
        await expect(link).toHaveAttribute('href', '/downloads/' + file)
        await expect(link).toHaveAttribute('download', '')
        const response = await page.request.get('/downloads/' + file)
        expect(response.ok()).toBe(true)
        expect(response.headers()['content-type']).not.toContain('text/html')
        if (file.endsWith('.json')) expect((await response.json()).colors).toBeDefined()
      }
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('.page-downloads').getByRole('link', { name: files[0], exact: true }).click(),
      ])
      expect(download.suggestedFilename()).toBe(files[0])
      expect(await download.failure()).toBeNull()
    })
  }
}

test('maps contribution links to the route and switches the edit language in place', async ({ page }) => {
  await page.goto('/?lang=zh-CN#/tahoe/button?tab=api')
  const footer = page.locator('.page-contributions')
  await expect(footer.getByRole('link', { name: '在 GitHub 编辑' })).toHaveAttribute('href', /\/content\/components\/button\.md$/)
  await expect(footer.getByRole('link', { name: '查看源码' })).toHaveAttribute('href', /\/packages\/ui\/src\/components\/button\.tsx$/)
  await page.getByRole('combobox', { name: '网站语言' }).selectOption('en')
  await expect(footer.getByRole('link', { name: 'Edit on GitHub' })).toHaveAttribute('href', /\/content\/components\/button\.en\.md$/)
  const href = await footer.getByRole('link', { name: 'Report an issue' }).getAttribute('href')
  const body = new URL(href!).searchParams.get('body')
  expect(body).toContain('?lang=en#/tahoe/button')
  expect(body).toContain('Language / 语言: en')
  await page.goto('/?lang=en#/tahoe/resources/community')
  await expect(page.getByRole('heading', { name: 'Community', exact: true })).toBeVisible()
})
