<template>
  <div>
    <a-card size="small" title="可初始化设置参数">
      dfdfd
    </a-card>
    <a-card class="mt-3" size="small" title="实例设置">
      <a-tooltip placement="top" title="点击设置：我的第一个窗口">
        <a-button type="primary" size="small" @click="handleClick('setTitle', '我的第一个窗口')">窗口标题：title</a-button>
      </a-tooltip>
      <a-button class="ml-2" type="primary" size="small" @click="handleGetContent('getTitle')">获取窗口标题</a-button>
    </a-card>
  </div>
</template>

<script setup>
  import {message} from "ant-design-vue";

  function handleClick(eventName, value){
    window.browserWindowAPI[eventName](value)
  }
  async function handleGetContent(eventName){
    const content = await window.browserWindowAPI[eventName]();
    message.info(content)
  }
</script>

<style lang="scss" scoped>

</style>
