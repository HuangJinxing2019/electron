<template>
  <div>
    <template v-for="(item, index) of list" :key="index">
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
            @click="handleClick('instanceMethod', item.name, item.value)">
          {{item.desc}}：<span class="font-bold">{{item.name}}</span>
        </a-button>
      </a-tooltip>
      <a-button
          v-else
          class="m-1"
          type="primary"
          @click="handleClick('instanceMethod', item.name, item.value)">
        {{item.desc}}：<span class="font-bold">{{item.name}}</span>
      </a-button>
    </template>
  </div>
</template>

<script setup>
import {message, Modal} from "ant-design-vue";
import {h} from "vue";

defineProps({
    list: Object,
  })
async function handleClick(eventName, key, value){
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

<style lang="scss" scoped>

</style>