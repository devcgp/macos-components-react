import { lazy, Suspense, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCodeBranch, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@cgpdesktopui/ui'
import { documentHref, documentPath, documentStart } from './document-urls'
import { DarkAppearanceContext } from './appearance'
import { LocaleContext, localizeTitle, readLocale, type Locale } from './locale'
import { FoundationTokens, foundationTokenSections } from '../components/FoundationTokens'
import DocumentHeading from '../components/DocumentHeading'
import DocsLayout from '../layouts/DocsLayout'
import DocsNavigation from '../layouts/DocsNavigation'
import { PageResources, repository } from '../components/PageResources'
import ComponentDocPage from '../components/ComponentDocPage'
import { documentationTab } from './component-headings'
import DesktopColorsPage, { desktopColorSections } from '../components/DesktopColorsPage'
import DesktopTokensPage, { desktopTokenSections } from '../components/DesktopTokensPage'
import { componentDocs, hig, slug } from './catalog'
import { navigation, navigationByHref, navigationPages, navigationTitle } from './navigation'

const documents = import.meta.glob<string>(
  ['../../content/*/*.md', '!../../content/components/*.md'],
  { eager: true, query: '?raw', import: 'default' },
)
const componentFiles = import.meta.glob<string>(
  ['../../content/components/*.md', '!../../content/components/README.md'],
  { query: '?raw', import: 'default' },
)
const componentPages = Object.fromEntries(Object.entries(componentFiles).map(([path, load]) => [
  path,
  lazy(async () => {
    const markdown = await load()
    return { default: ({ id, hash }: { id: string; hash: string }) => <ComponentDocPage id={id} markdown={markdown} hash={hash}/> }
  }),
]))

const entries = navigationPages.map(({ page }) => page)
function currentRoute() {
  const url = new URL(location.href)
  const legacy = url.hash.startsWith('#/')
  const route = legacy ? url.hash.slice(1) : url.pathname
  const path = /^([^?#]+)/.exec(route)?.[0] ?? documentStart
  const suffix = legacy ? route.slice(path.length) : url.search + url.hash
  const normalized = documentPath(path)
  const target = documentHref(normalized, readLocale())
  if (legacy || target !== url.pathname || url.searchParams.has('lang')) {
    if (legacy) {
      const legacyURL = new URL(normalized + suffix, url.origin)
      url.search = legacyURL.search || url.search
      url.hash = legacyURL.hash
    }
    url.pathname = target
    url.searchParams.delete('lang')
    history.replaceState(history.state, '', url)
  }
  return normalized + url.search + url.hash
}

export default function App() {
  const [locale, setLocale] = useState(readLocale)
  const tr = (zh: string, en: string) => locale === 'en' ? en : zh
  const [hash, setRoute] = useState(currentRoute)
  const route = hash.split(/[?#]/)[0]
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [query, setQuery] = useState('')
  const id = route.replace('/desktop/', '')
  const doc = componentDocs.find(item => item.id === id)
  const index = entries.findIndex(item => item.href === route)
  const entry = entries[index]
  const entryTitle = entry && navigationTitle(entry, locale)
  const extension = tr('.md', '.en.md')
  const ComponentPage = doc && componentPages['../../content/components/' + id + extension]
  const markdown = documents['../../content/' + id + extension]
  const searchTerm = query.trim().toLowerCase()
  const matches = search ? entries.filter(item =>
    [item.title, navigationTitle(item, 'zh-CN'), item.href, ...(item.keywords ?? [])].some(value =>
      value.toLowerCase().includes(searchTerm)),
  ) : []
  const referenceSections = id === 'foundations/color' ? desktopColorSections : id === 'tokens' ? desktopTokenSections : foundationTokenSections(id)
  const toc = doc
    ? documentationTab(hash).sections.map(title => ({ title: localizeTitle(title, locale), href: slug(title) }))
    : referenceSections.map(section => ({ title: tr(section.titleZh, section.title), href: section.id }))

  useEffect(() => {
    const update = () => {
      setLocale(readLocale())
      setRoute(currentRoute())
      setSearch(false)
      setMenu(false)
      if (!location.hash) window.scrollTo(0, 0)
    }
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element && event.target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href)
      if (url.origin !== location.origin || !navigationByHref.has(documentPath(url.pathname))) return
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return
      event.preventDefault()
      if (url.href !== location.href) history.pushState(history.state, '', url)
      update()
    }
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setMenu(false)
        setSearch(value => !value)
      }
    }
    document.addEventListener('click', navigate)
    window.addEventListener('hashchange', update)
    window.addEventListener('popstate', update)
    window.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('click', navigate)
      window.removeEventListener('hashchange', update)
      window.removeEventListener('popstate', update)
      window.removeEventListener('keydown', key)
    }
  }, [])
  useEffect(() => {
    if (!menu) return
    const desktop = matchMedia('(min-width: 681px)')
    const closeMenuOnDesktop = () => { if (desktop.matches) setMenu(false) }
    desktop.addEventListener('change', closeMenuOnDesktop)
    return () => desktop.removeEventListener('change', closeMenuOnDesktop)
  }, [menu])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  useEffect(() => {
    document.title = (entryTitle ? entryTitle + ' · ' : '') + 'macOS Components for React'
    if (!entryTitle) return
    const links = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"], link[rel="alternate"][hreflang]')
    links.forEach(link => {
      const language = link.hreflang === 'en' ? 'en' : link.rel === 'canonical' ? locale : 'zh-CN'
      link.href = new URL(documentHref(route, language), link.href).href
    })
  }, [entryTitle, locale, route])
  useEffect(() => { document.documentElement.lang = locale }, [locale])

  function changeAppearance(nextDark: boolean) {
    setDark(nextDark)
    try { localStorage.setItem('desktop-appearance', nextDark ? 'dark' : 'light') } catch { /* storage can be unavailable */ }
  }

  const sectionId = navigationByHref.get(route)?.ancestors[0]
  const section = navigation.find(item => item.id === sectionId)
  const settings = <>
      <Button aria-label={dark ? tr('切换浅色', 'Switch to light mode') : tr('切换深色', 'Switch to dark mode')} onClick={() => changeAppearance(!dark)}><FontAwesomeIcon icon={dark ? faMoon : faSun} className="site-icon" aria-hidden="true"/> {tr('外观', 'Appearance')}</Button>
      <select className="language-select" aria-label={tr('网站语言', 'Site language')} value={locale} onChange={event => {
        const next = event.target.value as Locale
        const url = new URL(location.href)
        url.pathname = documentHref(route, next)
        url.searchParams.delete('lang')
        try { localStorage.setItem('desktop-language', next) } catch { /* storage can be unavailable */ }
        location.assign(url)
      }}>
        <option value="en" lang="en">English</option>
        <option value="zh-CN" lang="zh-CN">简体中文</option>
      </select>
      <a href={repository}><FontAwesomeIcon icon={faCodeBranch} className="site-icon" aria-hidden="true"/> GitHub</a>
  </>
  const header = <header className="site-header">
    <a className="brand" href={documentHref(documentStart, locale)}>macOS Components for React</a>
    <nav className="header-sections" aria-label={tr('一级目录', 'Documentation sections')}>
      {navigation.map(item => {
        const firstPage = navigationPages.find(({ ancestors }) => ancestors[0] === item.id)
        return firstPage && <a key={item.id} href={documentHref(firstPage.page.href, locale)}
          aria-current={item.id === sectionId ? 'true' : undefined}>{navigationTitle(item, locale)}</a>
      })}
    </nav>
    <div className="header-actions">
      <Button className="header-search" aria-label={tr('搜索', 'Search')} onClick={() => { setQuery(''); setSearch(true) }}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="site-icon" aria-hidden="true"/> <span>{tr('搜索', 'Search')}</span>
      </Button>
      <div className="header-settings">{settings}</div>
      <Button className="mobile-menu-trigger" aria-label={tr('打开文档导航', 'Open documentation menu')} aria-haspopup="dialog" aria-expanded={menu} onClick={() => setMenu(true)}>
        <FontAwesomeIcon icon={faBars} className="site-icon" aria-hidden="true"/>
      </Button>
    </div>
  </header>

  return <LocaleContext.Provider value={locale}><DarkAppearanceContext.Provider value={dark}><div data-theme="desktop">
    <DocsLayout header={header} navigation={section?.children ?? []} current={route} toc={toc} heading={
      entryTitle && <DocumentHeading title={entryTitle} category={section ? {
        title: navigationTitle(section, locale),
        href: navigationPages.find(item => item.ancestors[0] === section.id)?.page.href ?? documentStart,
      } : undefined}/>
    }>
      {ComponentPage ? <Suspense fallback={<p role="status">{tr('正在加载组件文档…', 'Loading component documentation…')}</p>}>
          <ComponentPage key={locale + id} id={id} hash={hash}/>
        </Suspense>
        : id === 'tokens' ? <DesktopTokensPage/>
        : markdown ? <article className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{h1:()=>null}} urlTransform={url => defaultUrlTransform(documentHref(url, locale))}>{markdown}</ReactMarkdown>
          {id === 'foundations/color' ? <DesktopColorsPage/> : <FoundationTokens key={id} id={id}/>}
          {id.includes('/') && !id.startsWith('resources/') && <p><a href={hig}>Apple Human Interface Guidelines</a></p>}</article>
        : <article><h1>{tr('未找到页面', 'Page not found')}</h1><p><a href={documentHref(documentStart, locale)}>{tr('前往 Desktop 文档', 'Go to Desktop documentation')}</a></p></article>}
      {entryTitle && <PageResources key={id+locale} id={id} title={entryTitle} component={Boolean(doc)}/>}
      {index >= 0 && <nav className="page-neighbors" aria-label={tr("上一页和下一页", "Previous and next pages")}>
        {entries[index - 1] && <a href={documentHref(entries[index - 1].href, locale)}>← {navigationTitle(entries[index - 1], locale)}</a>}
        {entries[index + 1] && <a href={documentHref(entries[index + 1].href, locale)}>{navigationTitle(entries[index + 1], locale)} →</a>}
      </nav>}
    </DocsLayout>
    <Dialog open={menu} onClose={setMenu} className="mobile-navigation" data-theme="desktop">
      <DialogBackdrop className="search-backdrop"/>
      <DialogPanel className="mobile-navigation-panel">
        <div className="mobile-navigation-heading">
          <DialogTitle>{tr('文档导航', 'Documentation menu')}</DialogTitle>
          <Button data-autofocus aria-label={tr('关闭导航', 'Close menu')} onClick={() => setMenu(false)}>
            <FontAwesomeIcon icon={faXmark} aria-hidden="true"/>
          </Button>
        </div>
        <div className="mobile-settings">{settings}</div>
        <DocsNavigation items={navigation} current={route} onNavigate={() => setMenu(false)}/>
      </DialogPanel>
    </Dialog>
    <Dialog open={search} onClose={setSearch} className="search-dialog" data-theme="desktop">
      <DialogBackdrop className="search-backdrop"/>
      <DialogPanel className="search-panel">
        <DialogTitle>{tr("搜索文档", "Search documentation")}</DialogTitle>
        <input data-autofocus type="search" aria-label={tr("搜索文档", "Search documentation")} value={query} onChange={event => setQuery(event.target.value)} placeholder={tr("组件、颜色、主题…", "Components, colors, themes…")}/>
        <ul>{matches.length ? matches.map(item => <li key={item.href}><a href={documentHref(item.href, locale)} onClick={() => setSearch(false)}>{navigationTitle(item, locale)}</a></li>) : <li>{tr("没有匹配的文档", "No matching pages")}</li>}</ul>
      </DialogPanel>
    </Dialog>
  </div></DarkAppearanceContext.Provider></LocaleContext.Provider>
}
