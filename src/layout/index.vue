<template>
  <a-layout class="layout">
    <a-layout-header class="layot-header">
      <Header :collapsed="collapsed" @trigger="trigger"
    /></a-layout-header>
    <a-layout>
      <a-layout-sider
        :collapsed="collapsed"
        :trigger="null"
        collapsible
        theme="light"
        class="layout-sider"
      >
        <q-scroll-area
          :thumb-style="style.thumbStyle"
          :content-style="style.contentStyle"
          :content-active-style="style.contentActiveStyle"
          style="height: 100%; padding-bottom: 50px"
          :visible="false"
        >
          <Menu />
        </q-scroll-area>
      </a-layout-sider>
      <a-layout-content>
        <TabBar />
        <div style="padding: 0px 10px">
          <RouterView>
            <template #default="{ Component, route }">
              <Transition name="fade">
                <keep-alive :include="getKeepAliveList">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </Transition>
            </template>
          </RouterView>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Menu from "./components/LayoutMenu.vue";
import Header from "./components/LayoutHeader.vue";
import TabBar from "./components/tabBar.vue";
import { RouterLink, RouterView } from "vue-router";
import useRouteStore from "@/stores/route";
import { reactive } from "vue";

const collapsed = ref(false);
const UserRouteStore = useRouteStore();
const style = reactive({
  thumbStyle: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    width: "4px",
    right: "2px",
  },
  contentStyle: {
    right: "2px",
  },
  contentActiveStyle: {
    right: "2px",
  },
});

let getKeepAliveList = computed(() => {
  return UserRouteStore.getKeepAliveList;
});
const trigger = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.ant-layout-sider {
  color: #fff;
  height: calc(100vh - 64px);
}
:deep(.ant-layout-sider-children) {
  height: calc(100vh - 64px);
}
.layout {
  &:deep(.ant-layout-header) {
    padding: 0px !important;

    line-height: 64px;
  }
}
.menu_header {
  height: 60px;
  background-color: #001529;
  color: #fff;
  display: fixed;
  top: 0;
}
</style>
