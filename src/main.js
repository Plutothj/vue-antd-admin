import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.less";

import store from "@/stores/index";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/modal/style/css";
import baseElement from "@/library/index";
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import vue3SeamlessScroll from "vue3-seamless-scroll";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/zh-CN";

// Import icon libraries
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "@quasar/extras/themify/themify.css";

import { createFromIconfontCN } from "@ant-design/icons-vue";

const IconFont = createFromIconfontCN({
  // scriptUrl: '//at.alicdn.com/t/c/font_3998313_ml9q7k2kh5.js',
  scriptUrl: "/iconfont.js",
});

// Import Quasar css
import "quasar/dist/quasar.css";

const app = createApp(App);
app.component("IconFont", IconFont);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
});
app.use(vue3SeamlessScroll);
app.use(message);
app.use(contextmenu);
app.use(baseElement);
app.use(router);
app.use(store);
app.mount("#app");
