<template>
  <div class="layout_header">
    <div class="layout_header_left">
      <div>
        <img alt="logo" :src="Config.siteLogo" class="logo" />
      </div>
      <div>
        {{ Config.name }}
      </div>
    </div>
    <div class="layout_header_center">
      <div>
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="handleTrigger"
        />
        <menu-fold-outlined v-else class="trigger" @click="handleTrigger" />
      </div>
      <div class="layout_header_right">
        <a-avatar :size="30" :src="AvatrSrc" />

        <a-dropdown placement="bottomLeft">
          <a-button @click.prevent type="text">{{
            User.getUserInfo.nick_name
          }}</a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item> 个人信息 </a-menu-item>
              <a-menu-item> 系统设置 </a-menu-item>
              <a-menu-item>
                <a-button @click="handleLogout" type="text">退出登录</a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ExclamationCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import useUserStore from "@/stores/user";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { useRouter } from "vue-router";
import Config from "@/config";

const emit = defineEmits(["trigger"]);
defineProps(["collapsed"]);

const router = useRouter();
const User = useUserStore();

let AvatrSrc = User.getUserInfo.avatar;
const handleTrigger = () => {
  emit("trigger");
};
const handleLogout = () => {
  Modal.confirm({
    title: "是否要退出登录?",
    icon: createVNode(ExclamationCircleOutlined),
    okText: "确定",
    cancelText: "取消",
    onOk() {
      sessionStorage.clear();
      router.push("/login");
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
};
</script>

<style lang="less" scoped>
.layout_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 14px;
  .layout_header_right {
    display: flex;
    align-items: center;
    color: #1890ff;
    span {
      margin-left: 10px;
    }
  }
  .layout_header_left {
    width: 200px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    .logo {
      display: inline-block;
      width: 30px;
    }
  }
  .layout_header_center {
    padding: 0 20px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;

    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
}
</style>
