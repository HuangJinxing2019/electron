
<template>
  <div>
    <button @click="setTitle">设置标题</button>
  </div>
</template>

<script setup>
  function setTitle(){
    window.browserWindowAPI.setTitle('第一个桌面应用')
  }
</script>


<style scoped>

</style>
