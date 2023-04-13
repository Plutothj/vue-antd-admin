<template>
  <div class="">
    <a-card title="登录" style="width: 400px">
      <a-form
        :model="formState"
        hideRequiredMark
        name="normal_login"
        class="login-form"
        :rules="rules"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item name="username">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="code">
          <div class="code_wrapper">
            <a-input v-model:value="formState.code">
              <template #prefix>
                <safety-certificate-outlined class="site-form-item-icon" />
              </template>
            </a-input>
            <img :src="codeSrc" class="codeImg" alt="" srcset="" />
          </div>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">忘记密码</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons-vue";

import { getCode, login, getRoutes } from "@/api/login";
import { setStore } from "@/utils/store";
import useUserStore from "@/stores/user";
import { useRouter } from "vue-router";
import useMessage from "@/hooks/useMessage";
import useRouteStore from "@/stores/route";
const { loading, success } = useMessage();
const router = useRouter();
const UserRouteStore = useRouteStore();
const User = useUserStore();
const ruleFormRef = ref();
const codeSrc = ref("");
const formState = reactive({
  username: "",
  password: "",
  code: "",
  remember: true,
});

const rules = reactive({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
const key = "updatable";
onMounted(async () => {
  let res = await getCode();
  codeSrc.value = res.image;
});
const onFinish = async (values) => {
  loading({ content: "正在登录...", key });
  let res = await login(values);

  if (res.code === 200) {
    setStore({
      name: "token",
      content: res.data.access_token,
      type: "session",
    });
    User.setToken(res.data.access_token);
    User.setUserInfo(res.data);
    await getRoute();
  }
};
const getRoute = async () => {
  let res = await getRoutes();
  if (res.code === 200) {
    let routes = router.getRoutes();
    getKeepAliveList(routes);
    User.setCurrentMenu(res.data);
    router.push({ path: "/" });
  }

  success({ content: "登录成功!", key, duration: 2 });
};
const getKeepAliveList = (list) => {
  let routesNamesList = [];
  list.forEach((item) => {
    if (item.meta.keepAlive) {
      routesNamesList.push(item.name);
    }
  });
  console.log(routesNamesList, list);
  UserRouteStore.setKeepAliveList(routesNamesList);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password && formState.code);
});
</script>

<style lang="less" scoped>
.login-form {
  max-width: 100%;
}
.login-form-forgot {
  float: right;
  color: #1890ff;
}
.login-form-button {
  width: 100%;
}
.code_wrapper {
  display: flex;
  justify-content: space-between;
}
.codeImg {
  width: 150px;
  height: 30px;
}
</style>
