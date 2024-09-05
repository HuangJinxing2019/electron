
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import Layout from '@/layout/index'
  function setTitle(){
    window.browserWindowAPI.setTitle('第一个桌面应用')
  }
</script>


<style lang="scss" scoped>
</style>
