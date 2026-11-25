import type { Locale } from './locale'

export const documentStart = '/desktop/getting-started/introduction'

const legacyPaths: Record<string, string> = {
  '/overview': documentStart,
  '/design-system/desktop': documentStart,
  '/design-system/tahoe': documentStart,
  '/desktop/showcase': documentStart,
  '/desktop/design': '/desktop/foundations/control-geometry',
  '/desktop/colors': '/desktop/foundations/color',
  '/desktop/foundations/accessibility': '/desktop/foundations/color',
}

export function documentPath(path: string) {
  const normalized = path.replace(/^\/en(?=\/|$)/, '').replace(/^\/tahoe(?=\/|$)/, '/desktop').replace(/\/$/, '')
  return legacyPaths[normalized] ?? (normalized || documentStart)
}

export function documentHref(href: string, locale: Locale) {
  const [route, suffix = ''] = /^([^?#]+)(.*)$/.exec(href.replace(/^#(?=\/)/, ''))?.slice(1) ?? []
  if (!route || !/^\/(?:en\/)?(?:desktop|tahoe)(?:\/|$)/.test(route)) return href
  const path = documentPath(route)
  return (locale === 'en' ? '/en' + path : path === documentStart ? '/' : path) + suffix
}
