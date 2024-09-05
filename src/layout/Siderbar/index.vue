<template>
  <a-layout>
    <a-layout-sider :width="200" style="background: #fff">
      <div style="height: calc(100vh - 64px)">a-layout-sider</div>
    </a-layout-sider>
    <Content />
  </a-layout>
</template>

<script setup>
import Content from "@/layout/Content/index.vue";
</script>

<style lang="scss" scoped>

</style>
