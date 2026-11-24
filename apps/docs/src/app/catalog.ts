export const hig = 'https://developer.apple.com/design/human-interface-guidelines/'

type ComponentEntry = { id: string; title: string; reference: string }

export const componentDocs: ComponentEntry[] = [
  { id: 'image-view', title: 'Image View', reference: 'image-views' },
  { id: 'text-view', title: 'Text View', reference: 'text-views' },
  { id: 'table', title: 'Lists and Tables', reference: 'lists-and-tables' },
  { id: 'list', title: 'List', reference: 'lists-and-tables' },
  { id: 'outline-view', title: 'Outline View', reference: 'outline-views' },
  { id: 'split-view', title: 'Split View', reference: 'split-views' },
  { id: 'tabs', title: 'Tab View', reference: 'tab-views' },
  { id: 'disclosure-control', title: 'Disclosure Control', reference: 'disclosure-controls' },
  { id: 'button', title: 'Button', reference: 'buttons' },
  { id: 'icon-button', title: 'Icon Button', reference: 'buttons' },
  { id: 'dropdown-menu', title: 'Menu', reference: 'menus' },
  { id: 'context-menu', title: 'Context Menu', reference: 'context-menus' },
  { id: 'dropdown', title: 'Pop-up Button', reference: 'pop-up-buttons' },
  { id: 'toolbar', title: 'Toolbar', reference: 'toolbars' },
  { id: 'sidebar', title: 'Sidebar', reference: 'sidebars' },
  { id: 'search-field', title: 'Search Field', reference: 'search-fields' },
  { id: 'breadcrumb', title: 'Path Control', reference: 'path-controls' },
  { id: 'alert', title: 'Alert', reference: 'alerts' },
  { id: 'popover', title: 'Popover', reference: 'popovers' },
  { id: 'sheet', title: 'Sheet', reference: 'sheets' },
  { id: 'dialog', title: 'Dialog', reference: 'modality' },
  { id: 'window', title: 'Window', reference: 'windows' },
  { id: 'title-bar', title: 'Title Bar', reference: 'windows' },
  { id: 'traffic-lights', title: 'Traffic Lights', reference: 'windows' },
  { id: 'inspector-panel', title: 'Inspector Panel', reference: 'windows' },
  { id: 'scroll-view', title: 'Scroll View', reference: 'scroll-views' },
  { id: 'checkbox', title: 'Checkbox', reference: 'toggles' },
  { id: 'switch', title: 'Switch', reference: 'toggles' },
  { id: 'radio', title: 'Radio', reference: 'radio-buttons' },
  { id: 'radio-group', title: 'Radio Button', reference: 'radio-buttons' },
  { id: 'segmented-control', title: 'Segmented Control', reference: 'segmented-controls' },
  { id: 'slider', title: 'Slider', reference: 'sliders' },
  { id: 'stepper', title: 'Stepper', reference: 'steppers' },
  { id: 'text-field', title: 'Text Field', reference: 'text-fields' },
  { id: 'text-area', title: 'Text Area', reference: 'text-fields' },
  { id: 'combo-box', title: 'Combo Box', reference: 'combo-boxes' },
  { id: 'select', title: 'Select', reference: 'pop-up-buttons' },
  { id: 'progress-indicator', title: 'Progress Indicator', reference: 'progress-indicators' },
  { id: 'spinner', title: 'Spinner', reference: 'progress-indicators' },
  { id: 'tooltip', title: 'Tooltip', reference: 'tooltips' },
  { id: 'badge', title: 'Status Feedback', reference: 'status' },
  { id: 'settings-group', title: 'Settings Group', reference: 'settings' },
]

export const topicGroups = [
  { title: 'Getting Started', folder: 'getting-started', items: ['Introduction', 'Installation', 'Quick Start', 'Designing for macOS', 'Browser vs Native macOS'] },
  { title: 'Foundations', folder: 'foundations', items: ['Accessibility', 'Color', 'Dark Mode', 'Typography', 'Layout', 'Materials', 'Liquid Glass', 'Motion', 'Icons', 'SF Symbols Guidance', 'Spacing', 'Control Geometry'] },
  { title: 'Patterns', folder: 'patterns', items: ['Searching', 'Settings', 'File Management', 'Drag and Drop', 'Feedback', 'Loading', 'Modality', 'Undo and Redo', 'Keyboard Shortcuts'] },
  { title: 'Inputs', folder: 'inputs', items: ['Keyboard', 'Pointing Devices', 'Focus and Selection', 'Gestures'] },
  { title: 'Technologies', folder: 'technologies', items: ['React Integration', 'Tailwind CSS Integration', 'Theme System', 'Browser Compatibility', 'Accessibility Implementation'] },
]

export function slug(title: string) {
  return title.toLowerCase().replaceAll(' ', '-')
}
