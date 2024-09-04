# electron + vue3.4 + vite
electron 嵌套vue项项目。electron常用功能实践
## 项目构建步骤
1. 使用vite构建vue项目
```
    yarn create vite . --template vue
```
2. 项目更目录创建electron目录，并下载electron依赖
```
    yarn add electron -D
```
> electron依赖添加到开发依赖上，打包后的应用本身会包含 Electron 的二进制文件，因此不需要将 Electron 作为生产环境依赖。

