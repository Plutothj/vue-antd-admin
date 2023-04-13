import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { message } from "ant-design-vue";
const useRouteStore = defineStore("route", {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    return {
      tabslist: [],
      activeTab: {},
      keepAliveList: [],
    };
  },
  getters: {
    getTabslist() {
      return this.tabslist;
    },
    getActiveTab() {
      return this.activeTab;
    },
    getKeepAliveList() {
      return this.keepAliveList;
    },
  },
  actions: {
    setKeepAliveList(list) {
      this.keepAliveList = list;
    },
    addTabslist(route) {
      if (route.path !== "/login") {
        if (this.tabslist.some((item) => item.path === route.path)) return;
        this.tabslist.push(route);
      }

      console.log(this.tabslist);
    },
    removeTab(current) {
      const index = this.tabslist.findIndex(
        (item) => item.path === current.path
      );
      this.tabslist.splice(index, 1);
      if (this.tabslist[index - 1]) {
        this.activeTab = this.tabslist[index - 1];
      }
    },
    setActiveTab(route) {
      this.activeTab = route;
    },
    closeLeftView(path) {
      const index = this.tabslist.findIndex((item) => item.path === path);
      this.setActiveTab(this.tabslist[index]);
      this.tabslist.splice(1, index - 1);
    },
    closeRightView(path) {
      const index = this.tabslist.findIndex((item) => item.path === path);
      this.setActiveTab(this.tabslist[index]);
      this.tabslist.splice(index + 1);
    },
    closeAllView() {
      this.setActiveTab(this.tabslist[0]);
      this.tabslist.splice(1);
    },
    closeOtherView(path) {
      const index = this.tabslist.findIndex((item) => item.path === path);
      this.setActiveTab(this.tabslist[index]);
      if (index === 1) {
        console.log(message);
        message.warning("暂无其他页");
        return;
      }
      if (index === 0) {
        this.tabslist.splice(1);

        return;
      }
      this.tabslist.splice(1, index - 1);
      this.tabslist.splice(index);
    },
  },
});
export default useRouteStore;
