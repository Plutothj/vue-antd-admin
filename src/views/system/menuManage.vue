<template>
  <BaseContent>
    <a-space direction="vertical">
      <a-input v-model:value="value" placeholder="Basic usage" />
    </a-space>
    <div v-for="i in 100" style="height: 50px">
      {{ i }}
    </div>
  </BaseContent>
</template>

<script setup>
let value = ref("");
</script>
<script>
export default {
  name: "MenuManage",
};
</script>

<style lang="less" scoped></style>
