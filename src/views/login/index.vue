<template>
  <div class="login_main_bg">
    <LoginForm class="login_main_form" />
  </div>
</template>

<script setup>
import LoginForm from "./components/LoginForm.vue";
</script>

<style lang="less" scoped>
.login_main_bg {
  background: url(../../assets/images/jeecg_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
