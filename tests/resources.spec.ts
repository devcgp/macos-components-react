import { expect, test } from '@playwright/test'

for (const language of ['zh-CN', 'en']) {
  const suffix = language === 'en' ? '.en.md' : '.md'
  const pages = {
    tokens: ['tokens' + suffix, 'tokens.json', 'styles.css'],
    'resources/ai-integration': ['ai-integration' + suffix, 'design' + suffix, 'tokens.json', 'styles.css'],
  }
  for (const [route, files] of Object.entries(pages)) {
    test(`serves ${route} downloads in ${language}`, async ({ page }) => {
      await page.goto('/?lang=' + language + '#/tahoe/' + route)
      const footer=page.locator('.page-contributions')
      const documentPath=route==='tokens'?'docs/'+route:'apps/docs/content/'+route
      for(const [locale,suffix] of [['zh-CN','.md'],['en','.en.md']]){
        const href='/downloads/pages/'+documentPath+suffix
        const link=footer.locator('a[download]').filter({hasText:locale==='en'?'English Markdown':language==='en'?'Chinese Markdown':'中文 Markdown'})
        await expect(link).toHaveAttribute('href',href)
        const response=await page.request.get(href)
        expect(response.ok()).toBe(true)
        expect(response.headers()['content-type']).not.toContain('text/html')
        expect(await response.text()).toContain('# ')
      }
      for(const file of files.filter(file=>!file.endsWith('.md'))){
        await expect(footer.locator('a[download][href="/downloads/'+file+'"]')).toBeVisible()
      }
      const [download]=await Promise.all([page.waitForEvent('download'),footer.locator('a[download]').first().click()])
      expect(download.suggestedFilename()).toBe(route.split('/').at(-1)+'.md')
      expect(await download.failure()).toBeNull()
      await footer.getByRole('button',{name:language==='en'?'View raw document':'查看原文'}).click()
      await expect(footer.locator('#page-raw-document')).toBeVisible()

    })
  }
}

test('maps contribution links to the route and switches the edit language in place', async ({ page }) => {
  await page.goto('/?lang=zh-CN#/tahoe/button?tab=api')
  const footer = page.locator('.page-contributions')
  await expect(footer.getByRole('link', { name: 'Edit on GitHub' })).toHaveAttribute('href', /\/content\/components\/button\.md$/)
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
