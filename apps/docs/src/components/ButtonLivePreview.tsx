import { useLocale } from '../app/locale'
import { translateSource } from '../app/preview-source'
import { ButtonSizes } from '../examples/button/ButtonSizes'
import { ButtonVariants } from '../examples/button/ButtonVariants'
import { ButtonStates, stateLabels } from '../examples/button/ButtonStates'
import { IconButtonExample, iconLabels } from '../examples/button/IconButtonExample'
import sizesSource from '../examples/button/ButtonSizes.tsx?raw'
import variantsSource from '../examples/button/ButtonVariants.tsx?raw'
import statesSource from '../examples/button/ButtonStates.tsx?raw'
import iconSource from '../examples/button/IconButtonExample.tsx?raw'
import LivePreviewCard from './LivePreviewCard'

const stateZh: typeof stateLabels = {
  save: '保存',
  hover: '悬停',
  pressed: '按下',
  focus: '焦点',
  disabled: '已禁用',
  loading: '正在加载…',
  done: '已保存',
  hint: '把指针移到「悬停」，按住「按下」，或用 Tab 键移到「焦点」。',
}
const iconZh: typeof iconLabels = { refresh: '刷新', done: '已刷新' }

export default function ButtonLivePreview() {
  const { locale, tr } = useLocale()
  const states = locale === 'zh-CN' ? stateZh : stateLabels
  const icon = locale === 'zh-CN' ? iconZh : iconLabels

  return <div className="tahoe-preview-cards">
    <LivePreviewCard title={tr('按钮尺寸', 'Button Sizes')} code={sizesSource.trimEnd()}><ButtonSizes/></LivePreviewCard>
    <LivePreviewCard title={tr('按钮变体', 'Button Variants')} code={variantsSource.trimEnd()}><ButtonVariants/></LivePreviewCard>
    <LivePreviewCard title={tr('按钮状态', 'Button States')} code={translateSource(statesSource, stateLabels, states)}>
      <ButtonStates labels={states}/>
    </LivePreviewCard>
    <LivePreviewCard title="IconButton" code={translateSource(iconSource, iconLabels, icon)}>
      <IconButtonExample labels={icon}/>
    </LivePreviewCard>
  </div>
}
