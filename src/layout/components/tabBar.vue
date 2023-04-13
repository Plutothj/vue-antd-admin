<template>
  <div class="tabBar">
    <a-space :size="[3, 16]">
      <template v-for="(item, index) in tabslist" :key="item.path">
        <Transition name="fade">
          <div
            :class="['tab_item', currentPath === item.path ? 'active' : '']"
            @mouseenter="mouseenter(item, index)"
            @mouseleave="mouseleave(item, index)"
            @click="changeTab(item)"
            v-contextmenu:contextmenu
          >
            <span>{{ item.meta.title }}</span>
            <Transition name="fade">
              <span
                style="margin-left: 8px"
                v-if="item.isShowClose && item.path != '/dashboard/analysis'"
                @click.stop="removeTab(item)"
              >
                <close-circle-outlined /></span
            ></Transition>
          </div>
        </Transition>
      </template>
    </a-space>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="refreshView">
        <undo-outlined /> 刷新页面</v-contextmenu-item
      >
      <v-contextmenu-item @click="closeLeftView">
        <arrow-left-outlined /> 关闭左侧</v-contextmenu-item
      >
      <v-contextmenu-item @click="closeRightView">
        <arrow-right-outlined />关闭右侧</v-contextmenu-item
      >
      <v-contextmenu-item @click="closeOtherView">
        <swap-outlined />关闭其他</v-contextmenu-item
      >
      <v-contextmenu-item @click="closeAllView">
        <close-circle-outlined /> 关闭全部</v-contextmenu-item
      >
    </v-contextmenu>
  </div>
</template>

<script setup>
import { watch, computed } from "vue";
import {
  CloseCircleOutlined,
  UndoOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SwapOutlined,
} from "@ant-design/icons-vue";
import useRouteStore from "@/stores/route";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const router = useRouter();
const routeStore = useRouteStore();
const tabslist = routeStore.getTabslist;

let currentPath = computed(() => {
  return routeStore.getActiveTab.path;
});
let touchPath = ref("");
watch(
  () => routeStore.getActiveTab.path,
  (val) => {
    router.push(val);
  },
  { immediate: true }
);

// const subscribe = routeStore.$subscribe(
//   (mutation, state) => {
//     let currentPath = computed(() => {
//   return state.activeTab.path;
// });
//   },
//   { detached: false }
// );

// 停止订阅
// subscribe()  //调用上方声明的变量值，示例（subscribe），即可以停止订阅

const changeTab = (item) => {
  routeStore.setActiveTab(item);
};
const mouseenter = (item) => {
  item.isShowClose = true;
  touchPath = item.path;
};
const mouseleave = (item) => {
  item.isShowClose = false;
};
const removeTab = (item) => {
  routeStore.removeTab(item);
};
const refreshView = () => {
  router.go(0);
};
const closeLeftView = () => {
  routeStore.closeLeftView(touchPath);
};
const closeRightView = () => {
  routeStore.closeRightView(touchPath);
};
const closeAllView = () => {
  routeStore.closeAllView();
};
const closeOtherView = () => {
  routeStore.closeOtherView(touchPath);
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
.tabBar {
  padding: 10px 10px;
}
.tab_item {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  border-color: #d9d9d9;
  background: #fff;
}
.active {
  color: #40a9ff;
  border-color: #40a9ff;
  background: #fff;
}
</style>
