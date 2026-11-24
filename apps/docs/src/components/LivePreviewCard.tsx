import { useContext, useId, useState, type MouseEvent, type ReactNode } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import { DarkAppearanceContext } from '../app/appearance'
import { useLocale } from '../app/locale'
import CopyCode from './CopyCode'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

function HighlightedCode({ source }: { source: string }) {
  const highlighted = hljs.highlight(source, { language: 'typescript' }).value
  return <pre tabIndex={0}><code className="language-tsx" dangerouslySetInnerHTML={{ __html: highlighted }}/></pre>
}

function preserveTextFieldFocus(event: MouseEvent<HTMLDivElement>) {
  const focused = event.currentTarget.ownerDocument.activeElement
  if (focused?.matches('input.tahoe-field-control') &&
      event.currentTarget.closest('.tahoe-preview-card')?.contains(focused)) {
    event.preventDefault()
  }
}

export default function LivePreviewCard({ title, code, children }: {
  title: string
  code: string
  children: ReactNode
}) {
  const { tr } = useLocale()
  const globalDark = useContext(DarkAppearanceContext)
  const [previewDark, setPreviewDark] = useState<boolean>()
  const dark = previewDark ?? globalDark
  const headingId = useId()
  return <section className="tahoe-preview-card" aria-labelledby={headingId} data-theme="tahoe" data-appearance={dark ? 'dark' : 'light'}>
    <header className="tahoe-preview-header">
      <h3 id={headingId}>{title}</h3>
      <div className="tahoe-preview-tabs" role="group" aria-label={tr('预览外观', 'Preview appearance')} onMouseDown={preserveTextFieldFocus}>
        <button type="button" aria-pressed={!dark} onClick={() => setPreviewDark(false)}>{tr('浅色', 'Light')}</button>
        <button type="button" aria-pressed={dark} onClick={() => setPreviewDark(true)}>{tr('深色', 'Dark')}</button>
      </div>
    </header>
    <TabGroup>
      <TabList className="tahoe-preview-tabs tahoe-preview-views" aria-label={tr('预览内容', 'Preview content')}>
        <Tab>{tr('预览', 'Preview')}</Tab>
        <Tab>{tr('代码', 'Code')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel unmount={false} className="preview-content tahoe-preview-panel">{children}</TabPanel>
        <TabPanel className="tahoe-preview-code tahoe-preview-panel">
          <CopyCode source={code} label={tr('复制代码', 'Copy code')}><HighlightedCode source={code}/></CopyCode>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </section>
}
