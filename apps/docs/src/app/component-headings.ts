export const componentHeadings = [
  'Overview', 'Anatomy', 'Live Preview', 'Sizes', 'Variants', 'States',
  'Behavior', 'Accessibility', 'API Reference', 'Code Example', 'Design Specifications', 'References',
] as const

export const documentationTabs = [
  { id: 'overview', label: 'Overview', zh: '概览', sections: ['Overview', 'Anatomy', 'Live Preview'] },
  { id: 'examples', label: 'Examples', zh: '示例', sections: ['Sizes', 'Variants', 'States'] },
  { id: 'guidelines', label: 'Guidelines', zh: '指南', sections: ['Behavior', 'Design Specifications', 'References'] },
  { id: 'accessibility', label: 'Accessibility', zh: '辅助功能', sections: ['Accessibility'] },
  { id: 'api', label: 'API', zh: 'API', sections: ['API Reference', 'Code Example'] },
] as const

export function documentationSectionAnchor(hash: string) {
  const query = hash.split('?')[1]?.split('#')[0]
  return hash.includes('#') ? hash.split('#').at(-1) ?? '' : new URLSearchParams(query).get('section') || ''
}

export function documentationTab(hash: string) {
  const anchor = documentationSectionAnchor(hash)
  const requested = new URLSearchParams(hash.split('?')[1]?.split('#')[0]).get('tab')
  return documentationTabs.find(tab => tab.sections.some(title => title.toLowerCase().replaceAll(' ', '-') === anchor))
    ?? documentationTabs.find(tab => tab.id === (anchor === 'installation' ? 'api' : requested))
    ?? documentationTabs[0]
}
