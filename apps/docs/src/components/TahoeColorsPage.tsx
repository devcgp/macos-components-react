import { useLocale } from '../app/locale'
import { tahoeColors } from '../app/token-data'

type ColorToken = keyof typeof tahoeColors.light
type Appearance = 'light' | 'dark'

const namesZh: Record<string, string> = {
  blue: '蓝色', brown: '棕色', cyan: '青色', green: '绿色', gray: '灰色',
  indigo: '靛蓝', mint: '薄荷绿', orange: '橙色', pink: '粉色', purple: '紫色',
  red: '红色', teal: '蓝绿色', yellow: '黄色', black: '黑色', white: '白色',
  primary: '主要', secondary: '次要', tertiary: '三级', quaternary: '四级', quinary: '五级', seximal: '六级',
  'alerts-overlay': '警告遮罩',
  'progress-bars-track-stroke': '进度条轨道描边',
  scrollbar: '滚动条',
  'sidebar-label-inactive': '侧栏非活动标签',
  'tables-alternating-row-color': '表格交替行底色',
  'tables-bg-selected-and-active': '表格活动选中底色',
  'tables-bg-selected-and-inactive': '表格非活动选中底色',
  'tables-column-separator': '表格列分隔线',
  'tooltips-inner-stroke': '提示内描边',
  'tooltips-sidebar-bg-active': '侧栏提示活动底色',
  'tooltips-sidebar-bg-inactive': '侧栏提示非活动底色',
  'window-background-figma': '窗口背景',
}
const toneOrder = ['primary', 'secondary', 'tertiary', 'quaternary', 'quinary', 'seximal', 'white']
const colorTokens = Object.keys(tahoeColors.light) as ColorToken[]

export const tahoeColorSections = [
  { key: 'accents', title: 'Accents', titleZh: '强调色' },
  { key: 'vibrant-accents', title: 'Vibrant Accents', titleZh: 'Vibrant 强调色' },
  { key: 'fills', title: 'Fills', titleZh: '填充色', order: toneOrder },
  { key: 'vibrant-fills', title: 'Vibrant Fills', titleZh: 'Vibrant 填充色', order: toneOrder },
  { key: 'text', title: 'Text', titleZh: '文本色', order: toneOrder },
  { key: 'vibrant-text', title: 'Vibrant Text', titleZh: 'Vibrant 文本色', order: toneOrder },
  { key: 'gray', title: 'Grayscale', titleZh: '灰阶' },
  { key: 'semantic', title: 'Semantic Colors', titleZh: '语义色' },
].map(({ key, title, titleZh, order }) => {
  const prefix = key === 'semantic' ? '--tahoe-miscellaneous-' : '--tahoe-' + key + '-'
  const swatches = colorTokens
    .filter(token => token.startsWith(prefix) || (key === 'semantic' && token === '--tahoe-window-background-figma'))
    .map(token => ({
      token,
      name: token === '--tahoe-window-background-figma' ? 'window-background-figma' : token.slice(prefix.length),
    }))
  if (order) swatches.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
  return { id: 'tahoe-color-' + key, title, titleZh, swatches }
})

function ColorSample({ token, appearance }: { token: ColorToken; appearance: Appearance }) {
  const { tr } = useLocale()
  return <div className="tahoe-color-sample">
    <small>{appearance === 'light' ? tr('浅色', 'Light') : tr('深色', 'Dark')}</small>
    <div className="tahoe-color-backdrop" data-appearance={appearance} aria-hidden="true">
      <span className="tahoe-color-swatch" style={{ backgroundColor: 'var(' + token + ')' }}/>
    </div>
    <code>{tahoeColors[appearance][token]}</code>
  </div>
}

function swatchName(name: string) {
  if (name === 'window-background-figma') return 'Window background'
  return name[0].toUpperCase() + name.slice(1).replaceAll('-', ' ')
}

export default function TahoeColorsPage() {
  const { tr } = useLocale()
  return <div className="tahoe-doc">
    <p>{tr(
      '每张色卡并排显示同一个 CSS 变量在浅色与深色下的值。棋盘格用于查看透明填充和文本色的实际叠加效果。',
      'Each card shows the Light and Dark values of the same CSS variable. The checkerboard shows how translucent fills and text colors composite.',
    )}</p>
    <p>{tr(
      '色卡直接渲染主题中的 CSS 变量，数值来自生成色板所用的项目 Token 数据。Vibrant 色卡展示变量本身，实际材质效果还受背景与混合方式影响。',
      'Swatches render the theme’s CSS variables. Their values come from the project tokens used to generate the palette. Vibrant swatches show the variable itself. Material effects also depend on the backdrop and blending.',
    )}</p>
    <p>
      <a href="#/tahoe/tokens">{tr('下载设计 Tokens', 'Download design tokens')}</a>
      {' · '}
      <a href="https://www.figma.com/design/0Moxn0hZAwA13h5DRFhK2h?node-id=0-765">{tr('查看 Figma 色板', 'View Figma palette')}</a>
    </p>
    {tahoeColorSections.map(group => <section key={group.id} id={group.id} className="doc-section">
      <h2>{tr(group.titleZh, group.title)}</h2>
      <ul className="tahoe-color-grid">
        {group.swatches.map(({ token, name }) => <li key={token}>
          <h3>{tr(namesZh[name] ?? swatchName(name), swatchName(name))}</h3>
          <code className="tahoe-color-token">{token}</code>
          <div className="tahoe-color-pair">
            <ColorSample token={token} appearance="light"/>
            <ColorSample token={token} appearance="dark"/>
          </div>
        </li>)}
      </ul>
    </section>)}
  </div>
}
