import { createRouter, createWebHistory } from "vue-router";
import { start, close } from "@/utils/nprogress";
import Dashboard from "./modules/dashboard";
import Common from "./page/common";
import System from "./modules/system";
import pinia from "@/stores/index"; // 引入pinia

import useRouteStore from "@/stores/route";
let routes = [];
routes = routes.concat(Dashboard, System, Common);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  start();
  //判断有没有登录;
  if (!sessionStorage.getItem("token")) {
    if (to.path == "/login") {
      next();
    } else {
      router.push("/login");
    }
  } else {
    next();
  }
  if (to.path == "/404") {
    return;
  }
});
router.beforeResolve((to, from) => {
  const routeStore = useRouteStore(pinia);

  routeStore.addTabslist(to);
  routeStore.setActiveTab(to);
});
router.afterEach(() => {
  close();
});
export default router;
