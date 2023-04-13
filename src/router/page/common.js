const common = [
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/login/index.vue"),
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/common/404.vue"),
    hidden: true,
  },

  {
    path: "/:pathMatch(.*)",
    //重定向
    redirect: "/404",
    hidden: true,
  },
];

export default common;
