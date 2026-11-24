import { createContext, useContext } from 'react'

export type Locale = 'en' | 'zh-CN'
export const LocaleContext = createContext<Locale>('zh-CN')

export function useLocale() {
  const locale = useContext(LocaleContext)
  return { locale, tr: (zh: string, en: string) => locale === 'en' ? en : zh }
}

export function readLocale(): Locale {
  const query = new URLSearchParams(location.search).get('lang')
  if (query === 'en' || query === 'zh-CN') return query
  try {
    if (localStorage.getItem('tahoe-language') === 'en') return 'en'
  } catch { /* storage can be unavailable */ }
  return 'zh-CN'
}

export const titlesZh: Record<string, string> = {
  'Getting Started': '快速开始', 'Foundations': '基础规范', 'Patterns': '设计模式',
  'Content': '内容', 'Layout and Organization': '布局与组织', 'Menus and Actions': '菜单与操作',
  'Navigation and Search': '导航与搜索', 'Presentation': '呈现', 'Selection and Input': '选择与输入',
  'Status': '状态', 'System Experiences': '系统体验', 'Inputs': '输入方式', 'Technologies': '实现技术',
  'Introduction': '简介', 'Installation': '安装', 'Quick Start': '快速入门',
  'Designing for macOS': '为 macOS 设计', 'Browser vs Native macOS': '浏览器与原生 macOS',
  'Accessibility': '辅助功能', 'Color': '色彩', 'Dark Mode': '深色模式', 'Typography': '排版',
  'Layout': '布局', 'Materials': '材质', 'Motion': '动效', 'Icons': '图标',
  'SF Symbols Guidance': 'SF Symbols 指南', 'Spacing': '间距', 'Control Geometry': '控件尺寸',
  'Searching': '搜索', 'Settings': '设置', 'File Management': '文件管理', 'Drag and Drop': '拖放',
  'Feedback': '反馈', 'Loading': '加载', 'Modality': '模态交互', 'Undo and Redo': '撤销与重做',
  'Keyboard Shortcuts': '键盘快捷键', 'Keyboard': '键盘', 'Pointing Devices': '指针设备',
  'Focus and Selection': '焦点与选择', 'Gestures': '手势', 'React Integration': 'React 集成',
  'Tailwind CSS Integration': 'Tailwind CSS 集成', 'Theme System': '主题系统',
  'Browser Compatibility': '浏览器兼容性', 'Accessibility Implementation': '辅助功能实现',
  'Overview': '概览', 'Anatomy': '结构', 'Live Preview': '交互预览', 'Sizes': '尺寸', 'Variants': '变体',
  'States': '状态', 'Behavior': '交互行为', 'API Reference': 'API 参考', 'Code Example': '代码示例',
  'Design Specifications': '设计规格', 'References': '参考资料',
}

export function localizeTitle(title: string, locale: Locale) {
  return locale === 'zh-CN' ? titlesZh[title] ?? title : title
}
