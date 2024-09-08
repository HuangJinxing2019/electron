<template>
  <a-layout>
    <a-layout-sider :width="200" style="background: #fff">
      <div style="height: calc(100vh - 64px)">
        <a-menu
            :openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 100%"
            mode="inline"
            :items="menuTree"
            @select="selectChange"
            @openChange="onOpenChange"
        ></a-menu>
      </div>
    </a-layout-sider>
    <Content/>
  </a-layout>
</template>

<script setup>
  import Content from "@/layout/Content/index";
  import {onMounted, ref, h} from "vue";
  import { Icon } from "@iconify/vue";
  import { useRouter, useRoute } from "vue-router";

  const router = useRouter();
  const route = useRoute();
  const menuTree = ref([])
  const openKeys = ref([])
  const selectedKeys = ref([])
  const rootSubmenuKeys = [];
  const onOpenChange = (keys) => {
    openKeys.value = [keys.pop()]
  };
  function getChildren(list){
    if (!list) return null;
    return list.map((item) => {
      return {
        key: item.path,
        label: item.title,
        path: item.path,
        icon: item.icon && h(Icon, { icon: item.icon }),
        children: getChildren(item.children)
      }
    })
  }
  function getMenu() {
    import('@/router/route.js').then(({routes}) => {
      menuTree.value = routes.map((item, index) => {
        const children = getChildren(item.children)
        return {
          key: item.path,
          label: item.title,
          path: item.path,
          icon: item.icon && h(Icon, { icon: item.icon }),
          children,
        }
      })
    })
  }

  function selectChange({ item }){
    router.push(item.path || "/")
    console.log(openKeys.value)
  }

  onMounted(() => {
    selectedKeys.value = route.path === '/' ? [""] : [route.path]
    openKeys.value = [route.meta.parentPath]
    getMenu()
  })

</script>

<style lang="scss" scoped>

</style>
