import { useLocale } from '../app/locale'
import { localizeExample } from '../app/example-copy'
import { lazy, useState, type ComponentType } from 'react'
import {
  Button, ComboBox, DisclosureControl, Dropdown, ImageView, List, OutlineView, Progress, Radio,
  ScrollView, SearchField, SegmentedControl, Slider, Stepper, Switch, TextView,
} from '@macos-tahoe/ui'
import TahoeExtraPreview, { extraComponents } from './TahoeExtraPreview'
import TahoeWindowDemo from './TahoeWindowDemo'

const image = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="96" viewBox="0 0 180 96"><rect width="180" height="96" fill="#dbeafe"/><path d="M0 96 54 38 86 74 113 48 180 96" fill="#60a5fa"/></svg>')

export const componentCardPreviews: Partial<Record<string, ComponentType>> = {
  button: lazy(() => import('./ButtonLivePreview')),
  checkbox: lazy(() => import('./CheckboxLivePreview')),
  sidebar: lazy(() => import('./SidebarLivePreview')),
  'text-field': lazy(() => import('./TextFieldLivePreview')),
}

export default function ComponentPreview({ id, disabled = false }: { id: string; disabled?: boolean }) {
  const { locale } = useLocale()
  const t = (text: string) => localizeExample(text, locale)
  const [number, setNumber] = useState(3)
  const [layout, setLayout] = useState(t('网格'))
  const [format, setFormat] = useState(t('全部'))
  switch (id) {
    case 'switch': return <Switch label={t('同步收藏')} defaultChecked disabled={disabled}/>
    case 'slider': return <Slider aria-label={t('缩略图大小')} min={110} max={280} defaultValue={170} disabled={disabled}/>
    case 'stepper': return <Stepper incrementLabel={locale === "en" ? "Increase quantity" : undefined} decrementLabel={locale === "en" ? "Decrease quantity" : undefined} label={t('数量')} min={1} max={10} value={number} onChange={setNumber}/>
    case 'radio': return <fieldset>
      <legend>{t('图库布局')}</legend>
      <Radio name="view-mode" label={t('网格')} defaultChecked/>
      <Radio name="view-mode" label={t('列表')}/>
    </fieldset>
    case 'segmented-control': return <SegmentedControl label={t('图库布局')} name="view" value={layout} options={[t('网格'), t('列表')]} onChange={setLayout}/>
    case 'search-field': return <SearchField aria-label={t('搜索照片')} placeholder={t('搜索照片')} disabled={disabled}/>
    case 'dropdown': return <Dropdown selectedLabel={locale === "en" ? " (selected)" : undefined} label={format} options={[t('全部'), 'JPEG', 'PNG'].map(value => ({ value, label: value }))} selected={[format]} onSelect={setFormat}/>
    case 'progress-indicator': return <><Progress label={t('导入进度')} value={number * 10}/><Button onClick={() => setNumber(value => value === 10 ? 0 : value + 1)}>{t('更新进度')}</Button></>
    case 'toolbar': return <TahoeWindowDemo focus={id}/>
    case 'disclosure-control': return <DisclosureControl label={t('文件信息')}>JPEG · 2400 × 1600</DisclosureControl>
    case 'image-view': return <ImageView src={image} width={180} height={96} alt={t('两座山的图形示意')}/>
    case 'text-view': return <TextView tone="secondary">{t('照片保持原始文件名和格式。')}</TextView>
    case 'outline-view': return <OutlineView items={[{ id: '1', label: t('照片图库'), children: [{ id: '2', label: t('海岸.jpg') }, { id: '3', label: t('林间.jpg') }] }]}/>
    case 'scroll-view': return <ScrollView label={t('文件名列表')} maxHeight={96}><List>{Array.from({length: 8}, (_, index) => <li key={index}>{t("照片")} {index + 1}.jpg</li>)}</List></ScrollView>
    case 'combo-box': return <ComboBox label={t('格式')} options={['JPEG', 'PNG']} disabled={disabled}/>
    default: {
      const key = extraComponents.find(([key]) => key === id)?.[0]
      return key ? <TahoeExtraPreview id={key}/> : null
    }
  }
}
