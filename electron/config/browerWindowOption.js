
export const windowOption = {
  width: 800, // 初始窗口宽度
  height: 600, // 初始窗口高度
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