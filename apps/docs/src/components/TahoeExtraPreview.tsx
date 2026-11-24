import { useLocale } from '../app/locale'
import { localizeExample } from '../app/example-copy'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {
  Alert, Badge, Breadcrumb, Button, ContextMenu, Dialog, DropdownMenu, IconButton, InspectorPanel,
  List, Popover, RadioGroup, Select, SettingsGroup, Sheet, Spinner, SplitView, Switch, Table, Tabs,
  TextArea, TitleBar, Tooltip, TrafficLights, Window,
} from '@macos-tahoe/ui'

export const extraComponents = [
  ['icon-button', 'IconButton'], ['text-area', 'TextArea'], ['radio-group', 'RadioGroup'],
  ['tabs', 'Tabs'], ['dropdown-menu', 'DropdownMenu'], ['popover', 'Popover'], ['select', 'Select'],
  ['context-menu', 'ContextMenu'], ['breadcrumb', 'Breadcrumb'], ['table', 'Table'], ['list', 'List'],
  ['badge', 'Badge'], ['alert', 'Alert'], ['spinner', 'Spinner'], ['tooltip', 'Tooltip'],
  ['dialog', 'Dialog'], ['sheet', 'Sheet'], ['window', 'Window'], ['title-bar', 'TitleBar'],
  ['traffic-lights', 'TrafficLights'], ['split-view', 'SplitView'], ['inspector-panel', 'InspectorPanel'],
  ['settings-group', 'SettingsGroup'],
] as const

type ExtraId = typeof extraComponents[number][0]

export default function TahoeExtraPreview({ id }: { id: ExtraId }) {
  const { locale } = useLocale()
  const t = (text: string) => localizeExample(text, locale)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const actions = [{ id: 'info', label: t('显示简介'), onSelect: () => setMessage('JPEG · 2400 × 1600') },
    { id: 'delete', label: t('删除'), disabled: true, onSelect: () => {} }]
  switch (id) {
    case 'icon-button': return <><IconButton label={t('查找')} onClick={() => setMessage(t('找到 3 张图片'))}><FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true"/></IconButton><output>{message}</output></>
    case 'text-area': return <TextArea label={t('备注')} rows={3} placeholder={t('输入图片备注')}/>
    case 'radio-group': return <RadioGroup label={t('图库视图')} options={[{ value: 'grid', label: t('网格') }, { value: 'list', label: t('列表') }]} defaultValue="grid"/>
    case 'tabs': return <Tabs label={t('图库')} items={[{ id: 'all', label: t('所有照片'), panel: t('3 张照片') }, { id: 'favorite', label: t('收藏'), panel: t('1 张照片') }]}/>
    case 'dropdown-menu': return <><DropdownMenu label={t('文件')} actions={actions}/><output>{message}</output></>
    case 'context-menu': return <><ContextMenu label={t('文件操作')} actions={actions}/><output>{message || t('按右键或 Enter')}</output></>
    case 'popover': return <Popover label={t('文件信息')}>JPEG · 2400 × 1600</Popover>
    case 'select': return <Select label={t('格式')}><option>JPEG</option><option>PNG</option></Select>
    case 'breadcrumb': return <Breadcrumb label={locale === "en" ? "Path" : undefined} items={[{ label: t('组件目录'), href: '#/tahoe/showcase' }, { label: 'Breadcrumb', href: '#/tahoe/breadcrumb' }]}/>
    case 'table': return <Table caption={t('图库')} columns={[{ id: 'name', label: t('文件') }, { id: 'size', label: t('尺寸') }]} rows={[{ id: 'coast', cells: { name: t('海岸.jpg'), size: '2400 × 1600' } }]}/>
    case 'list': return <List><li>{t('海岸.jpg')}</li><li>{t('林间.jpg')}</li></List>
    case 'badge': return <Badge>JPEG</Badge>
    case 'alert': return <Alert title={t('读取完成')}>{t('已导入 3 张图片。')}</Alert>
    case 'spinner': return <Spinner label={t('正在读取图库')}/>
    case 'tooltip': return <Tooltip text={t('显示文件信息')}>{t('详情')}</Tooltip>
    case 'dialog':
    case 'sheet': {
      const Overlay = id === 'dialog' ? Dialog : Sheet
      return <><Button onClick={() => setOpen(true)}>{t('查看详情')}</Button><Overlay closeLabel={locale === "en" ? "Close" : undefined} open={open} onClose={() => setOpen(false)} title={t('文件详情')}>JPEG · 2400 × 1600</Overlay></>
    }
    case 'window': return <Window title="PhotoVault"><SplitView leading={<List><li>{t('所有照片')}</li><li>{t('收藏')}</li></List>}><InspectorPanel title={t('文件详情')}>JPEG</InspectorPanel></SplitView></Window>
    case 'title-bar': return <TitleBar title="PhotoVault"/>
    case 'traffic-lights': return <TrafficLights/>
    case 'split-view': return <SplitView leading={<List><li>{t('目录')}</li></List>}>{t('图库')}</SplitView>
    case 'inspector-panel': return <InspectorPanel title={t('文件详情')}>JPEG · 2400 × 1600</InspectorPanel>
    case 'settings-group': return <SettingsGroup title={t('图库')}><Switch label={t('显示文件名')}/></SettingsGroup>
  }
}
