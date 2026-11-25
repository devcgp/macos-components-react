import type { ReactNode } from 'react'
import { documentHref, homeHref } from '../app/document-urls'
import type { Locale } from '../app/locale'
import { navigation, navigationPages, navigationTitle } from '../app/navigation'

export default function SiteHeader({ locale, sectionId, children }: {
  locale: Locale
  sectionId?: string
  children: ReactNode
}) {
  return <header className="site-header">
    <a className="brand" href={homeHref(locale)}>CGP Desktop UI</a>
    <nav className="header-sections" aria-label={locale === 'en' ? 'Documentation sections' : '一级目录'}>
      {navigation.map(item => {
        const firstPage = navigationPages.find(({ ancestors }) => ancestors[0] === item.id)
        return firstPage && <a key={item.id} href={documentHref(firstPage.page.href, locale)}
          aria-current={item.id === sectionId ? 'true' : undefined}>{navigationTitle(item, locale)}</a>
      })}
    </nav>
    {children}
  </header>
}
