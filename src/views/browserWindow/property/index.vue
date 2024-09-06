<template>
  <div>
    <a-card  title="可初始化设置参数">
      <a-button class="m-1" >
        窗口背景色
        <span class="font-bold text-sky-600">backgroundColor：</span>
        {{ browserWindow.backgroundColor }}
      </a-button>
      <a-button class="m-1" >
        自动隐藏菜单，按下Alt显示
        <span class="font-bold text-sky-600">autoHideMenuBar：</span>
        {{ browserWindow.autoHideMenuBar }}
      </a-button>
      <a-button class="m-1" >
        窗口焦点
        <span class="font-bold text-sky-600">focusable：</span>
        {{ browserWindow.focusable }}
      </a-button>
      <a-button class="m-1" >
        窗口在所有工作区中可见，仅适用于macOS、Linux，
        <span class="font-bold text-sky-600">visibleOnAllWorkspaces：</span>
        {{ browserWindow.visibleOnAllWorkspaces }}
      </a-button>
      <a-tooltip placement="top" :title="`点击${ browserWindow.kiosk ? '关闭kiosk模式' : '开启kiosk模式'}`">
        <a-button class="m-1"  @click="handleClick('setKiosk', !browserWindow.kiosk)">
          kiosk模式
          <span class="font-bold text-sky-600">kiosk：</span>
          {{ browserWindow.kiosk }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.minimizable ? '不允许' : '允许'}`">
        <a-button class="m-1"  @click="handleClick('setMinimizable', !browserWindow.minimizable)">
          窗口是否可被手动最小化
          <span class="font-bold text-sky-600">minimizable：</span>
          {{ browserWindow.minimizable }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.maximizable ? '不允许' : '允许'}`">
        <a-button class="m-1"  @click="handleClick('setMaximizable', !browserWindow.maximizable)">
          窗口是否可被手动最大化
          <span class="font-bold text-sky-600">maximizable：</span>
          {{ browserWindow.maximizable }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.closable ? '不允许' : '允许'}`">
        <a-button class="m-1"  @click="handleClick('setClosable', !browserWindow.closable)">
          窗口是否可被手动关闭
          <span class="font-bold text-sky-600">closable：</span>
          {{ browserWindow.closable }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.resizable ? '不允许' : '允许'}`">
        <a-button class="m-1"  @click="handleClick('setResizable', !browserWindow.resizable)">
          窗口是否可被手动调整大小
          <span class="font-bold text-sky-600">resizable：</span>
          {{ browserWindow.resizable }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.movable ? '不允许' : '允许'}`">
        <a-button class="m-1"  @click="handleClick('setMovable', !browserWindow.movable)">
          窗口是否可被手动移动
          <span class="font-bold text-sky-600">movable：</span>
          {{ browserWindow.movable }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" title="设置最大化/缩放窗口按钮是切换全屏模式还是最大化窗口，（没玩明白）">
        <a-button class="m-1"  @click="handleClick('setMaximizable', !browserWindow.maximizable)">
          窗口是否可被手动最大化
          <span class="font-bold text-sky-600">fullScreenable：</span>
          {{ browserWindow.fullScreenable }}
        </a-button>
      </a-tooltip>
    </a-card>



    <a-card class="mt-3"  title="实例设置">
      <a-tooltip placement="top" title="点击设置：我的第一个窗口">
        <a-button class="m-1" type="primary"  @click="handleClick('setTitle', '我的第一个窗口')">
          窗口标题 <span class="font-bold">title</span>
        </a-button>
      </a-tooltip>
      <a-button class="m-1" type="primary"  @click="handleGetContent('getTitle')">
        获取窗口标题
      </a-button>
      <a-tooltip placement="top" title="点击设置（看不出是啥效果！！！）">
        <a-button class="m-1" type="primary"  @click="handleClick('setShadow', !browserWindow.shadow)">
          是否显示阴影 <span class="font-bold">shadow</span>: {{ browserWindow.shadow  }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.menuBarVisible ? '隐藏' : '显示'}`">
        <a-button class="m-1" type="primary"  @click="handleClick('setMenuBarVisible', !browserWindow.menuBarVisible)">
          显示/隐藏菜单栏 <span class="font-bold">menuBarVisible</span>: {{ browserWindow.menuBarVisible  }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.fullScreen ? '关闭全屏' : '打开全屏'}`">
        <a-button class="m-1" type="primary"  @click="handleClick('setFullScreen', !browserWindow.fullScreen)">
          是否全屏 <span class="font-bold">fullScreen</span>: {{ browserWindow.fullScreen  }}
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" :title="`点击${ browserWindow.simpleFullScreen ? '关闭全屏' : '打开全屏'}`">
        <a-button class="m-1" type="primary"  @click="handleClick('setSimpleFullScreen', !browserWindow.simpleFullScreen)">
          是否全屏 <span class="font-bold">simpleFullScreen</span>: {{ browserWindow.simpleFullScreen  }}
        </a-button>
      </a-tooltip>



      <a-tooltip placement="top" title="只适用于macOS，指明窗口文档是否已被编辑, 当设置为 true 时，标题栏的图标将变灰">
        <a-button class="m-1" type="primary" >
          <span class="font-bold">documentEdited</span>
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" title="只适用于macOS，用于确定窗口代表的文件的路径名，文件的图标将显示在窗口的标题栏中">
        <a-button class="m-1" type="primary" >
          <span class="font-bold">representedFilename</span>
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" title="只适用于macOS，决定窗口是否从应用程序的 Windows 菜单排除。 默认值为 false">
        <a-button class="m-1" type="primary" >
          <span class="font-bold">excludedFromShownWindowsMenu</span>
        </a-button>
      </a-tooltip>
      <a-tooltip placement="top" title="定义一个仅为如屏幕阅读器等辅助工具提供的替代标题 。 此字符串不直接对用户可见。">
        <a-button class="m-1" type="primary" >
          <span class="font-bold">accessibleTitle</span>
        </a-button>
      </a-tooltip>
    </a-card>
  </div>
</template>

<script setup>
  import {message} from "ant-design-vue";
  import {ref} from "vue";
  const browserWindow = ref({});
  window.browserWindowAPI.getContext((ctx) => {
    console.log('=======================')
    browserWindow.value = ctx;
    console.log(ctx)
  });
  async function handleClick(eventName, value){
    const result = await window.browserWindowAPI[eventName](value);
    if(typeof result === 'object') {
        console.log(result)
        browserWindow.value[result.key] = result.value;
    }
  }
  async function handleGetContent(eventName){
    const content = await window.browserWindowAPI[eventName]();
    message.info(content)
  }
</script>

<style lang="scss" scoped>

</style>
