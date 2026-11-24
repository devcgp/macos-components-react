import { expect, test } from '@playwright/test'
import { componentDocs, slug, topicGroups } from '../apps/docs/src/app/catalog'
import { componentInventory, navigation, navigationPages } from '../apps/docs/src/app/navigation'

test('keeps the HIG sections, resources, component topics, and existing routes', () => {
  expect(navigation.map(section => section.title)).toEqual([
    'Getting Started', 'Foundations', 'Patterns', 'Components', 'Inputs',
  ])
  expect(componentInventory.map(category => category.title)).toEqual([
    'Content', 'Layout and Organization', 'Menus and Actions', 'Navigation and Search',
    'Presentation', 'Selection and Input', 'Status', 'System Experiences',
  ])
  const topics = componentInventory.flatMap(category => category.items)
  expect(topics).toHaveLength(64)
  expect(new Set(topics.map(topic => topic.id)).size).toBe(64)

  const expectedIds = [
    ...topicGroups.flatMap(group => group.items.map(title => group.folder + '/' + slug(title))),
    ...componentDocs.map(doc => doc.id),
    'tokens', 'resources/ai-integration', 'resources/community',
  ]
  expect(navigationPages.map(({ page }) => page.href).sort()).toEqual(
    expectedIds.map(id => '#/tahoe/' + id).sort(),
  )
  for (const [id, section] of [
    ['tokens', 'foundations'],
    ['technologies/react-integration', 'getting-started'],
    ['resources/ai-integration', 'getting-started'],
    ['resources/community', 'getting-started'],
  ]) {
    expect(navigationPages.find(({ page }) => page.id === id)?.ancestors[0]).toBe(section)
  }
  expect(navigationPages.every(({ ancestors }) => ancestors.length === 2)).toBe(true)
})

test('distinguishes quick references from detailed component guides', async ({ page }) => {
  await page.goto('/?lang=en#/tahoe/button')
  const sidebar = page.getByRole('navigation', { name: 'Documentation categories' })
  await expect(sidebar.getByRole('link', { name: 'Button', exact: true }).getByText('Quick reference')).toHaveCount(0)
  await expect(sidebar.getByRole('link', { name: 'Sidebar', exact: true }).getByText('Quick reference')).toHaveCount(0)
  await expect(sidebar.getByRole('link', { name: 'Pop-up Button', exact: true }).getByText('Quick reference')).toBeVisible()
})

test('opens active ancestors, keeps independent toggle state, and supports keyboard navigation', async ({ page }) => {
  await page.goto('/?lang=en#/tahoe/sidebar')
  const nav = page.getByRole('navigation', { name: 'Documentation categories' })
  const sections = page.getByRole('navigation', { name: 'Documentation sections' })
  const components = sections.getByRole('link', { name: 'Components', exact: true })
  const navigationAndSearch = nav.getByRole('button', { name: 'Navigation and Search', exact: true })
  const menus = nav.getByRole('button', { name: 'Menus and Actions', exact: true })
  const patterns = sections.getByRole('link', { name: 'Patterns', exact: true })
  await expect(components).toHaveAttribute('aria-current', 'true')
  await expect(navigationAndSearch).toHaveAttribute('aria-expanded', 'true')
  await expect(nav.getByRole('link', { name: 'Sidebar', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(nav.getByRole('link', { name: 'Token Fields', exact: true })).toHaveCount(0)

  await expect(nav.locator('button[aria-expanded="false"]')).toHaveCount(0)
  await menus.focus()
  await page.keyboard.press('Space')
  await expect(menus).toHaveAttribute('aria-expanded', 'false')
  await page.keyboard.press('Space')
  await expect(menus).toHaveAttribute('aria-expanded', 'true')
  await nav.getByRole('link', { name: 'Button', exact: true }).click()
  await expect(page).toHaveURL(/#\/tahoe\/button$/)
  await expect(nav.getByRole('link', { name: 'Button', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(navigationAndSearch).toHaveAttribute('aria-expanded', 'true')

  await menus.click()
  await expect(menus).toHaveAttribute('aria-expanded', 'false')
  await expect(nav.getByRole('link', { name: 'Button', exact: true })).toBeHidden()
  await expect(navigationAndSearch).toHaveAttribute('aria-expanded', 'true')
  await patterns.focus()
  await page.keyboard.press('Enter')
  await expect(patterns).toHaveAttribute('aria-current', 'true')
  await expect(navigationAndSearch).toBeHidden()

  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('searchbox').fill('Icon Button')
  await page.getByRole('dialog').getByRole('link', { name: 'Icon Button', exact: true }).click()
  await expect(components).toHaveAttribute('aria-current', 'true')
  await expect(menus).toHaveAttribute('aria-expanded', 'true')
  await expect(nav.getByRole('link', { name: 'Icon Button', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('keeps the narrow sidebar scrollable and renders Font Awesome in site and component UI', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/?lang=zh-CN#/tahoe/search-field')
  const nav = page.getByRole('navigation', { name: '文档分类' })
  await expect(page.locator('.header-sections').getByRole('link', { name: '界面组件', exact: true })).toHaveAttribute('aria-current', 'true')
  await expect(nav.getByRole('button', { name: '导航与搜索', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await expect(nav.getByRole('link', { name: 'Search Field', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('button', { name: '搜索', exact: true }).locator('svg[data-icon="magnifying-glass"]')).toBeVisible()
  await expect(page.locator('.live-preview .tahoe-search svg[data-icon="magnifying-glass"]').first()).toBeVisible()
  expect(await page.locator('.docs-nav').evaluate(sidebar => sidebar.scrollHeight > sidebar.clientHeight)).toBe(true)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
})

test('keeps specification routes and legacy entry aliases accessible', async ({ page }) => {
  const titles = [
    ['tokens', 'Design Tokens'],
    ['foundations/color', 'Color'],
  ]
  for (const [route, title] of titles) {
    await page.goto('/?lang=en#/tahoe/' + route)
    const nav = page.getByRole('navigation', { name: 'Documentation categories' })
    await expect(nav.getByRole('link', { name: title, exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Page not found')
  }
  for (const legacy of ['#/overview', '#/tahoe/showcase']) {
    await page.goto('/?lang=en' + legacy)
    await expect(page.getByRole('heading', { name: 'Introduction', level: 1 })).toBeVisible()
  }
})

test('pins the frosted header and desktop navigation while aligning titles across routes', async ({ page }) => {
  await page.setViewportSize({ width: 882, height: 852 })
  await page.goto('/?lang=zh-CN#/tahoe/foundations/control-geometry')

  const header = page.locator('.site-header')
  const sidebar = page.locator('.docs-nav')
  const title = page.getByRole('main').getByRole('heading', { level: 1 })
  await expect(title).toHaveText('控件尺寸')
  await expect(header).toHaveCSS('backdrop-filter', /blur\(16px\)/)
  await expect(sidebar).toHaveCSS('position', 'sticky')

  const initialHeader = (await header.boundingBox())!
  const initialSidebar = (await sidebar.boundingBox())!
  const initialTitle = (await title.boundingBox())!
  expect(initialSidebar.y).toBeCloseTo(initialHeader.height)
  expect(initialSidebar.y + initialSidebar.height).toBeCloseTo(852)
  const heading = (await page.locator('.desktop-document-heading').boundingBox())!
  expect(heading.y).toBeGreaterThanOrEqual(initialHeader.height)
  expect(initialTitle.y).toBeGreaterThan(heading.y)

  await page.evaluate(() => window.scrollTo(0, 550))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  expect((await header.boundingBox())?.y).toBeCloseTo(0)
  expect((await sidebar.boundingBox())?.y).toBeCloseTo(initialSidebar.y)

  await expect(sidebar.getByRole('button', { name: '设计原则' })).toHaveAttribute('aria-expanded', 'true')
  await sidebar.getByRole('link', { name: '色彩', exact: true }).click()
  await expect(title).toHaveText('色彩')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  expect((await title.boundingBox())?.y).toBeCloseTo(initialTitle.y)
  expect(await sidebar.boundingBox()).toEqual(initialSidebar)

  await page.goto('/?lang=zh-CN#/tahoe/button')
  await expect(title).toHaveText('Button')
  expect((await title.boundingBox())?.y).toBeCloseTo(initialTitle.y)
})

test('keeps title spacing and the navigation pane stable on narrow screens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/?lang=zh-CN#/tahoe/foundations/color')
  const sidebar = page.locator('.docs-nav')
  const header = page.locator('.site-header')
  const title = page.getByRole('main').getByRole('heading', { level: 1 })
  await expect(title).toHaveText('色彩')

  const nav = (await sidebar.boundingBox())!
  const bar = (await header.boundingBox())!
  expect(nav.y).toBeCloseTo(bar.y + bar.height)
  expect((await page.locator('.desktop-document-heading').boundingBox())!.y).toBeGreaterThanOrEqual(nav.y + nav.height)
  await sidebar.getByRole('button', { name: '设计原则' }).click()
  await expect(sidebar.getByRole('button', { name: '设计原则' })).toHaveAttribute('aria-expanded', 'false')
  expect((await sidebar.boundingBox())?.height).toBeCloseTo(nav.height)
  expect((await page.locator('.desktop-document-heading').boundingBox())!.y).toBeGreaterThanOrEqual(nav.y + nav.height)
})
