import { ref, computed } from "vue";
import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    return {
      token: "",
      userInfo: {},
      perm: {},
      userPermission: {},
      currentMenus: [],
    };
  },
  getters: {
    getToken() {
      return this.token;
    },
    getMenu() {
      return this.userPermission.menu;
    },
    getUserInfo() {
      return this.userInfo;
    },
    getCurrentMenus() {
      return this.currentMenus;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setPerm(perm) {
      this.perm = perm;
    },
    setUserPermission(userPermission) {
      this.userPermission = userPermission;
    },
    setCurrentMenu(currentMenu) {
      this.currentMenus = currentMenu;
    },
  },
});
export default useUserStore;
