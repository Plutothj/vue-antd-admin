import Layout from "@/layout/index.vue";

const dashboard = [
  {
    path: "/",
    name: "dashboard",
    component: Layout,
    redirect: "/dashboard/analysis",

    children: [
      {
        path: "/dashboard/analysis",
        name: "Analysis",
        component: () => import("@/views/home/analysis.vue"),
        meta: {
          // affix: true,
          title: "首页",
        },
      },
      {
        path: "/dashboard/workbench",
        name: "Workbench",
        component: () => import("@/views/home/workbench.vue"),
        meta: {
          title: "工作台",
          keepAlive: true,
        },
      },
    ],
  },
];

export default dashboard;
