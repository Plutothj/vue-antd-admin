import Layout from "@/layout/index.vue";

const System = [
  {
    path: "/system",
    name: "System",
    component: Layout,
    redirect: "/system/menu",
    meta: {
      // orderNo: 10,
      // icon: "ion:grid-outline",
      title: "系统管理",
    },
    children: [
      {
        path: "/system/menu",
        name: "MenuManage",
        component: () => import("@/views/system/menuManage.vue"),
        meta: {
          // affix: true,
          keepAlive: true,
          title: "菜单管理",
        },
      },
      {
        path: "/system/userManage",
        name: "userManage",
        component: () => import("@/views/home/workbench.vue"),
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "/system/icon",
        name: "icon",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/common/icon.vue"),
        meta: {
          title: "图标",
        },
      },
    ],
  },
];

export default System;
