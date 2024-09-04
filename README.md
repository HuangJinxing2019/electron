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
