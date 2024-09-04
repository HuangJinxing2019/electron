import { app, BrowserWindow } from 'electron'
import { join, dirname } from "node:path";
import { fileURLToPath } from 'url'
import isDev from "electron-is-dev";
import { windowOption } from "./config/browerWindowOption.js";

app.commandLine.appendSwitch('ignore-certificate-errors');
const _fileURLToPath = fileURLToPath(import.meta.url);
const createWindow = () => {
  // Create the browser window.
  console.log(dirname(_fileURLToPath))
  const mainWindow = new BrowserWindow({
    ...windowOption,
    webPreferences: {
      preload: join(dirname(_fileURLToPath), '/preload/index.js'),
      // 禁用网页安全性（仅开发环境）
      webSecurity: !isDev,
    }
  })
  // 加载 index.html
  if(isDev){
    // 开发环境
    mainWindow.loadURL('http://localhost:8888/')
    // 打开开发工具
    // mainWindow.webContents.openDevTools()
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