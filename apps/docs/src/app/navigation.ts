import { componentDocs, slug, topicGroups } from './catalog'
import { localizeTitle, type Locale } from './locale'

export type NavigationItem = {
  id: string
  title: string
  titleZh?: string
  keywords?: string[]
  href?: string
  status?: 'reference'
  children?: NavigationItem[]
}

type NavigationPage = NavigationItem & { href: string }
type PageLocation = { page: NavigationPage; ancestors: string[] }

const page = (id: string, title: string, titleZh?: string): NavigationPage => ({
  id, title, titleZh, href: '#/tahoe/' + id,
})

function group(id: string, title: string, titleZh: string, children: NavigationItem[]): NavigationItem {
  return { id, title, titleZh, children }
}

// HIG topics form the inventory. A topic can have several existing component documents.
const supplementalCategories: Record<string, string> = {
  dialog: 'presentation',
  radio: 'selection-and-input',
  'radio-group': 'selection-and-input',
  tooltip: 'status',
  badge: 'status',
  'settings-group': 'system-experiences',
}
const topicOverrides: Record<string, string> = { 'inspector-panel': 'panels' }
const topicFor = (doc: (typeof componentDocs)[number]) => topicOverrides[doc.id] ?? doc.reference

// Detailed component guides include dedicated interactive examples.
const detailedComponentPages = new Set(['button', 'checkbox', 'text-field', 'sidebar'])

function componentPage(id: string, title: string): NavigationPage {
  return { ...page(id, title), status: detailedComponentPages.has(id) ? undefined : 'reference' }
}

function componentCategory(title: string, titleZh: string, topics: string[]) {
  const id = slug(title)
  const items = topics.map(title => {
    const topicId = slug(title)
    return {
      id: topicId, title,
      pages: componentDocs.filter(doc => topicFor(doc) === topicId).map(doc => ({
        ...componentPage(doc.id, doc.title), keywords: [title],
      })),
    }
  })
  const supplemental = componentDocs.filter(doc => supplementalCategories[doc.id] === id)
  return { id, title, titleZh, items, supplemental: supplemental.map(doc => componentPage(doc.id, doc.title)) }
}

export const componentInventory = [
  componentCategory('Content', '内容组件', [
    'Charts', 'Image Views', 'Text Views', 'Web Views',
  ]),
  componentCategory('Layout and Organization', '布局与组织', [
    'Boxes', 'Collections', 'Column Views', 'Disclosure Controls', 'Labels', 'Lists and Tables',
    'Lockups', 'Outline Views', 'Split Views', 'Tab Views',
  ]),
  componentCategory('Menus and Actions', '菜单与操作', [
    'Activity Views', 'Buttons', 'Context Menus', 'Dock Menus', 'Edit Menus', 'Home Screen Quick Actions',
    'Menus', 'Ornaments', 'Pop-up Buttons', 'Pull-down Buttons', 'The Menu Bar', 'Toolbars',
  ]),
  componentCategory('Navigation and Search', '导航与搜索', [
    'Path Controls', 'Search Fields', 'Sidebars', 'Tab Bars', 'Token Fields',
  ]),
  componentCategory('Presentation', '内容呈现', [
    'Action Sheets', 'Alerts', 'Page Controls', 'Panels', 'Popovers', 'Scroll Views', 'Sheets', 'Windows',
  ]),
  componentCategory('Selection and Input', '选择与输入', [
    'Color Wells', 'Combo Boxes', 'Digit Entry Views', 'Image Wells', 'Pickers', 'Segmented Controls',
    'Sliders', 'Steppers', 'Text Fields', 'Toggles', 'Virtual Keyboards',
  ]),
  componentCategory('Status', '状态反馈', [
    'Activity Rings', 'Gauges', 'Progress Indicators', 'Rating Indicators',
  ]),
  componentCategory('System Experiences', '系统级体验', [
    'App Shortcuts', 'Complications', 'Controls', 'Live Activities', 'Notifications', 'Snippets',
    'Status Bars', 'Top Shelf', 'Watch Faces', 'Widgets',
  ]),
]

const design = page('design', 'Design Guidelines', '设计规范')
const tokens = page('tokens', 'Design Tokens', '设计 Tokens')

function topicSection(
  folder: string, titleZh: string, category: Omit<NavigationItem, 'children'>,
  additional: NavigationItem[] = [],
) {
  const topic = topicGroups.find(topic => topic.folder === folder)!
  const children = topic.items.map(title => page(folder + '/' + slug(title), title))
  return group(folder, topic.title, titleZh, [{ ...category, children }, ...additional])
}

export const navigation = [
  topicSection('getting-started', '入门指南', { id: 'start-here', title: 'Start Here', titleZh: '开始使用' }),
  topicSection('foundations', '设计基础', { id: 'design-principles', title: 'Design Principles', titleZh: '设计原则' }, [
    group('specifications', 'Specifications and Verification', '规范与验证', [design]),
  ]),
  topicSection('patterns', '交互模式', { id: 'interaction-patterns', title: 'Interaction Patterns', titleZh: '常用交互' }),
  group('components', 'Components', '界面组件', componentInventory.map(category =>
    group(category.id, category.title, category.titleZh, [
      ...category.items.flatMap(item => item.pages),
      ...category.supplemental,
    ]),
  )),
  topicSection('inputs', '输入方式', { id: 'input-methods', title: 'Input Methods', titleZh: '输入方法' }),
  group('resources', 'Resources', '资源', [
    group('project-resources', 'Project Resources', '项目资源', [
      tokens,
      page('resources/ai-integration', 'AI Integration', 'AI 集成'),
      page('resources/community', 'Community', '社区贡献'),
    ]),
  ]),
  topicSection('technologies', '技术与平台', { id: 'web-implementation', title: 'Web Implementation', titleZh: '网页实现' }),
]

export function navigationTitle(item: NavigationItem, locale: Locale) {
  return locale === 'zh-CN' ? item.titleZh ?? localizeTitle(item.title, locale) : item.title
}

function listPages(items: NavigationItem[], ancestors: string[] = []): PageLocation[] {
  return items.flatMap(item => {
    if (item.href) return [{ page: { ...item, href: item.href }, ancestors }]
    return listPages(item.children ?? [], [...ancestors, item.id])
  })
}

export const navigationPages = listPages(navigation)
export const navigationByHref = new Map(navigationPages.map(location => [location.page.href, location]))
