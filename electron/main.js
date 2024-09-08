import { app, BrowserWindow } from 'electron'
import { join, dirname } from "node:path";
import { fileURLToPath } from 'url'
import isDev from "electron-is-dev";
import { windowOption } from "./config/browerWindowOption.js";
import { initBrowserWindowEvent, initWebContentEvent } from "./utils/browserWindow.js";

app.commandLine.appendSwitch('ignore-certificate-errors');
const _fileURLToPath = fileURLToPath(import.meta.url);
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    ...windowOption,
    webPreferences: {
      preload: join(dirname(_fileURLToPath), '/preload/index.mjs'),
      // 禁用网页安全性（仅开发环境）
      webSecurity: !isDev,
      // contextIsolation: false, // 关闭上下文隔离
      // nodeIntegration: true,
      sandbox: false,
    }
  })
  mainWindow.maximize(true)
  // 添加监听窗口操作时间
  initBrowserWindowEvent(mainWindow);
  initWebContentEvent(mainWindow.webContents);
  setTimeout(() => {
    mainWindow.webContents.send('on-init-browser', {
      autoHideMenuBar: mainWindow.autoHideMenuBar,
      focusable: mainWindow.focusable,
      visibleOnAllWorkspaces: mainWindow.visibleOnAllWorkspaces,
      shadow: mainWindow.shadow,
      menuBarVisible: mainWindow.menuBarVisible,
      kiosk: mainWindow.kiosk,
      documentEdited: mainWindow.documentEdited,
      representedFilename: mainWindow.representedFilename,
      title: mainWindow.title,
      minimizable: mainWindow.minimizable,
      maximizable: mainWindow.maximizable,
      fullScreenable: mainWindow.fullScreenable,
      resizable: mainWindow.resizable,
      closable: mainWindow.closable,
      movable: mainWindow.movable,
      excludedFromShownWindowsMenu: mainWindow.excludedFromShownWindowsMenu,
      accessibleTitle: mainWindow.accessibleTitle,
      titleBarStyle: mainWindow.titleBarStyle,
      titleBarOverlay: mainWindow.titleBarOverlay,
      simpleFullScreen: mainWindow.simpleFullScreen,
      fullScreen: mainWindow.fullScreen,
    })
  }, 3000)
  // show为false是，ready-to-show事件后显示窗口
  mainWindow.once('ready-to-show', () => {
    console.log('ready-to-show')
    mainWindow.show()
  })

  // 加载 index.html
  if(isDev){
    // 开发环境
    mainWindow.loadURL('http://localhost:8888/')
    // mainWindow.webContents.loadURL('https://www.electronjs.org/zh/')
    // 打开开发工具
    mainWindow.webContents.openDevTools()
  } else {
    // 生成环境
  }
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
