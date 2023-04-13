import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { viteMockServe } from "vite-plugin-mock";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar(),
      vueJsx(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: [
          // 插件预设支持导入的api
          "vue",
          "vue-router",
          "pinia",
          // 自定义导入的api
        ],

        resolvers: [AntDesignVueResolver()],
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      Icons({
        autoInstall: true,
      }),
      viteMockServe({
        mockPath: "/src/mock",
        localEnabled: command === "serve",
        prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: ` import { setupProdMockServer } from './src/mockProdServer'; setupProdMockServer(); `,
        logger: false, //是否在控制台显示请求日志
        supportTs: false, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      // host: '192.168.0.45',
      // port: 8080,
      proxy: {
        // 接口地址代理
        "/api": {
          target: "http://172.16.29.229:8080", // 接口的域名
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
    define: { "process.env": {} },
  };
});
