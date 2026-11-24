# Tahoe 组件 API

从 `@macos-tahoe/ui` 导入。预览从 [组件总览](#/tahoe/getting-started/introduction) 进入。

| 组件 | 主要属性与行为 |
| --- | --- |
| Button、IconButton | size、variant、disabled、loading、className、children、HTML 事件。IconButton 要求 label |
| TextField、TextArea、SearchField、Select | 原生输入属性，支持 value、defaultValue、onChange、disabled。SearchField 需传可访问名称 |
| Checkbox、Switch、Radio | label 和原生 input 属性，支持 checked、defaultChecked、onChange |
| RadioGroup | label、options、value、defaultValue、onValueChange、disabled；原生同名 radio 管理键盘 |
| Slider | 原生范围属性 min、max、step、value、defaultValue、onChange |
| Stepper | label、min、max、value、variant、onChange。达到上下限禁用对应按钮 |
| SegmentedControl | label、name、options、value、onChange。方向键切换同组选项 |
| Tabs | label、items、value、defaultValue、onValueChange。Headless UI 负责方向键和焦点 |
| DropdownMenu、ContextMenu | label、actions；每项有 id、label、onSelect 及可选 disabled。右键菜单在触发器附近打开 |
| Dropdown | label、options、selected、onSelect。用勾选标明当前选择 |
| Popover | label、children。Headless UI 管理打开、外部点击与 Esc |
| Sidebar | groups、selected、collapsed、onSelect、onToggle；当前项用 aria-current 标识 |
| Toolbar | title、detail、filters、actions、search；通过插槽组织应用操作 |
| Breadcrumb | items，最后一项代表当前页 |
| Table、List | Table 使用 caption、columns、rows，List 使用原生 ul 属性 |
| Alert、Badge、Spinner、Progress | Alert 使用 title、variant、children；Badge 接受 span 属性；Spinner 使用 label；Progress 使用 label、value |
| Tooltip | text、children，键盘聚焦和鼠标悬停时展示说明 |
| Dialog、Sheet | open、onClose、title、children。Headless UI 管理焦点限制与恢复 |
| Window、TitleBar、TrafficLights、SplitView、InspectorPanel、SettingsGroup | 可组合布局。TrafficLights 为装饰。SplitView 当前为固定比例网页分栏 |

Window、Sheet、ContextMenu 与玻璃材质是 Web Approximation。
