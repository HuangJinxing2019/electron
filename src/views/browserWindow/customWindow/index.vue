<template>
  <a-card size="small">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="frame：创建有边框窗口，默认值为true">
        <v-ace-editor
            v-model:value="frame"
            lang="javascript"
            readonly
            theme="dark"
            style="height: 110px; font-size: 15px;" />
        <div class="flex mt-3">
          <img class="w-2/4" src="/public/images/frame_true.png">
          <img class="w-2/4" src="/public/images/frame_false.png">
        </div>
      </a-collapse-panel>
      <a-collapse-panel class="text-base" key="2" header="titleBarStyle：顶部栏样式；值分别是：hidden、customButtonsOnHover、hiddenInset">
        <p>hidden 与frame: false 一样无边框</p>
        <p>customButtonsOnHover 适用于macOS 标题栏样式将隐藏红绿灯，鼠标悬浮在上面才会显示</p>
        <p>hiddenInset 在masOS上自定义红绿灯的位置，需要与“trafficLightPosition”结合使用</p>
        <p>masOS显示和隐藏红绿灯还可以通过“.setWindowButtonVisibility(true/false)”方法开控制</p>
        <v-ace-editor
            v-model:value="titleBarStyle"
            lang="javascript"
            readonly
            theme="dark"
            style="height: 120px; font-size: 15px;margin-top: 15px"/>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="trafficLightPosition：红绿灯偏移量，macOS系统">
        <v-ace-editor
            v-model:value="trafficLightPosition"
            lang="javascript"
            readonly
            theme="dark"
            style="height: 130px; font-size: 15px" />
      </a-collapse-panel>
      <a-collapse-panel key="4" header="titleBarOverlay：当titleBarStyle=“hidden”时，窗口右上角会有窗口最小化、最大化、关闭窗口三个控件，与frame属性值无关">
        <v-ace-editor
            v-model:value="titleBarOverlay"
            lang="javascript"
            readonly
            theme="dark"
            style="height: 220px; font-size: 15px" />
        <div class="flex mt-3">
          <img class="w-2/4" src="/public/images/titleBarOverlay_true.png">
          <img class="w-2/4" src="/public/images/titleBarOverlay_obj.png">
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="5" header="transparent：创建一个完全透明的窗口，看不出啥效果！！！">
        <v-ace-editor
            v-model:value="transparent"
            lang="javascript"
            readonly
            theme="dark"
            style="height: 110px; font-size: 15px" />
      </a-collapse-panel>
    </a-collapse>
  </a-card>
</template>

<script setup>
  import {ref} from "vue";
  import { VAceEditor } from 'vue3-ace-editor';
  import 'ace-builds/src-noconflict/mode-json'; // Load the language definition file used below
  import 'ace-builds/src-noconflict/theme-chrome'; // Load the theme definition file used below

  const activeKey = ref(['1']);
  const frame = `const mainWindow = new BrowserWindow({
  frame: true,
  webPreferences: {
    preload: join(dirname(_fileURLToPath), '/preload.mjs'),
  }
})`

  const titleBarStyle = `const mainWindow = new BrowserWindow({
  titleBarStyle: 'hidden',
  webPreferences: {
    preload: join(dirname(_fileURLToPath), '/preload.mjs'),
  }
})`
  const trafficLightPosition = `const mainWindow = new BrowserWindow({
  titleBarStyle: 'hiddenInset',
  trafficLightPosition: { x: 10, y: 10 },
  webPreferences: {
    preload: join(dirname(_fileURLToPath), '/preload.mjs'),
  }
})`
  const titleBarOverlay = `const mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
//  titleBarOverlay: {
//    color: '#2f3241',
//    symbolColor: '#74b1be',
//    height: 60
// },
    webPreferences: {
      preload: join(dirname(_fileURLToPath), '/preload.mjs'),
    }
})`
  const transparent = `const mainWindow = new BrowserWindow({
  transparent: true,
  webPreferences: {
    preload: join(dirname(_fileURLToPath), '/preload.mjs'),
  }
})`
</script>

<style lang="scss" scoped>

</style>