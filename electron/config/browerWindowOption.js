
export const windowOption = {
  width: 800, // 初始窗口宽度
  height: 600, // 初始窗口高度
  // 程序启动时先不显示窗口，通过监听ready-to-show事件，通过.show()显示窗口，可以解决长时间白屏的问题。
  /**
   * browserWindow.once('ready-to-show', () => { browserWindow.show()  })
   * 这个事件通常在 did-finish-load 事件之后发出，但是页面有许多远程资源时，它可能会在 did-finish-load之前发出事件。
   */
  show: false,
  // false 意味着渲染器会被认为是"可见的"并绘制，将不会执行'ready-to-show'事件，
  paintWhenInitiallyHidden: true,
  // 窗口底部颜色，ready-to-show事件执行太晚了，长时间不显示窗口也不友好，show设置为true，backgroundColor颜色设置接近应用程序背景色。
  // browserWindow.setBackgroundColor('hsl(230, 100%, 50%)')。支持多种参数。rgba,十六进制
  backgroundColor: '#242424',
  // 隐藏菜菜单栏（File、Edit、View、Window、Help）按下Alt键会显示， 默认值：false。menuBarVisible也可以隐藏
  autoHideMenuBar: false,

  // 窗口全屏，需要browserWindow.simpleFullScreen = true方式设置才有效，否则无效
  // simpleFullScreen: false,
  // fullScreen: false,

  // 确定窗口是否可作为焦点被选中， false无法操作窗口的菜单和窗口的最小化、最大化、窗口关闭按钮。
  // 适用于windows、macOS
  focusable : true,
  // 用于决定窗口是否在所有工作区中可见， Windows 上无法设置，始终返回 false
  // 适用于macOS、Linux
  visibleOnAllWorkspaces: true,
  // 窗口是否显示阴影,需要browserWindow.shadow = true 方式设置才有效，否则无效。这样设置了属性shadow为true/false也没啥区别。
  shadow: true,
  // 隐藏菜单栏，需要browserWindow.menuBarVisible = false方式设置才有效，否则无效, 默认值为true
  // 适用于windows、macOS
  menuBarVisible: true,
  // 用于决定窗口是否处于kiosk模式，看起来类似于全屏模式。
  kiosk: false,
  // 指明窗口文档是否已被编辑, 当设置为 true 时，标题栏的图标将变灰
  // 只适用于macOS
  documentEdited: true,
  // 用于确定窗口代表的文件的路径名，文件的图标将显示在窗口的标题栏中
  // 只适用于macOS
  representedFilename: '',
  // 设置窗口标题，需要browserWindow.title = '我的第一个应用' 方式设置才有效
  title: '我的第一个应用',
  // 决定窗口是否可被用户手动最小化。默认值true
  // 适用于macOS、Linux
  minimizable: true,
  // 决定窗口是否可被用户手动最大化。默认值true
  // 适用于macOS、Linux
  maximizable: true,
  // 决定最大化/缩放窗口按钮是切换全屏模式还是最大化窗口, 需要browserWindow.fullScreenable = true方式设置才有效, 默认值：true
  // 不知道咋玩。
  fullScreenable: true,
  // 决定窗口是否可被用户手动调整大小, 默认值：true
  resizable: true,
  // 决定窗口是否可被用户手动关闭, 默认值：true
  // 适用于windows、macOS
  closable: true,
  // 决定窗口是否可被用户移动 默认值：true
  // 适用于windows、macOS
  movable: true,
  // 决定窗口是否从应用程序的 Windows 菜单排除。 默认值为 false
  // 适用于macOS，详细设置请查看文档：https://www.electronjs.org/zh/docs/latest/api/browser-window#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7
  excludedFromShownWindowsMenu: false,
  // 定义一个仅为如屏幕阅读器等辅助工具提供的替代标题 。 此字符串不直接对用户可见。
  accessibleTitle: '',
  /**
   * 自定义窗口
   * 详细请查阅官方文档：https://www.electronjs.org/zh/docs/latest/tutorial/window-customization
   * 无边框窗口需要移动窗口需要设置body可移动，具体请看上面文档链接的最底部。
   */
  // 创建无边框窗口，默认值是：true
  frame: true,
  // hidden 与frame: false 一样无边框，
  // customButtonsOnHover 适用于macOS 标题栏样式将隐藏红绿灯，鼠标悬浮在上面才会显示
  // hiddenInset 在masOS上自定义红绿灯的位置，需要与“trafficLightPosition”结合使用
  // masOS显示和隐藏红绿灯还可以通过“.setWindowButtonVisibility(true/false)”方法开控制
  titleBarStyle: 'hiddenInset',
  // 红绿灯的偏移坐标
  trafficLightPosition: { x: 10, y: 10 },
  // 参数值可以是boolean值，或者是一个Object,当titleBarStyle=“hidden”时，窗口右上角会有窗口最小化、最大化、关闭窗口三个控件，与frame属性值无关。
  titleBarOverlay: true,
  // titleBarOverlay: {
  //   color: '#2f3241',
  //   symbolColor: '#74b1be',
  //   height: 60
  // },
  // 创建一个完全透明的窗口，看不出啥效果！！！
  // transparent: true,
}
