import { useEffect, type ReactNode } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { documentationSectionAnchor, documentationTab, documentationTabs } from '../app/component-headings'
import { useLocale } from '../app/locale'

export function splitComponentMarkdown(markdown: string) {
  const sections: { title: string; lines: string[] }[] = []
  const intro: string[] = []
  let current = intro
  let fence = ''
  for (const line of markdown.split('\n')) {
    const marker = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1]
    if (marker) {
      if (!fence) fence = marker
      else if (marker.startsWith(fence) && /^\s*$/.test(line.trimStart().slice(marker.length))) fence = ''
    }
    const heading = !fence && /^##\s+(.+?)\s*$/.exec(line)
    if (heading) {
      current = []
      sections.push({ title: heading[1], lines: current })
    }
    current.push(line)
  }
  return { intro: intro.join('\n'), sections }
}

export default function ComponentDocumentationLayout({ markdown, hash, render }: {
  markdown: string
  hash: string
  render: (markdown: string) => ReactNode
}) {
  const { tr } = useLocale()
  const { intro, sections } = splitComponentMarkdown(markdown)
  const known = new Set<string>(documentationTabs.flatMap(tab => [...tab.sections]))
  const tabs = documentationTabs.map(tab => ({
    ...tab,
    sections: [...tab.sections.flatMap(title => sections.filter(section => section.title === title)),
      ...(tab.id === 'guidelines' ? sections.filter(section => !known.has(section.title)) : [])],
  })).filter(tab => tab.sections.length)
  const index = Math.max(0, tabs.findIndex(tab => tab.id === documentationTab(hash).id))

  useEffect(() => {
    const anchor = documentationSectionAnchor(hash)
    if (anchor) document.getElementById(anchor)?.scrollIntoView()
  }, [hash])

  return <>
    {render(intro)}
    {tabs.length > 0 && <TabGroup selectedIndex={index} onChange={next => {
      const route = hash.slice(1).split(/[?#]/)[0]
      window.location.hash = route + '?tab=' + tabs[next].id
    }}>
      <TabList className="documentation-tabs" aria-label={tr('组件文档', 'Component documentation')}>
        {tabs.map(tab => <Tab key={tab.id}>{tr(tab.zh, tab.label)}</Tab>)}
      </TabList>
      <TabPanels>
        {tabs.map(tab => <TabPanel key={tab.id} unmount={false}>
          {render(tab.sections.flatMap(section => section.lines).join('\n'))}
        </TabPanel>)}
      </TabPanels>
    </TabGroup>}
  </>
}
