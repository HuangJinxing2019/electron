<template>
  <a-card title="静态方法" size="small">
    <a-tooltip placement="top" title="不能返回窗口实例给页面，这里获取了窗口id和title数组">
      <a-button class="m-1" @click="handleClick('getAllWindows')">获取所有打开的窗口 getAllWindows</a-button>
    </a-tooltip>
    <a-tooltip placement="top" title="不能返回窗口实例给页面，这里获取了窗口id和title">
      <a-button class="m-1" @click="handleClick('getFocusedWindow')">此应用程序中当前获得焦点的窗口 getFocusedWindow</a-button>
    </a-tooltip>
    <a-button class="m-1">fromWebContents 传入webContents，返回拥有一样的webContents的窗口，否则返回null</a-button>
    <a-tooltip placement="top" title="点击获取id为 1 的窗口">
      <a-button class="m-1" @click="handleClick('fromId', 1)">fromId 传入id，返回指定窗口</a-button>
    </a-tooltip>
  </a-card>
  <a-card title="实例方法" size="small">
    <template v-for="(item, index) of instanceMethods" :key="index">
      <a-tooltip placement="top" v-if="item.info">
        <template #title>
          <div>
            <span>{{ item.info }}</span>
            <a class="underline" v-if="item.linkUrl" target="_blank" :href="item.linkUrl">{{item.linkName}}</a>
            <div v-if="item.img">
              <img :src="item.img">
            </div>
          </div>
        </template>
        <a-button
            class="m-1"
            type="primary"
            @click="handleClick2('instanceMethod', item.name, item.value)">
          {{item.desc}}：<span class="font-bold">{{item.name}}</span>
        </a-button>
      </a-tooltip>
      <a-button
          v-else
          class="m-1"
          type="primary"
          @click="handleClick2('instanceMethod', item.name, item.value)">
        {{item.desc}}：<span class="font-bold">{{item.name}}</span>
      </a-button>
    </template>

  </a-card>
</template>
<script setup>
import {message, Modal} from "ant-design-vue";
import {h, ref} from "vue";

const enabled = ref(false);
  const instanceMethods = [
    { name: 'destroy', desc: '强制关闭窗口', value: null, info: '' },
    { name: 'close', desc: '尝试关闭窗口', value: null, info: '该方法与用户手动单击窗口的关闭按钮效果相同。 但网页可能会取消这个关闭操作' },
    { name: 'focus', desc: '聚焦于窗口', value: null, info: null },
    { name: 'blur', desc: '取消窗口的聚焦', value: null, info: null },
    { name: 'isFocused', desc: '判断窗口是否聚焦', value: null, info: null },
    { name: 'isDestroyed', desc: '判断窗口是否被销毁', value: null, info: null },
    { name: 'show', desc: '显示并聚焦于窗口', value: null, info: null },
    { name: 'showInactive', desc: '显示但不聚焦于窗口', value: null, info: null },
    { name: 'hide', desc: '隐藏窗口', value: null, info: null },
    { name: 'isVisible', desc: '窗口是否在应用前台对用户可见', value: null, info: null },
    { name: 'isModal', desc: '判断是否为模态窗口', value: null, info: null },
    { name: 'maximize', desc: '最大化窗口', value: null, info: '如果窗口尚未显示，该方法也会将其显示 (但不会聚焦)' },
    { name: 'unmaximize', desc: '取消窗口最大化', value: null, info: null },
    { name: 'isMaximized', desc: '判断窗口是否最大化', value: null, info: null },
    { name: 'minimize', desc: '最小化窗口', value: null, info: '在某些平台上, 最小化的窗口将显示在Dock中。' },
    { name: 'isMinimized', desc: '判断窗口是否最小化', value: null, info: null },
    { name: 'restore', desc: '窗口恢复到以前的状态', value: null, info: null },
    { name: 'setFullScreen', desc: '进入窗口是全屏', value: true, info: 'setFullScreen(true)' },
    { name: 'setFullScreen', desc: '离开窗口是全屏', value: false, info: 'setFullScreen(false)' },
    { name: 'setSimpleFullScreen', desc: '进入简单的全屏模式', value: true, info: 'setSimpleFullScreen(true)，macOS版，简单全屏模式模拟了 Lion (10.7) 之前的macOS版本中的原生全屏行为。' },
    { name: 'setSimpleFullScreen', desc: '离开简单的全屏模式', value: false, info: 'setSimpleFullScreen(false)，macOS版' },
    { name: 'isNormal', desc: '否处于正常状态', value: null, info: '窗口是否处于正常状态（未最大化，未最小化，不在全屏模式下）' },
    { name: 'setAspectRatio', desc: '内容视图保持的宽高比', value: 1.2, info: 'setAspectRatio(1.2), 可传第二个参数extraSize Size (可选) macOS - 保持宽高比时不包括的额外大小。' },
    { name: 'setBackgroundColor', desc: '内容视图保持的宽高比', value: '#0000FF', info: 'setBackgroundColor(#0000FF)；格式为 Hex，RGB，RGBA，HSL，HSLA 或 CSS 命名颜色。 对于 Hex 类型，透明通道为可选的' },
    { name: 'previewFile', desc: '预览的文件', value: '', info: 'previewFile(path[, displayName])，macOS版，path string -要用 QuickLook 预览的文件的绝对路径，displayName string (可选) - 在Quick Look 模态视图中显示的文件的名称' },
    { name: 'closeFilePreview', desc: '关闭当前打开的 Quick Look 面板', value: null, info: null },
    { name: 'setBounds', desc: '重置窗口大小、位置', value: { x: 0, y: 0, width: 600, height: 400 }, info: 'setBounds({ x: 0, y: 0, width: 600, height: 400 })；重置窗口，并且移动窗口到指定的位置. 任何未提供的属性将默认为其当前值。第二个参数animate boolean (可选) macOS' },
    { name: 'getBounds', desc: '获取窗口大小、位置', value: null, info: null },
    { name: 'getBackgroundColor', desc: '获取窗口的背景色', value: null, info: null },
    { name: 'setContentBounds', desc: '调整窗口的工作区', value: { x: 50, y: 50, width: 600, height: 400 }, info: '与setBounds类似' },
    { name: 'getContentBounds', desc: '获取窗口的工作区', value: null, info: null },
    { name: 'setEnabled', desc: '禁用或者启用窗口', value: false, info: '点击禁用，3s后再自动执行此方法解禁' },
    { name: 'isEnabled', desc: '窗口是否启用', value: '', info: '' },
    { name: 'setSize', desc: '调整窗口的宽高', value:  [700, 580], info: 'win.setSize(width, height[, animate])，animate boolean (可选) macOS，如果 width 或 height 低于任何设定的最小尺寸约束，窗口将对齐到约束的最小尺寸。' },
    { name: 'getSize', desc: '获取窗口的宽高', value: null, info: '包含窗口的宽度和高度。' },
    { name: 'setContentSize', desc: '工作区 (如网页) 的大小', value: [780, 630], info: 'win.setSize(width, height[, animate])，animate boolean (可选) macOS。' },
    { name: 'getContentSize', desc: '获取工作区的大小', value: null, info: null },
    { name: 'setMinimumSize', desc: '设置窗口最小化的大小', value: [500, 300], info: 'win.setMinimumSize(width, height)' },
    { name: 'getMinimumSize', desc: '获取窗口最小化的大小', value: null, info: null },
    { name: 'setMaximumSize', desc: '设置窗口最大化的大小', value: [1000, 800], info: 'win.setMaximumSize(width, height)' },
    { name: 'getMaximumSize', desc: '设置窗口最大化的大小', value: null, info: null },
    { name: 'setResizable', desc: '手动调整窗口大小', value: false, info: '点击禁止，3s后再自动执行此方法解禁' },
    { name: 'isResizable', desc: '是否可以手动调整窗口大小', value: null, info: null },
    { name: 'setMovable', desc: '是否可以移动窗口', value: false, info: '点击禁止，3s后再自动执行此方法解禁，在Linux上不起作用' },
    { name: 'isMovable', desc: '窗口是否可以拖动', value: null, info: '在 Linux 上总是返回 true' },
    { name: 'setMinimizable', desc: '是否可以手动将窗口最小化', value: false, info: '点击禁止，3s后再自动执行此方法解禁' },
    { name: 'isMinimizable', desc: '是否可以手动最小化窗口', value: null, info: '在 Linux 上总是返回 true' },
    { name: 'setFullScreenable', desc: '设置全屏/关闭全屏？？？', value: true, info: '点击设置全屏，3s后再自动执行此方法恢复，设置最大化/缩放窗口按钮是切换全屏模式还是最大化窗口' },
    { name: 'isFullScreenable', desc: '是否全屏？？？', value: null, info: '缩放窗口按钮是切换全屏模式还是最大化窗口' },
    { name: 'setClosable', desc: '是否可以手动关闭窗口', value: false, info: '点击禁止，3s后再自动执行此方法解禁，在Linux上不起作用' },
    { name: 'isClosable', desc: '窗口是否被关闭了', value: null, info: null },
    { name: 'setAlwaysOnTop', desc: '窗口置顶', value: true, info: 'win.setAlwaysOnTop(flag[, level][, relativeLevel])，relativeLevel Integer (可选) macOS；设置窗口是否应始终显示在其他窗口的前面。 设置后，窗口仍然是一个正常窗口，而不是一个无法获取焦点的工具框窗口' },
    { name: 'isAlwaysOnTop', desc: '窗口是否置顶', value: null, info: null },
    { name: 'moveAbove', desc: '将窗口按z轴顺序移动到源窗口前面', value: 'window:1324:0', info: '将窗口按z轴顺序移动到源窗口前面。 如果 mediaSourceId 不是window类型，或者如果窗口不存在，则此方法会抛出一个错误。' },
    { name: 'getMediaSourceId', desc: '', value: 'window:1324:0', info: 'DesktopCapturerSource的id格式的窗口 id 。 例如 "window:1324:0"。更确切地说，格式是 window:id:other_id。在Windows上 id 是 HWND 类型；在macOS上是 CGWindowID (uint64_t)；在Linux上是 Window (unsigned long)。 other_id 用于识别同一顶层窗口内的Web 内容 (选项卡)。' },
    { name: 'moveTop', desc: '窗口移至顶端', value: null, info: '无论焦点如何, 将窗口移至顶端(z轴上的顺序).' },
    { name: 'center', desc: '将窗口移动到屏幕中央', value: null, info: null },
    { name: 'setPosition', desc: '设置窗口位置', value: [200, 200], info: 'win.setPosition(x, y[, animate]) animate boolean (可选) macOS，将窗口移动到 x 和 y。' },
    { name: 'getPosition', desc: '获取窗口位置', value: null, info: null },
    { name: 'setTitle', desc: '设置窗口标题', value: '这是我的第一个窗口', info: '点击设置：这是我的第一个窗口' },
    { name: 'getTitle', desc: '获取窗口标题', value: null, info: '注意： 网页的标题可以与原生窗口的标题不同。' },
    { name: 'flashFrame', desc: '设置窗口闪烁', value: true, info: '点击开启，3s后再自动执行此方法关闭。启动或停止闪烁窗口, 以吸引用户的注意。' },
    { name: 'setSkipTaskbar', desc: '设置窗口不在任务栏中显示', value: true, info: '点击取消，3s后再自动执行此方法恢复' },
    { name: 'setKiosk', desc: '进入或离开kiosk模式', value: true, info: '点击进入，3s后再自动执行此方法恢复' },
    { name: 'isKiosk', desc: '是否处于kiosk模式', value: null, info: null },
    { name: 'getNativeWindowHandle', desc: '窗口的平台特定句柄', value: null, info: 'Windows上句柄类型为 HWND，macOS 上为 NSView*，Linux 上为Window (unsigned long)' },
    { name: 'focusOnWebView', desc: '聚焦Web视图', value: null, info: null },
    { name: 'blurWebView', desc: '失焦Web视图', value: null, info: null },
    { name: 'capturePage', desc: '截图', value: null, info: 'win.capturePage([rect, opts]), rect 截图区域{x, y, w, h}, opts {stayHidden: false, stayAwake : false} stayHidden页面保持隐藏，stayAwake：使系统保持唤醒' },
    { name: 'loadURL', desc: '窗口页面资源', value: 'https://www.baidu.com', info: 'win.loadURL(url[, options]) options请查看', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winloadurlurl-options', linkName: '官方文档' },
    { name: 'loadFile', desc: '加载文件', value: null, info: 'win.loadFile(url[, options]) options 请查看', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winloadfilefilepath-options', linkName: '官方文档' },
    { name: 'reload', desc: '刷新窗口', value: null, info: null },
    { name: 'setMenu', desc: '设置窗口菜单栏', value: null, info: 'win.setMenu(menu)', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/menu', linkName: 'Menu' },
    { name: 'removeMenu', desc: '删除窗口的菜单栏', value: null, info: null },
    { name: 'setProgressBar', desc: '设置进度条的进度值', value: 80, info: '具体用法请查看',linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetprogressbarprogress-options', linkName: '官方文档' },
    { name: 'setOverlayIcon', desc: '设置应用图标', value: ['electron/assets/images/logo.png', '哈哈哈'], info: 'setOverlayIcon(nativeImage, 提供给屏幕阅读器的描述文字)' },
    { name: 'setHasShadow', desc: '设置窗口是否有阴影', value: true, info: '点击设置，3s后再自动执行此方法恢复，看不出啥效果' },
    { name: 'hasShadow', desc: '窗口是否有阴影', value: null, info: null },
    { name: 'setOpacity', desc: '设置透明度', value: 0.6, info: null },
    { name: 'setOpacity', desc: '恢复1', value: 1, info: null },
    { name: 'setShape', desc: '实验性', value: [{ x: 30, y: 30, width: 200, height: 100, }], info: 'setShape([{ x: 30, y: 30, width: 200, height: 100, }]) 点击设置，3s后再自动执行此方法恢复(参数空)，对窗口形状的设置决定了窗口内系统允许绘制与用户交互的区域. 在给定的区域外, 没有像素会被绘制, 且没有鼠标事件会被登记. 在该区域外的鼠标事件将不会被该窗口接收, 而是落至该窗口后方的任意窗口.' },
    { name: 'setIcon', desc: '设置窗口图标', value: 'electron/assets/images/logo.png', info: null },
    { name: 'setAutoHideMenuBar', desc: '自定隐藏菜单栏', value: false, info: '点击隐藏，3s后再自动执行此方法恢复。 如果菜单栏自动隐藏，用户仍然可以通过单击 Alt 键来唤出菜单栏' },
    { name: 'isMenuBarVisible', desc: '菜单栏是否可见', value: true, info: null, },
    { name: 'setIgnoreMouseEvents', desc: '忽略窗口内的所有鼠标事件', value: true, info: 'win.setIgnoreMouseEvents(ignore[, options]), 点击设置，3s后再自动执行此方法恢复' },
    { name: 'setContentProtection', desc: '防止窗口内容被其他应用捕获', value: true, info: '点击设置，3s后再自动执行此方法恢复' },
    { name: 'setFocusable', desc: '设置窗口是否可聚焦', value: false, info: '点击设置，3s后再自动执行此方法恢复' },
    { name: 'getParentWindow', desc: '获取父窗口', value: null, info: null },
    { name: 'getChildWindows', desc: '获取子窗口', value: null, info: null },
    { name: 'setAutoHideCursor', desc: '输入时隐藏光标', value: true, info: null },
    { name: 'setAutoHideCursor', desc: '输入时显示光标', value: false, info: null },
    { name: 'isTabletMode', desc: 'Windows版', value: null, info: '当前窗口是否处在 Windows 10 平板模式，因为 Windows 10 用户可以 将他们的 PC 作为平板电脑来使用，在此模式下，应用可以选择为平板电脑的界面做出优化，如扩展标题栏和隐藏标题栏按钮。' },
    { name: 'hookWindowMessage', desc: 'Windows版', value: 11, info: 'hookWindowMessage(message, callback) message Integer，钩住窗口消息。 当消息到达 WndProc 时调用callback' },
    { name: 'isWindowMessageHooked', desc: 'Windows版,', value: 11, info: 'isWindowMessageHooked(message) message Integer，是否钩挂了消息' },
    { name: 'unhookWindowMessage', desc: 'Windows版', value: 11, info: 'unhookWindowMessage(message) message Integer 取消窗口信息的钩子' },
    { name: 'unhookAllWindowMessages', desc: 'Windows版', value: null, info: '取消所有窗口信息的钩子' },
    { name: 'setThumbarButtons', desc: 'Windows版，任务栏窗口显示按钮。', value: null, info: '将指定的一组按钮添加到菜单栏的缩图工具栏上。不要超过7个，一旦设置了缩略图工具栏，则无法删除。 但你可以通过调用 API 传递一个空数组来清除按钮.', img: '/public/images/img1.png', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetthumbarbuttonsbuttons-windows',linkName: '查看参数类型' },
    { name: 'setThumbnailClip', desc: 'Windows版，鼠标指向任务栏窗口的内容区域', value: { x: 30, y: 30, width: 200, height: 100, }, info: 'setThumbnailClip({ x: 30, y: 30, width: 200, height: 100, })' },
    { name: 'setThumbnailToolTip', desc: 'Windows版，鼠标指向任务栏提示', value: '哈哈哈哈', info: '设置在任务栏中悬停在窗口缩略图上时显示的工具提示。' },
    { name: 'setAppDetails', desc: 'Windows版，设置窗口任务栏按钮的属性', value: null, info: '没搞明白是哪个地方。', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetappdetailsoptions-windows', linkName: '官方文档' },
    { name: 'setBackgroundMaterial', desc: 'Windows版，设置窗口背景材料', value: null, info: 'setBackgroundMaterial(material)。', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetbackgroundmaterialmaterial-windows', linkName: '官方文档' },
    { name: 'setTitleBarOverlay', desc: 'Windows、Linux版', value: null, info: '和自定义窗口的属性titleBarOverlay一样'},
    { name: 'setHiddenInMissionControl', desc: 'macOS版', value: null, info: '设置当用户切换到任务控制时窗口是否隐藏' },
    { name: 'isHiddenInMissionControl', desc: 'macOS版', value: null, info: '当用户切换到任务控制时，窗口是否将被隐藏。' },
    { name: 'setSheetOffset', desc: 'macOS版', value: null, info: 'setSheetOffset(offsetY[, offsetX])，改变macOS上sheet组件的附着点。 默认情况下，sheet贴在窗口边框正下方，但你可能需要在 HTML 渲染工具栏下方显示它们。' },
    { name: 'setRepresentedFilename', desc: 'macOS版', value: null, info: '设置窗口所代表的文件的路径名，并且将这个文件的图标放在窗口标题栏上。' },
    { name: 'getRepresentedFilename', desc: 'macOS版', value: null, info: '获取窗口当前文件路径.' },
    { name: 'setDocumentEdited', desc: 'macOS版', value: false, info: '明确指出窗口文档是否可以编辑, 如果设置为true则将标题栏的图标变成灰色. 点击设置，3s后再自动执行此方法恢复' },
    { name: 'isDocumentEdited', desc: 'macOS版', value: null, info: '判断当前窗口文档是否可编辑' },
    { name: 'invalidateShadow', desc: 'macOS版', value: null, info: '使窗口阴影无效，以便根据当前窗口形状重新计算它。' },
    { name: 'showDefinitionForSelection', desc: 'macOS版', value: null, info: null },
    { name: 'setWindowButtonVisibility', desc: 'macOS版，是否显示红绿灯', value: false, info: '点击隐藏，3s后再自动执行此方法恢复', },
    { name: 'selectPreviousTab', desc: 'macOS版，切换上一个', value: false, info: '当启用本地选项卡，并且窗口中有另一个标签时，选择上一个选项卡。' },
    { name: 'selectNextTab', desc: 'macOS版，切换下一个', value: false, info: '当启用本地选项卡，并且窗口中有另一个标签时，选择下一个选项卡。' },
    { name: 'showAllTabs', desc: 'macOS版，显示/隐藏所有选项卡', value: false, info: '当启用本地选项卡，并且窗口中有另一个标签时，选择下一个选项卡。' },
    { name: 'mergeAllWindows', desc: 'macOS版，合并选项卡', value: false, info: '当启用本地选项卡并且存在多个打开窗口时，将所有窗口合并到一个带有多个选项卡的窗口中' },
    { name: 'moveTabToNewWindow', desc: 'macOS版，将当前选项卡移到新窗口中', value: false, info: '如果启用了本机选项卡并且当前窗口中有多个选项卡，则将当前选项卡移动到新窗口中。' },
    { name: 'toggleTabBar', desc: 'macOS版，当一个选项卡时是否可见', value: false, info: '如果启用了本机选项卡并且当前窗口中只有一个选项卡，则切换选项卡栏是否可见。' },
    { name: 'addTabbedWindow', desc: 'macOS版，添加选项卡', value: false, info: 'addTabbedWindow(browserWindow) 在该窗口中添加一个窗口作为选项卡，位于窗口实例的选项卡之后。' },
    { name: 'setVibrancy', desc: 'macOS版，添加窗口特效', value: false, info: '在浏览器窗口中添加一个动态特效。 传递 null 或空字符串将会移除窗口上的动态效果。', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetvibrancytype-macos', linkName: '官方文档' },
    { name: 'setWindowButtonPosition', desc: 'macOS版，控制按钮的位置', value: null, info: 'setWindowButtonPosition({ x: 0, y: 0})在无框窗口中设置自定义控制按钮的位置' },
    { name: 'getWindowButtonPosition', desc: 'macOS版，获取控制按钮的位置', value: null, info: '当没有自定义位置时返回 null。' },
    { name: 'setTouchBar', desc: 'macOS版，设置窗口的触摸条布局', value: null, info: 'win.setTouchBar(touchBar)，设置为 null 或undefined将清除触摸条. 此方法只在 设备有触摸条时才生效。' },
    { name: 'setVisibleOnAllWorkspaces', desc: 'macOS、Linux版', value: null, info: '设置窗口是否在所有工作空间上可见', linkUrl: 'https://www.electronjs.org/zh/docs/latest/api/browser-window#winsetvisibleonallworkspacesvisible-options-macos-linux', linkName: '官方文档' },
    { name: 'isVisibleOnAllWorkspaces', desc: 'macOS、Linux版', value: null, info: '判断窗口是否在所有工作空间上可见' },

  ]


  async function handleClick(eventName, value){
    const result = await window.browserWindowAPI[eventName](value);
    if(typeof result === 'object') {
      Modal.confirm({
        title: eventName,
        content: JSON.stringify(result.value),
      })
    }
  }
  async function handleClick2(eventName, key, value){
    try {
      const result = await window.browserWindowAPI[eventName](key, value);
      const arr = ['setEnabled', 'setResizable', 'setMovable', 'isClosable', 'setFullScreenable', 'setAlwaysOnTop', 'setSkipTaskbar' , 'setKiosk', 'setDocumentEdited', 'setHasShadow', 'setAutoHideMenuBar', 'setWindowButtonVisibility'
      ,'setIgnoreMouseEvents', 'setContentProtection', 'setFocusable']
      if(arr.includes(key)) {
        setTimeout(() => {
          console.log(eventName, key)
          if(key === 'setShape') {
            window.browserWindowAPI[eventName](key, []);
          } else {
            window.browserWindowAPI[eventName](key, !value);
          }
        }, 3000)
      }
      if(result && result.toDataURL) {
        console.log(result)
        Modal.confirm({
          title: key,
          content: h('img', { src: result.toDataURL(), style: { width: '300px' }})
        })
      } else if(result !== undefined){
        Modal.confirm({
          title: key,
          content: JSON.stringify(result),
        })
      } else {
        message.success('操作成功')
      }
    } catch (err){
      console.log(err)
      message.error('失败' + err)
    }

  }
</script>

<style scoped lang="scss">

</style>