
<template>
  <div>
    <Layout />
<!--    <a-button type="primary" @click="setTitle">设置标题</a-button>-->
  </div>
</template>

<script setup>
  import Layout from '@/layout/index'
  function setTitle(){
    window.browserWindowAPI.setTitle('第一个桌面应用')
  }
</script>


<style scoped>

</style>
