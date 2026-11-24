import ComponentDocumentationLayout from '../layouts/ComponentDocumentationLayout'
import { createContext, isValidElement, Suspense, useContext, useState, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Checkbox } from '@macos-tahoe/ui'
import { slug } from '../app/catalog'
import { installCommands } from '../app/installation'
import { useLocale, localizeTitle } from '../app/locale'
import ComponentPreview, { componentCardPreviews } from './ComponentPreview'
import CopyCode from './CopyCode'

const ComponentId = createContext('')
const disableable = new Set(['switch', 'slider', 'search-field', 'combo-box'])

function LivePreview({ id }: { id: string }) {
  const { tr } = useLocale()
  const [disabled, setDisabled] = useState(false)

  return <div className="live-preview">
    {disableable.has(id) && <Checkbox label={tr('禁用控件', 'Disable control')} checked={disabled} onChange={event => setDisabled(event.target.checked)}/>}
    <div className="preview-content"><ComponentPreview id={id} disabled={disabled}/></div>
  </div>
}

function Installation() {
  const { tr } = useLocale()
  const source = tr(installCommands, installCommands.replace(
    '在你的 React 19 项目目录运行，路径指向刚生成的文件',
    'Run from your React 19 project using the generated tarball path',
  ))
  return <>
    <h3 id="installation" className="doc-section">{tr('安装', 'Installation')}</h3>
    <p>{tr(
      '从公开仓库克隆源码，构建并打包 UI，然后将生成的压缩包安装到 React 19 项目。',
      'Clone the public repository, build and pack the UI, then install the tarball in a React 19 project.',
    )} <a href="#/tahoe/getting-started/installation">{tr('完整安装指南', 'Installation guide')}</a></p>
    <CopyCode source={source} label={tr('复制安装命令', 'Copy install commands')}><pre><code>{source}</code></pre></CopyCode>
  </>
}

function SectionHeading({ children }: { children?: ReactNode }) {
  const { locale } = useLocale()
  const id = useContext(ComponentId)
  const CardPreview = componentCardPreviews[id]
  if (typeof children !== 'string') return <h2>{children}</h2>

  return <>
    <h2 id={slug(children)} className="doc-section">{localizeTitle(children, locale)}</h2>
    {children === 'Live Preview' && (CardPreview ? <Suspense fallback={null}><CardPreview/></Suspense> : <LivePreview id={id}/>)}
    {children === 'Code Example' && <Installation/>}
  </>
}

function MarkdownCode({ children }: { children?: ReactNode }) {
  const { tr } = useLocale()
  const pre = <pre>{children}</pre>
  if (!isValidElement<{ children?: ReactNode }>(children) || typeof children.props.children !== 'string') return pre

  return <CopyCode source={children.props.children.trimEnd()} label={tr('复制代码', 'Copy code')}>{pre}</CopyCode>
}

const markdownComponents: Components = { h2: SectionHeading, pre: MarkdownCode }

export default function ComponentDocPage({ id, markdown, hash }: { id: string; markdown: string; hash: string }) {
  return <article className="markdown">
    <ComponentId.Provider value={id}>
      <ComponentDocumentationLayout markdown={markdown} hash={hash} render={source =>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{source}</ReactMarkdown>
      }/>
    </ComponentId.Provider>
  </article>
}
