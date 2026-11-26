import type { ReactNode } from 'react'
import { documentHref, homeHref } from '../app/document-urls'
import type { Locale } from '../app/locale'
import { navigation, navigationPages, navigationTitle } from '../app/navigation'

export default function SiteHeader({ locale, sectionId, landing = false, children }: {
  locale: Locale
  sectionId?: string
  landing?: boolean
  children: ReactNode
}) {
  const links = landing ? [
    { label: locale === 'en' ? 'Docs' : '文档', route: '/desktop/getting-started/introduction' },
    { label: locale === 'en' ? 'Components' : '组件', route: '/desktop/button' },
  ] : []
  return <header className={landing ? 'site-header landing-site-header' : 'site-header'}>
    <a className="brand" href={homeHref(locale)}>CGP Desktop UI</a>
    <nav className="header-sections" aria-label={locale === 'en' ? 'Documentation sections' : '一级目录'}>
      {landing ? links.map(({ label, route }) => <a key={route} href={documentHref(route, locale)}>{label}</a>) : navigation.map(item => {
        const firstPage = navigationPages.find(({ ancestors }) => ancestors[0] === item.id)
        return firstPage && <a key={item.id} href={documentHref(firstPage.page.href, locale)}
          aria-current={item.id === sectionId ? 'true' : undefined}>{navigationTitle(item, locale)}</a>
      })}
    </nav>
    {children}
  </header>
}
