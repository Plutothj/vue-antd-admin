<template>
  <BaseContent>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="fontawesome">
        <a-space class="fontawesome-item">
          <div v-for="item in fontawesome_key" :key="item">
            <q-icon :name="item" size="40px" @click="clickIcon(item)" />
          </div> </a-space
      ></a-tab-pane>
      <a-tab-pane key="2" tab="iconFont" force-render
        ><a-space class="fontawesome-item">
          <div v-for="item in iconfonts.glyphs" :key="item">
            <icon-font
              :type="`icon-${item.font_class}`"
              style="font-size: 40px"
            />
          </div> </a-space
      ></a-tab-pane>
    </a-tabs>
  </BaseContent>
</template>

<script setup>
import * as fontawesomeSet from "@quasar/extras/fontawesome-v5";
import iconfonts from "@/assets/icon/iconfont.json";
import { onMounted, ref } from "vue";
const fontawesome_key = ref([]);
const activeKey = ref("1");
onMounted(() => {
  initFontawesome();
  console.log(iconfonts);
});

// 驼峰转下划线
const toLine = (str) => {
  if (str.substr(0, 3) === "mat") {
    let t = str
      .replace(/([A-Z]|\d+)/g, (a, l) => `_${l.toLowerCase()}`)
      .substring(4);
    switch (t) {
      case "crop_32":
        t = "crop_3_2";
        break;
      case "crop_169":
        t = "crop_16_9";
        break;
      case "crop_54":
        t = "crop_5_4";
        break;
      case "crop_75":
        t = "crop_7_5";
        break;
      default:
        break;
    }
    return t;
  }
  if (str.substr(0, 2) === "fa") {
    let t = str
      .replace(/([A-Z])/g, (a, l) => `-${l.toLowerCase()}`)
      .replace(/-/, " fa-");
    switch (t) {
      case "fab500px":
        t = "fab fa-500px";
        break;
      case "fas fa-stopwatch20":
        t = "fas fa-stopwatch-20";
        break;
      case "fab fa-font-awesome-logo-full":
        t = "fas fa-stopwatch-20";
        break;
      case "far fa-font-awesome-logo-full":
        t = "fas fa-stopwatch-20";
        break;
      default:
        break;
    }
    return t;
  }
};
// fontawesome图标集合初始化
const initFontawesome = () => {
  // 获取图标 fontawesomeSet 下划线格式命名集合
  for (const i in fontawesomeSet) {
    fontawesome_key.value.push(toLine(i));
  }
};
const clickIcon = (item) => {
  console.log(item);
};
</script>

<style lang="less" scoped>
.fontawesome-item {
  display: flex;
  flex-wrap: wrap;
}
</style>
