import type { Locale } from './locale'

const examples: Record<string, string> = {
  '已取消': 'Canceled', '取消': 'Cancel', '已保存': 'Saved', '保存': 'Save',
  '照片图库': 'Photo Library', '图库视图': 'Library view', '图库布局': 'Library layout', '图库内容': 'Library content', '图库': 'Library',
  '所有照片': 'All Photos', '收藏': 'Favorites', '同步收藏': 'Sync favorites', '文件夹': 'Folders',
  '名称': 'Name', '位置': 'Location', '本地': 'Local', '文件夹名称': 'Folder name', '文件名列表': 'File names', '照片列表': 'Photo list',
  '目录': 'Folders', '组件目录': 'Components', '显示文件名': 'Show file names', '搜索照片': 'Search photos',
  '缩略图大小': 'Thumbnail size', '缩略图宽度': 'Thumbnail width', '照片': 'Photos', '照片操作': 'Photo actions',
  '导入': 'Import', '导入进度': 'Import progress', '更新进度': 'Update progress',
  '海岸': 'Coast', '林间': 'Forest', '配色': 'Palette', '旅行照片': 'Travel photos', '设计参考': 'Design references',
  '网格': 'Grid', '网格视图': 'Grid view', '列表': 'List', '布局': 'Layout', '视图': 'View',
  '数量': 'Quantity', '全部': 'All', '格式': 'Format', '简介': 'Info',
  '文件': 'File', '尺寸': 'Size', '显示简介': 'Show info', '打开': 'Open', '已打开': 'Opened', '删除': 'Delete',
  '查看详情': 'View details', '文件信息': 'File info', '显示文件信息': 'Show file info', '文件详情': 'File details',
  '详情': 'Details', '文件操作': 'File actions', '显示侧栏': 'Show sidebar',
  '查找': 'Find', '刷新': 'Refresh', '备注': 'Notes', '输入图片备注': 'Enter a photo note', '输入文字': 'Enter text',
  '读取完成': 'Import complete', '正在读取图库': 'Reading library', '正在读取': 'Reading', '不可用': 'Unavailable',
  '保留原图': 'Keep originals', '自动扫描': 'Auto scan', '按右键或 Enter': 'Right-click or press Enter',
  '找到 3 张图片': 'Found 3 photos', '3 张照片': '3 photos', '1 张照片': '1 photo', '三张照片': 'Three photos',
  '已导入 3 张图片。': 'Imported 3 photos.', '没有符合条件的照片': 'No matching photos',
  '两座山的图形示意': 'Illustration of two mountains', '照片保持原始文件名和格式。': 'Photos retain their original file names and formats.',
}
const examplePattern = new RegExp(Object.keys(examples).sort((a, b) => b.length - a.length).join('|'), 'g')

export function localizeExample(value: string, locale: Locale) {
  return locale === 'en' ? value.replace(examplePattern, match => examples[match] ?? match) : value
}
