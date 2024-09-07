<template>
  <a-card title="窗口事件监听" size="small">
    <p class="text-base">窗口实例通过，on、once监听时间，on触发多次，once值触发一次</p>
    <p>实例事件查阅官网：https://www.electronjs.org/zh/docs/latest/api/browser-window#%E5%AE%9E%E4%BE%8B%E4%BA%8B%E4%BB%B6</p>
    <v-ace-editor
        v-model:value="content"
        lang="javascript"
        readonly
        theme="chrome"
        style="height: 160px; font-size: 15px;margin-top: 15px"/>
  </a-card>
</template>
<script setup>
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json'; // Load the language definition file used below
import 'ace-builds/src-noconflict/theme-chrome'; // Load the theme definition file used below
const content = `const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.on('事件名称', () => {
    //...
})
win.once('事件名称', () => {
    //...
})`
</script>

<style scoped lang="scss">

</style>