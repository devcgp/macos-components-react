import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { documentHref, documentStart } from '../src/app/document-urls'
import type { Locale } from '../src/app/locale'
import { navigationPages, navigationTitle } from '../src/app/navigation'
import tokensZh from '../../../docs/tokens.md?raw'
import tokensEn from '../../../docs/tokens.en.md?raw'

const origin = 'https://cgpdesktopui.com'
const brand = 'macOS Components for React'
const pages = import.meta.glob<string>(
  ['../content/*/*.md', '!../content/*/README.md'],
  { eager: true, query: '?raw', import: 'default' },
)
const template = readFileSync('dist/index.html', 'utf8')
const locales = ['zh-CN', 'en'] as const
const sitemap: string[] = []

function renderPage(page: (typeof navigationPages)[number]['page'], locale: Locale) {
  const suffix = locale === 'en' ? '.en.md' : '.md'
  const markdown = page.id === 'tokens' ? (locale === 'en' ? tokensEn : tokensZh)
    : pages['../content/' + page.id + suffix] ?? pages['../content/components/' + page.id + suffix]
  if (!markdown) throw new Error('Missing ' + locale + ' document: ' + page.id)

  const path = documentHref(page.href, locale)
  const canonical = origin + path
  const title = navigationTitle(page, locale) + ' · ' + brand
  const paragraph = markdown.split(/\r?\n/).find(line => /^[\p{L}\p{N}]/u.test(line))
  const description = (paragraph ?? title).replace(/\[([^\]]+)]\([^)]+\)/g, '$1').replace(/[`*_]/g, '').slice(0, 160)
  const metadata = renderToStaticMarkup(<>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="canonical" href={canonical}/>
    {locales.map(language => <link key={language} rel="alternate" hrefLang={language} href={origin + documentHref(page.href, language)}/>)}
  </>)
  const content = renderToStaticMarkup(<div data-theme="desktop">
    <header className="site-header">
      <a className="brand" href={documentHref(documentStart, locale)}>{brand}</a>
      <a href={documentHref(page.href, locale === 'en' ? 'zh-CN' : 'en')}>{locale === 'en' ? '简体中文' : 'English'}</a>
    </header>
    <main id="main" className="docs-static">
      <h1>{navigationTitle(page, locale)}</h1>
      <article className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: () => null }}
          urlTransform={url => defaultUrlTransform(documentHref(url, locale))}>{markdown}</ReactMarkdown>
      </article>
      <nav aria-label={locale === 'en' ? 'Documentation' : '文档导航'}>
        {navigationPages.filter(entry => entry.page.href !== page.href).map(({ page: entry }) =>
          <a key={entry.id} href={documentHref(entry.href, locale)}>{navigationTitle(entry, locale)}</a>,
        )}
      </nav>
    </main>
  </div>)
  const html = template.replace('<html lang="zh-CN">', '<html lang="' + locale + '">')
    .replace(/^\s*<meta name="description"[^>]*>\n/m, '\n')
    .replace(/<title>[^<]*<\/title>/, () => metadata)
    .replace('<div id="root"></div>', () => '<div id="root">' + content + '</div>')
  const file = join('dist', path === '/' ? 'index.html' : path + '.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  sitemap.push('  <url><loc>' + canonical + '</loc></url>')
}

for (const { page } of navigationPages) {
  for (const locale of locales) renderPage(page, locale)
}
writeFileSync('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemap.join('\n') + '\n</urlset>\n')
writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n')
