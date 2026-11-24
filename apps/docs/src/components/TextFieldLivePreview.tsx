import { useLocale } from '../app/locale'
import { translateSource } from '../app/preview-source'
import { TextFieldBasics, basicsLabels } from '../examples/text-field/TextFieldBasics'
import { TextFieldStates, statesLabels } from '../examples/text-field/TextFieldStates'
import { ControlledTextField, controlledLabels } from '../examples/text-field/ControlledTextField'
import { TextFieldForm, formLabels } from '../examples/text-field/TextFieldForm'
import { TextFieldSettings, settingsLabels } from '../examples/text-field/TextFieldSettings'
import basicsSource from '../examples/text-field/TextFieldBasics.tsx?raw'
import statesSource from '../examples/text-field/TextFieldStates.tsx?raw'
import controlledSource from '../examples/text-field/ControlledTextField.tsx?raw'
import formSource from '../examples/text-field/TextFieldForm.tsx?raw'
import settingsSource from '../examples/text-field/TextFieldSettings.tsx?raw'
import LivePreviewCard from './LivePreviewCard'

export default function TextFieldLivePreview() {
  const { locale, tr } = useLocale()
  const basics = locale === 'en' ? basicsLabels : {
    empty: '空值', placeholder: '占位提示', hint: '输入名称', filled: '默认值', initial: '照片',
  }
  const states = locale === 'en' ? statesLabels : {
    initial: '默认', filled: '已填写', focus: '按 Tab 聚焦', disabled: '禁用', readOnly: '只读',
    required: '必填', value: '照片', submit: '验证必填项', passed: '必填项验证通过。',
  }
  const controlled = locale === 'en' ? controlledLabels : {
    field: '文件夹名称', initial: '照片', value: '当前值', characters: '字符数', reset: '重置',
  }
  const form = locale === 'en' ? formLabels : {
    field: '文件夹名称', submit: '提交', missing: '请输入文件夹名称。', saved: '已提交名称',
  }
  const settings = locale === 'en' ? settingsLabels : {
    title: '文件夹设置', field: '文件夹名称', initial: '照片图库', save: '保存', saved: '已保存名称',
  }

  return <div className="desktop-preview-cards">
    <LivePreviewCard title={tr('文本输入框基础', 'Text Field Basics')} code={translateSource(basicsSource, basicsLabels, basics)}>
      <TextFieldBasics labels={basics}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('文本输入框状态', 'Text Field States')} code={translateSource(statesSource, statesLabels, states)}>
      <TextFieldStates labels={states}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('受控文本输入框', 'Controlled Text Field')} code={translateSource(controlledSource, controlledLabels, controlled)}>
      <ControlledTextField labels={controlled}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('表单与验证', 'Form & Validation')} code={translateSource(formSource, formLabels, form)}>
      <TextFieldForm labels={form}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('设置中的文本输入框', 'Text Field in Settings')} code={translateSource(settingsSource, settingsLabels, settings)}>
      <TextFieldSettings labels={settings}/>
    </LivePreviewCard>
  </div>
}
