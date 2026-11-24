import { useLocale } from '../app/locale'
import { localizeExample } from '../app/example-copy'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faFolder, faImages } from '@fortawesome/free-regular-svg-icons'
import { faList, faTableCellsLarge, faTableColumns } from '@fortawesome/free-solid-svg-icons'
import { Button, Dropdown, SearchField, Sidebar, Slider, Toolbar } from '@cgpdesktopui/ui'

export default function DesktopWindowDemo({ focus }: { focus: 'sidebar' | 'toolbar' }) {
  const { locale, tr } = useLocale()
  const t = (text: string) => localizeExample(text, locale)
  const groups = [
    { id: 'library', label: t('图库'), items: [
      { id: 'all', label: t('所有照片'), icon: <FontAwesomeIcon icon={faImages} aria-hidden="true"/> },
      { id: 'favorites', label: t('收藏'), icon: <FontAwesomeIcon icon={faBookmark} aria-hidden="true"/> },
    ] },
    { id: 'folders', label: t('文件夹'), items: [
      { id: 'travel', label: t('旅行照片'), icon: <FontAwesomeIcon icon={faFolder} aria-hidden="true"/> },
      { id: 'design', label: t('设计参考'), icon: <FontAwesomeIcon icon={faFolder} aria-hidden="true"/> },
    ] },
  ]
  const photos = [
    { name: t('海岸.jpg'), format: 'JPEG', folder: 'travel', favorite: true },
    { name: t('林间.jpg'), format: 'JPEG', folder: 'travel', favorite: false },
    { name: t('配色.png'), format: 'PNG', folder: 'design', favorite: true },
  ]
  const options = [t('全部'), 'JPEG', 'PNG'].map(value => ({ value, label: value }))
  const [selected, setSelected] = useState('all')
  const [collapsed, setCollapsed] = useState<string[]>([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [query, setQuery] = useState('')
  const [format, setFormat] = useState(t('全部'))
  const [grid, setGrid] = useState(true)
  const [size, setSize] = useState(120)
  const title = groups.flatMap(group => group.items).find(item => item.id === selected)?.label ?? t('所有照片')
  const visible = photos.filter(photo =>
    (selected === 'all' || (selected === 'favorites' ? photo.favorite : photo.folder === selected)) &&
    (format === t('全部') || photo.format === format) &&
    photo.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return <div className="desktop-window-demo" data-focus-area={focus} data-sidebar={showSidebar}>
    {showSidebar && <Sidebar label={tr("图库目录", "Photo library navigation")} groups={groups} selected={selected} collapsed={collapsed} onSelect={setSelected}
      onToggle={id => setCollapsed(previous => previous.includes(id) ? previous.filter(group => group !== id) : [...previous, id])}/>}
    <div className="desktop-window-content">
      <Toolbar filtersLabel={tr("筛选", "Filters")} actionsLabel={tr("显示操作", "View actions")} title={title} detail={<output>{tr(visible.length + ' 张照片', visible.length === 1 ? '1 photo' : visible.length + ' photos')}</output>}
        filters={<Dropdown selectedLabel={tr("（当前选中）", " (selected)")} label={format} selected={[format]} options={options} onSelect={setFormat}/>}
        actions={<>
          <Button aria-label={t('显示侧栏')} title={t('显示侧栏')} aria-pressed={showSidebar} onClick={() => setShowSidebar(previous => !previous)}><FontAwesomeIcon icon={faTableColumns} aria-hidden="true"/></Button>
          <Button aria-label={t('网格视图')} title={t('网格视图')} aria-pressed={grid} onClick={() => setGrid(previous => !previous)}>{grid ? <FontAwesomeIcon icon={faTableCellsLarge} aria-hidden="true"/> : <FontAwesomeIcon icon={faList} aria-hidden="true"/>}</Button>
        </>}
        search={<SearchField className="desktop-toolbar-search" aria-label={t('搜索照片')} placeholder={t('搜索照片')} value={query} onChange={event => setQuery(event.target.value)}/>}/>
      <div className="desktop-gallery-demo">
        {visible.length ? <ul style={grid ? { gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${size}px), 1fr))` } : undefined}>
          {visible.map(photo => <li key={photo.name}><FontAwesomeIcon icon={faImages} aria-hidden="true"/>{photo.name}</li>)}
        </ul> : <p>{t('没有符合条件的照片')}</p>}
      </div>
      {grid && <div className="desktop-window-zoom">
        <Slider aria-label={t('缩略图宽度')} min={96} max={200} value={size} onChange={event => setSize(Number(event.target.value))}/>
        <output>{size}px</output>
      </div>}
    </div>
  </div>
}
