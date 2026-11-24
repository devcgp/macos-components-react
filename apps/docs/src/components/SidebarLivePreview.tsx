import { useLocale } from '../app/locale'
import { translateSource } from '../app/preview-source'
import { SidebarNavigation, navigationLabels } from '../examples/sidebar/SidebarNavigation'
import { SidebarGroups, groupsLabels } from '../examples/sidebar/SidebarGroups'
import { SidebarStates, statesLabels } from '../examples/sidebar/SidebarStates'
import { SidebarInWindow, windowLabels } from '../examples/sidebar/SidebarInWindow'
import navigationSource from '../examples/sidebar/SidebarNavigation.tsx?raw'
import groupsSource from '../examples/sidebar/SidebarGroups.tsx?raw'
import statesSource from '../examples/sidebar/SidebarStates.tsx?raw'
import windowSource from '../examples/sidebar/SidebarInWindow.tsx?raw'
import LivePreviewCard from './LivePreviewCard'

export default function SidebarLivePreview() {
  const { locale, tr } = useLocale()
  const navigation = locale === 'en' ? navigationLabels : {
    title: '备忘录', navigation: '备忘录目录', favorites: '收藏', starred: '星标', all: '全部备忘录',
    folders: '文件夹', work: '工作', personal: '个人', deleted: '最近删除', current: '当前目录',
  }
  const groups = locale === 'en' ? groupsLabels : {
    navigation: '分组目录', favorites: '收藏', starred: '星标', all: '全部备忘录', folders: '文件夹', work: '工作', personal: '个人',
  }
  const states = locale === 'en' ? statesLabels : {
    navigation: '侧边栏交互状态', favorites: '收藏', starred: '星标', all: '全部备忘录', folders: '文件夹', work: '工作',
    hint: '按 Tab 移动焦点，按 Enter 或空格选择目录、展开或折叠分组。',
  }
  const window = locale === 'en' ? windowLabels : {
    title: '备忘录', show: '显示侧栏', hide: '隐藏侧栏', navigation: '窗口目录', folders: '文件夹', work: '工作', personal: '个人',
    longName: '研究资料、设计参考以及项目备忘录', current: '当前目录',
  }

  return <div className="tahoe-preview-cards">
    <LivePreviewCard title={tr('侧边栏导航', 'Sidebar Navigation')} code={translateSource(navigationSource, navigationLabels, navigation)}>
      <SidebarNavigation labels={navigation}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('侧边栏分组', 'Sidebar Groups')} code={translateSource(groupsSource, groupsLabels, groups)}>
      <SidebarGroups labels={groups}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('侧边栏状态', 'Sidebar States')} code={translateSource(statesSource, statesLabels, states)}>
      <SidebarStates labels={states}/>
    </LivePreviewCard>
    <LivePreviewCard title={tr('窗口中的侧边栏', 'Sidebar in Window')} code={translateSource(windowSource, windowLabels, window)}>
      <SidebarInWindow labels={window}/>
    </LivePreviewCard>
  </div>
}
