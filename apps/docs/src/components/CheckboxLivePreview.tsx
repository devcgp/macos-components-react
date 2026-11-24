import { useLocale } from '../app/locale'
import { translateSource } from '../app/preview-source'
import { CheckboxSelection, selectionLabels } from '../examples/checkbox/CheckboxSelection'
import { CheckboxStates, checkboxStateLabels } from '../examples/checkbox/CheckboxStates'
import { ControlledCheckbox, controlledLabels } from '../examples/checkbox/ControlledCheckbox'
import { CheckboxForm, formLabels } from '../examples/checkbox/CheckboxForm'
import selectionSource from '../examples/checkbox/CheckboxSelection.tsx?raw'
import statesSource from '../examples/checkbox/CheckboxStates.tsx?raw'
import controlledSource from '../examples/checkbox/ControlledCheckbox.tsx?raw'
import formSource from '../examples/checkbox/CheckboxForm.tsx?raw'
import LivePreviewCard from './LivePreviewCard'

const selectionZh: typeof selectionLabels = { unchecked: '未选中', checked: '已选中' }
const statesZh: typeof checkboxStateLabels = {
  initial: '默认', checked: '已选中', disabledUnchecked: '禁用且未选中', disabledChecked: '禁用且已选中',
}
const controlledZh: typeof controlledLabels = { option: '显示文件名', value: '选中状态' }
const formZh: typeof formLabels = {
  legend: '照片详情', filenames: '文件名', extensions: '文件扩展名',
  sizes: '图片尺寸', submit: '提交选项', empty: '未选择任何选项',
}

export default function CheckboxLivePreview() {
  const { locale, tr } = useLocale()
  const selection = locale === 'zh-CN' ? selectionZh : selectionLabels
  const states = locale === 'zh-CN' ? statesZh : checkboxStateLabels
  const controlled = locale === 'zh-CN' ? controlledZh : controlledLabels
  const form = locale === 'zh-CN' ? formZh : formLabels

  return <div className="tahoe-preview-cards">
    <LivePreviewCard title={tr('复选框选择', 'Checkbox Selection')} code={translateSource(selectionSource, selectionLabels, selection)}>
      <CheckboxSelection labels={selection}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('复选框状态', 'Checkbox States')} code={translateSource(statesSource, checkboxStateLabels, states)}>
      <CheckboxStates labels={states}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('受控复选框', 'Controlled Checkbox')} code={translateSource(controlledSource, controlledLabels, controlled)}>
      <ControlledCheckbox labels={controlled}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('复选框分组与表单', 'Checkbox Group / Form')} code={translateSource(formSource, formLabels, form)}>
      <CheckboxForm labels={form}/>
    </LivePreviewCard>
  </div>
}
