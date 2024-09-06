# electron + vue3.4 + vite
electron 嵌套vue项项目。electron常用功能实践
## 项目构建步骤
1. 使用vite构建vue项目
```
    yarn create vite . --template vue
```
2. 项目根目录创建electron目录，并下载electron依赖
```
    yarn add electron -D
```
> electron依赖添加到开发依赖上，打包后的应用本身会包含 Electron 的二进制文件，因此不需要将 Electron 作为生产环境依赖。
3. 在electron目录中创建main.js、preload.js文件 [具体内容查看官网](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start#%E5%9B%9E%E9%A1%BE)
4. 下载electron-is-dev插件，判断是在开发环境还是生产环境。开发环境引入本地服务的html，生成环境引入打包后的html
```javascript
// electron/main.js
const isDev = require('electron-is-dev')
const createWindow = () => {
  //....
  if(isDev){
    // 开发环境
    mainWindow.loadURL('http://loaclhost:8888')
  } else {
    // 生成环境
    mainWindow.loadFile('打包后的文件路径')
  }
}
```
5. package.json添加执行命令
```json
{
  "main": "/electron/main.js",
  "script": {
    "serve": "electron .",
    "dev": "vite"
  }
}
```
> <strong>注意三点：</stron> <br/>
> 第一： <br/>
> electron程序使用了CommonJs规范，引入模块使用require, 程序启动时会报require未定义，将ES Modules规范，使用import <br/>
> 第二： <br/>
> __dirname未定义，解决方法如下<br/>
> import { join, dirname } from "node:path"; <br/>
> import { fileURLToPath } from 'url' <br/>
> const _fileURLToPath = fileURLToPath(import.meta.url); <br/>
> const __dirname = dirname(_fileURLToPath); <br/>
> 第二： <br/>
> electrong 启动成功，但页面无法加载：*"Request Autofill.enable failed. {"code":-32601,"message":"'Autofill.enable' wasn't found"}* <br />
> 使用webSecurity 禁用网页安全性（仅开发环境）
> ```javascript
> const mainWindow = new BrowserWindow({
>   webPreferences: {
>      webSecurity: false,
>    }
> })
>```
```npm
    yarn dev
    yarn serve
```
6. 项目启动成功

## 页面与Electron之间通信
在 Electron 中，进程使用 ipcMain 和 ipcRenderer 模块，通过开发人员定义的“通道”传递消息来进行通信，通过contextBridge来建立两者的通信。
1. 在预加载文件中添暴露给页面使用的API方法，将这些方法集合挂载到window下。
2. ipcMain主程序中监听页面方法执行。
> 注意：<br/>
> 随着系统的完善，页面与Electron的通信也会越来越多，将这些暴露给页面调用的方法进行拆分，分别创建穿件不容的文件，然后再引入到预加载文件。<br/>
> 由于模块加载方式是ES Module。Electron 中的 ES 模块（ESM）在 electron@28.0.0 版本起支持，预加载脚本也可使用 import 方式加载，也有一些局限性。<br/>
> 预加载文件及引入的相关文件后缀都要是 .mjs 。<br/>
> 在实际操作中，还需要对渲染进程禁止沙盒化 sandbox: false 配置。<br/>
### 单向通信：页面 -> Electron,使用send、on
```javascript
// browserWindow.mjs
import { contextBridge, ipcRenderer } from 'electron/renderer'
contextBridge.exposeInMainWorld('browserWindowAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
})
```
```javascript
// preload.mjs
import './browserWindow.mjs'
```

```javascript
// main.js
import { ipcMain } from 'electron'
const mainWindow = new BrowserWindow({
    preload: join(dirname(_fileURLToPath), '/preload/index.mjs'),
    webPreferences: {
        sandbox: false,
    }
})
ipcMain.on('set-title', (event, title) => {
    mainWindow.setTitle(title)
})
```
```javascript
// rendern.js，页面引入的js文件
function setTitle(){
    window.browserWindowAPI.getTitle()
}
```

### 双向通信。使用invoke、handle
```javascript
// browserWindow.mjs
import { contextBridge, ipcRenderer } from 'electron/renderer'
contextBridge.exposeInMainWorld('browserWindowAPI', {
    getTitle: (title) => ipcRenderer.invoke('get-title'),
})
```
```javascript
// preload.mjs
import './browserWindow.mjs'
```

```javascript
// main.js
import { ipcMain } from 'electron'
const mainWindow = new BrowserWindow({
    preload: join(dirname(_fileURLToPath), '/preload/index.mjs'),
    webPreferences: {
        sandbox: false,
    }
})
ipcMain.handle('get-title', (event) => {
    return mainWindow.title
})
```
```javascript
// rendern.js，页面引入的js文件 
async function setTitle(){
    const title = await window.browserWindowAPI.getTitle(); // 返回的是一个Promise
    console.log(title)
}
```

